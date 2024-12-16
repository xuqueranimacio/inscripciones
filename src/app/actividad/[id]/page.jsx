"use client"
import styles from "../actividad.module.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { requestActividad } from "@/app/components/db";

export default function Page() {

    const router = useRouter();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [actividad, setActividad] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const id = params.id;
        if (id) {
            // Obtener la actividad desde la base de datos
            const actividad = requestActividad(id).then(response => {
                if (response.success) {
                    setActividad(response.actividad);
                }
            });
            console.log("Actividad:", actividad);
        }

    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.img}>
                    <img src={`data:${actividad?.tipo_imagen};base64,${actividad?.imagen}`} alt={actividad?.nombre} />
                </div>
                <div className={styles.info}>
                    <h1>{actividad?.nombre}</h1>
                    <h2>Descripción</h2>
                    <p>{actividad?.descripcion}</p>
                    <h2>Fechas</h2>
                    <p><b>Fecha de inicio:</b> {actividad?.fecha_inicio}</p>
                    <p><b>Fecha de fin:</b> {actividad?.fecha_fin}</p>
                </div>
            </div>

            <section className={styles.form}>
                <h2>Formulario de Inscripción</h2>
                <h3>Nombre</h3>
                <input type="text" name="nombre" placeholder="Nombre" />
                <h3>Email</h3>
                <input type="email" name="email" placeholder="Email" />
                <h3>Teléfono</h3>
                <input type="tel" name="telefono" placeholder="Teléfono" />
                <h3>Fecha de Nacimiento</h3>
                <input type="date" name="fecha_nacimiento" placeholder="Fecha de Nacimiento" />
                <button>Enviar</button>
            </section>

        </main>
    );
}