"use client"
import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requestActividades } from "@/app/components/db";
import { verificarSesion } from "../components/utils";

export default function Page({ params }) {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [misActividades, setMisActividades] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleMenuClick = () => {
        
        let miAside = document.getElementById("asideDiv");
    
        setIsOpen(prevState => {
            const newState = !prevState;
            if (newState) {
                miAside.style.transform = "translateX(0)"
                miAside.style.opacity = "1";
                miAside.style.pointerEvents = "all";
            } else {
                miAside.style.transform = "translateX(100%)"
                miAside.style.opacity = "0";
                miAside.style.pointerEvents = "none";
            }
            
            return newState;
        });
    };

    const handleActivityClick = (e) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute("data-id");
        console.log("ID:", id);
        router.push(`/administrador/actividad/${id}`);
    };

    const handleCrearActividad = () => {
        router.push("/administrador/crear-actividad");
    };

    useEffect(() => {

        window.addEventListener("resize", () => {
            let miAside = document.getElementById("asideDiv");
            
            if(window.innerWidth > 768){
                setIsOpen(false)
                miAside.style.transform = "translateX(100%)"
                miAside.style.opacity = "0";
                miAside.style.pointerEvents = "none";
            }else{
                let menu = document.getElementById("menu");
                if(menu){
                    menu.addEventListener("click", handleMenuClick)
                }
            }
        })

        if (verificarSesion()) {
            
            setIsLoggedIn(true);
            // RECOGER ACTIVIDADES DEL USUARIO
            requestActividades().then(response => {
                if (response.success) {
                    setMisActividades(response.actividades);
                } else {
                    console.error("Error al obtener actividades:", response.error);
                }
                setIsLoading(false);
            });
        } else {
            router.push("/login");
        }

    }, []);

    useEffect(() => {
        let menu = document.getElementById("menu");
        if(menu){
            menu.addEventListener("click", handleMenuClick)
        }
    }, [misActividades])

    

    return (
        isLoggedIn ? (
            <>
                <main className={styles.main}>

                    <aside className={styles.aside} id="asideDiv">
                        <a className={styles.asideBox}>Inicio</a>
                        <a className={styles.asideBox}>Estadísticas</a>
                        <a className={styles.asideBox} onClick={handleCrearActividad}>Crear Actividad</a>
                    </aside>

                    <div className={styles.content}>
                        <h1>Panel de Administrador</h1>
                        <h2>Mis Actividades</h2>

                        {isLoading ? (
                            ghostActividades()
                        ) : (
                            <div className={styles.actividades}>
                                {misActividades && misActividades.length > 0 ? (
                                    misActividades.map((actividad, index) => (
                                        <div key={actividad.id || index} className={styles.actividad}>
                                            <div className={styles.imageContainer}>
                                                <img src={`data:${actividad.tipo_imagen};base64,${actividad.imagen}`} alt={actividad.nombre} />
                                            </div>
                                            <a
                                                className={styles.info}
                                                onClick={handleActivityClick}
                                                data-id={actividad.id}
                                            >
                                                <h3>{actividad.nombre}</h3>
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p>Inscríbete en alguna actividad para verla aquí.</p>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </>
        ) : (
            <main className={styles.main}></main>
        )
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