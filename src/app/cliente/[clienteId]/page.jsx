"use client"
import styles from "../cliente.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestActividades } from "@/app/components/db";

export default function Page({ params }) {

    const router = useRouter();

    const [nombre, setNombre] = useState(null);
    const [misActividades, setMisActividades] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        const nombre = localStorage.getItem("nombre");
    
        if (user_id && nombre) {
            setNombre(nombre);
        } else {
            router.push("/login");
            return; // Detén la ejecución si no hay usuario logeado.
        }
    
        // RECOGER ACTIVIDADES DEL USUARIO
        requestActividades().then(response => {
            if (response.success) {
                setMisActividades(response.actividades);
            } else {
                console.error("Error al obtener actividades:", response.error);
            }
            setIsLoading(false); // Desactivar el indicador de carga
        });
    }, [router]); // Asegúrate de pasar `router` como dependencia

    const handleActivityClick = (e) => {
        // Prevenir la acción por defecto (que puede ser la navegación de <a>)
        e.preventDefault();
        
        // Obtener el id desde el data-id del currentTarget (el <a> que disparó el evento)
        const id = e.currentTarget.getAttribute("data-id");

        // Log para depuración
        console.log("ID:", id);

        // Navegar a la página de la actividad usando el router
        router.push(`/actividad/${id}`);
    };
    
    return (
        <main className={styles.main}>
            <aside className={styles.aside}>
                <a className={styles.asideBox}>Inicio</a>
                <a className={styles.asideBox}>Explorar Actividades</a>
                <a className={styles.asideBox}>Mis Actividades</a>
                <a className={styles.asideBox}>Pagos</a>
            </aside>
    
            <div className={styles.content}>
                <h1>¡Bienvenido/a de nuevo {nombre}!</h1>
                <h2>Mis Actividades</h2>
                {isLoading ? (
                    ghostActividades() // Renderiza los placeholders mientras carga
                ) : (
                    <div className={styles.actividades}>
                        {misActividades && misActividades.length > 0 ? (
                            misActividades.map((actividad, index) => (
                                <div key={actividad.id || index} className={styles.actividad}>
                                    <div className={styles.imageContainer}>
                                        <img className={styles.imagen} src={`data:${actividad.tipo_imagen};base64,${actividad.imagen}`} alt={actividad.nombre} />
                                    </div>
                                    <a 
                                        className={styles.info} 
                                        onClick={handleActivityClick} 
                                        data-id={actividad.id}>
                                        <h3>{actividad.nombre}</h3>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>Inscribete en alguna actividad para verla aquí.</p>
                        )}
                    </div>
                )}
                <h2>Explora Xuquer Animacio</h2>
            </div>
        </main>
    );
}

function ghostActividades() {
    return (
        <div className={styles.actividades}>
            <div className={styles.actividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.info}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.actividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.info}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.actividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.info}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.actividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.info}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>
        </div>
    );
}
