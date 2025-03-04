"use client"
import styles from "./page.module.css"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestActividades } from "@/app/components/db";

export default function Page({ params }) {

    const router = useRouter();
    const [todasActividades, setTodasActividades] = useState(null);
    const [isLoading, setIsLoading] = useState(true);1

    useEffect(() => {

        // RECOGER TODAS LAS ACTIVIDADES
        requestActividades().then(response => {
            if (response.success) {
                setTodasActividades(response.actividades);
            } else {
                console.error("Error al obtener actividades:", response.error);
            }
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
        window.open(`/actividad/${id}`);
    };
    
    return (
        <main className={styles.main}>

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Plataforma de Inscripciones</h1>
                    <p>Inscribete en las diferentes activadades de Xuquer Animación en muy pocos clics.</p>
                    <div className={styles.heroButtons}>
                    <Link href="#inscripciones">
                        <button id={styles.inscripcionesButton}>Inscripciones Abiertas</button>
                    </Link>
                    <Link href="https://xuqueranimacio.es">
                        <button>
                            <img src="/logo.png" alt="Volver a Xuquer Animacio" />
                        </button>
                    </Link>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <img src="/logo.png" alt="Logo de Xuquer Animación" />
                </div>
            </section>
    
            <div className={styles.content} id="inscripciones">
                <h1>Inscripciones Abiertas:</h1>
                <div className={styles.actividades}>
                    {todasActividades && todasActividades.length > 0 ? (
                        todasActividades.map((actividad, index) => (
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
                        ghostActividades()
                    )}
                </div>
            </div>

            <section className={styles.howToSection} id="funcionamiento">
                <h2>¿Cómo Funciona?</h2>
            </section>

        </main>
    );
}

function ghostActividades() {
    return (
        <div className={styles.actividades}>
            <div className={styles.ghostActividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.ghostInfo}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.ghostActividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.ghostInfo}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.ghostActividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.ghostInfo}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>

            <div className={styles.ghostActividad}>
                <div className={styles.ghostImagen}></div>
                <div className={styles.ghostInfo}>
                    <div className={styles.ghostTitle}></div>
                    <div className={styles.ghostText}></div>
                </div>
            </div>
        </div>
    );
}
