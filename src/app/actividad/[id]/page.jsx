"use client"
import styles from "../actividad.module.css";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { requestActividad } from "@/app/components/db";
import { FormGetter, jsonToXlsx } from "@/app/components/utils";

export default function Page() {

    const router = useRouter();
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [actividad, setActividad] = useState(null);
    const [isForm, setIsForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const id = params.id;
        if (id) {
            // Obtener la actividad desde la base de datos
            requestActividad(id).then(response => {
                if (response.success) {
                    setActividad(response.actividad);
                    if(response.actividad.formulario){
                        setIsForm(true);
                    }
                }
                setIsLoading(false);
            });
        }
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {isLoading ? (
                    <div className={styles.ghostImg}></div>
                ) : (
                    <div className={styles.img}>
                        <img src={`data:${actividad?.tipo_imagen};base64,${actividad?.imagen}`} alt={actividad?.nombre} />
                    </div>
                )}
                <div className={styles.info}>
                    {isLoading ? (
                        <>
                            <div className={styles.ghostTitle}></div>
                            <div className={styles.ghostText}></div>
                            <div className={styles.ghostText}></div>
                        </>
                    ) : (
                        <>
                            <h1>{actividad?.nombre}</h1>
                            <p>{actividad?.descripcion}</p>
                            <h2>Fechas</h2>
                            <p><b>Fecha de inicio:</b> {actividad?.fecha_inicio}</p>
                            <p><b>Fecha de fin:</b> {actividad?.fecha_fin}</p>
                        </>
                    )}
                </div>
            </div>

            <section className={styles.form}>
                {isLoading ? (
                    <div className={styles.ghostForm}></div>
                ) : isForm ? (
                    <FormGetter actividadId={params.id} styles={styles} />
                ) : (
                    <>
                        <h1>Formulario no disponible :(</h1>
                        <p>El formulario no está disponible para esta actividad. Puede ser que aún no se haya abierto el plazo de inscripciones o haya algún tipo de error.
                        <br /><br />Por favor, contacta con nosotros si crees que hay algún error.
                        </p>
                    </>
                )}
            </section>
        </main>
    );
}