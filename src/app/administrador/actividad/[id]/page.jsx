"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "../../../actividad/actividad.module.css";
import { borrarActividad, obtenerInscripcionesActividad, requestActividad } from "@/app/components/db";
import { FormCreator, jsonToXlsx } from "@/app/components/utils";

export default function Page() {

  const router = useRouter();

  const params = useParams();
  const [actividad, setActividad] = useState(null);
  const [actividadID, setActividadID] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const handleDownloadXlsx = () => {
    obtenerInscripcionesActividad(actividadID).then(
      (response) => {
        if (response.success) {
          let nombreArchivo = `${actividad.nombre} ${new Date().toISOString().split('T')[0]}`;
          jsonToXlsx(response.inscripciones, nombreArchivo);
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

  useEffect(() => {
    const id = params.id;
    setActividadID(id);
    if (id) {
      requestActividad(id).then((response) => {
        if (response.success) {
          setActividad(response.actividad);
          if (response.actividad.formulario) {
            setFormFields(JSON.parse(response.actividad.formulario));
          }
        }
      });
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.img}>
          <img
            src={`data:${actividad?.tipo_imagen};base64,${actividad?.imagen}`}
            alt={actividad?.nombre}
          />
        </div>
        <div className={styles.info}>
          <h1>{actividad?.nombre}</h1>
          <h2>Descripción</h2>
          <p>{actividad?.descripcion}</p>
          <h2>Fechas</h2>
          <p>
            <b>Fecha de inicio:</b> {actividad?.fecha_inicio}
          </p>
          <p>
            <b>Fecha de fin:</b> {actividad?.fecha_fin}
          </p>
        </div>
      </div>

      <FormCreator actividadId={actividadID} styles={styles} initialFields={formFields} />

      <div className={styles.excelContainer}>
        <h2>Excel con Datos</h2>
        <button onClick={handleDownloadXlsx} className={styles.excel}>Descargar Excel</button>
      </div>

      <div className={styles.excelContainer}>
        <h2>Borrar Actividad</h2>
        <button onClick={handleBorrarActividad} className={styles.borrar}>Borrar Actividad</button>
      </div>
    </main>
  );
}
