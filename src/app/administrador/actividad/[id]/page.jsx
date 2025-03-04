"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CountUp from 'react-countup';
import styles from "../../../actividad/actividad.module.css";
import { borrarActividad, obtenerCountInscripcionesActividad, obtenerInscripcionesActividad, requestActividad } from "@/app/components/db";
import { FormCreator, jsonToXlsx } from "@/app/components/utils";

export default function Page() {

  const router = useRouter();

  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [actividad, setActividad] = useState(null);
  const [actividadID, setActividadID] = useState(null);
  const [totalInscripciones, setTotalInscripciones] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const handleDownloadXlsx = () => {
    obtenerInscripcionesActividad(actividadID).then(
      (response) => {
        if (response.success && response.inscripciones.length > 0) {
          let nombreArchivo = `${actividad.nombre} ${new Date().toISOString().split('T')[0]}`;
          jsonToXlsx(response.inscripciones, nombreArchivo);
        }else{
          alert("No se encontraron inscripciones para esta actividad.");
        }
      }
    )
  }

  const handleBorrarActividad = () => {
    if (confirm("¿Estás seguro de que deseas borrar esta actividad?")) {
      borrarActividad(actividadID).then((response) => {
        if (response.success) {
          alert("Actividad borrada correctamente");
           router.push("/administrador");
        }
      });
    }
  }

  const handleGoBack = () => {
    router.push("/administrador");
  }

  const handleLinkActividad = () => {
    router.push(`/actividad/${actividadID}`);
  }

  useEffect(() => {
    const id = params.id;
    setActividadID(id);
  }, [params.id]);

  useEffect(() => {
    if (actividadID) {
      console.log(actividadID); // Aquí ya tienes el valor correcto de actividadID
  
      // Obtener el conteo de inscripciones
      obtenerCountInscripcionesActividad(actividadID).then((response) => {
        setTotalInscripciones(response.total);
      });
  
      // Obtener los detalles de la actividad
      requestActividad(actividadID).then((response) => {
        if (response.success) {
          setActividad(response.actividad);
          setLoading(false)
          if (response.actividad.formulario) {
            setFormFields(JSON.parse(response.actividad.formulario));
          }
        }
      });
    }
  }, [actividadID]); // Este useEffect se ejecuta cuando actividadID cambia.

  return (
    <main className={styles.main}>

      <div className={styles.buttonSection}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <img src="/back.png" alt="" />
        </button>

        <div className={styles.rightButtonContainer}>
          <button onClick={handleBorrarActividad} className={styles.borrar}>
            <img src="/trash.png" alt="" />
          </button>
          <button onClick={handleDownloadXlsx} className={styles.excel}>
            <img src="/excel.png" alt="" />
          </button>
          <button onClick={handleLinkActividad} className={styles.link} alt="Enlace a la actividad">
            <img src="/link.png" alt="" />
          </button>
        </div>

      </div>

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

      <div className={styles.stats}>
        <h2>Inscripciones Totales:</h2>
        <CountUp end={totalInscripciones} duration={3}/>
      </div>

      { formFields && formFields.length > 0 ? (
        <FormCreator actividadId={actividadID} styles={styles} initialFields={formFields} />
      ) : (
        <div className={styles.ghostForm}></div>
      )}
    </main>
  );
}
