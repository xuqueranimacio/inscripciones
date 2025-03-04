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
                <h1>Inscripciones Abiertas</h1>
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
                <div className={styles.absoluteObject}></div>
                <h2>¿Cómo funciona?</h2>
                <div className={styles.howToSectionContent}>
                    <div className={styles.howToText}>
                        <span className={styles.orderNumber}>1. </span>
                        <p>Haz clic sobre una de las <a href="#inscripciones">inscripciones disponibles</a> para ver más detalles sobre ella. Allí se encontrará el formulario de inscripción</p>
                    </div>
                    <div className={styles.howToActividad}>
                        <div className={styles.image}></div>
                        <div className={styles.info}></div>
                        <img src="/cursor.png" className={styles.cursor}/>
                    </div>
                </div>
                <div className={styles.howToSectionContent}>
                    <div className={styles.howToText}>
                        <span className={styles.orderNumber}>2. </span>
                        <p>Rellena correctamente los campos requeridos del formulario de inscripción.<b> ¡Solo toca esperar un poquito! </b></p>
                    </div>
                    <div className={`${styles.howToActividad} ${styles.howToActividad2}`}>
                        <h3>Nombre</h3>
                        <div className={styles.info}></div>
                        <h3>Apellidos</h3>
                        <div className={styles.info}></div>
                        <img src="/text.png" className={styles.textImage}/>
                    </div>
                </div>
                <div className={styles.howToSectionContent}>
                    <div className={styles.howToText}>
                        <span className={styles.orderNumber}>3. </span>
                        <p><b>¡Ya está! </b>Nos pondremos en contacto contigo y nos pondremos a preparar tu inscripción para que disfrutes de nuestras actividades lo antes posible.</p>
                    </div>
                    <div className={`${styles.message}`}>
                        <div className={styles.messageImg}>
                            <img src="/logo.png" alt="" />
                        </div>
                        <div className={styles.messageText}>
                            <h3>Xúquer Animació</h3>
                            <p>Muchas gracias por tu interés Rocío! Para confirmar la inscripción...</p>
                        </div>
                        <div className={styles.notRead}></div>
                    </div>
                </div>
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
