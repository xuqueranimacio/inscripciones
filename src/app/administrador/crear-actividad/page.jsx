"use client";
import styles from "./crear.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearActividad } from "@/app/components/db";
import imageCompression from "browser-image-compression";

export default function Page() {
    const router = useRouter();

    // Crear estados para almacenar los valores del formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [imagen, setImagen] = useState(null);  // Ahora imagen es un objeto
    const [imagenError, setImagenError] = useState("");

    // Función para manejar el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "nombre") {
            setNombre(value);
        } else if (name === "descripcion") {
            setDescripcion(value);
        } else if (name === "fechaInicio") {
            setFechaInicio(value);
        } else if (name === "fechaFin") {
            setFechaFin(value);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Verificar el tipo de archivo
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            if (validTypes.includes(file.type)) {
                // Comprimir la imagen y luego establecer el estado
                const compressedImage = await compressImage(file);
                if (compressedImage) {
                    setImagen({ base64: compressedImage.base64, mimeType: file.type });
                    setImagenError("");
                }
            } else {
                setImagenError("Solo se permiten archivos de imagen (JPEG, PNG, GIF).");
                setImagen(null);
            }
        }
    };

    // Función para manejar el envío del formulario
    const handleCrearActividad = async (e) => {
        e.preventDefault();
        if (!imagen) {
            alert("Por favor selecciona una imagen válida.");
            return;
        }

        try {

            let data = {
                nombre: nombre,
                descripcion: descripcion,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                imagen: imagen.base64,
                tipo_imagen: imagen.mimeType,
            };

            if (data.nombre && data.descripcion && data.imagen) {
                console.log("Datos válidos:", data);
                const responseActividad = await crearActividad(data);
                if (responseActividad.success) {
                    console.log("Actividad creada con éxito:", responseActividad.actividad_id);
                    router.push("/administrador/pages");
                } else {
                    console.error("Error al crear actividad:", responseActividad.error);
                }
            } else {
                console.error("Datos no válidos:", data);
            }
        } catch (error) {
            console.error("Error al crear actividad:", error);
        }
    };

    return (
        <main className={styles.main}>
            <h1>Crear Actividad</h1>

            <h2>Nombre</h2>
            <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
            />

            <h2>Descripción</h2>
            <textarea
                name="descripcion"
                value={descripcion}
                onChange={handleInputChange}
            ></textarea>

            <h2>Fecha Inicio (opcional)</h2>
            <input
                type="date"
                name="fechaInicio"
                value={fechaInicio}
                onChange={handleInputChange}
            />

            <h2>Fecha Fin (opcional)</h2>
            <input
                type="date"
                name="fechaFin"
                value={fechaFin}
                onChange={handleInputChange}
            />

            <h2>Imagen</h2>
            <input
                type="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleFileChange}
            />
            {imagenError && <p style={{ color: "red" }}>{imagenError}</p>}

            <button onClick={handleCrearActividad}>Crear Actividad</button>
        </main>
    );
}

async function compressImage(file) {
    const options = {
        maxSizeMB: 1,  // Tamaño máximo en MB
        maxWidthOrHeight: 1920,  // Tamaño máximo
    };

    try {
        // Asegurarse de que estamos trabajando con un objeto File
        const fileToCompress = file instanceof File ? file : new File([file], 'image', { type: file.type });

        const compressedBlob = await imageCompression(fileToCompress, options);
        const arrayBuffer = await compressedBlob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        
        return { base64, mimeType: file.type };  // Devolver tanto Base64 como tipo MIME
    } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        return null;
    }
}
