"use client";

import { useState } from "react";
import styles from "../../../actividad/actividad.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { requestActividad } from "@/app/components/db";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [actividad, setActividad] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formFields, setFormFields] = useState([]); // Almacena los campos del formulario
  const [newField, setNewField] = useState({ name: "", type: "text", defaultValue: "", options: [] }); // Estado para el campo nuevo
  const [radioOptions, setRadioOptions] = useState(""); // Opciones para los radio buttons

  useEffect(() => {
    const id = params.id;
    if (id) {
      // Obtener la actividad desde la base de datos
      const actividad = requestActividad(id).then((response) => {
        if (response.success) {
          setActividad(response.actividad);
        }
      });
      console.log("Actividad:", actividad);
    }
  }, []);

  const handleAddField = () => {
    if (newField.name && newField.type) {
      const fieldToAdd = { ...newField };

      if (newField.type === "radio") {
        fieldToAdd.options = radioOptions.split(",").map((opt) => opt.trim());
        setRadioOptions("");
      }

      setFormFields([...formFields, fieldToAdd]);
      setNewField({ name: "", type: "text", defaultValue: "", options: [] });
    } else {
      alert("Por favor, completa el nombre y tipo del campo.");
    }
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const handleSaveToJson = () => {
    const jsonData = JSON.stringify(formFields, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form_structure.json";
    a.click();
    URL.revokeObjectURL(url);
  };

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
      
      <section style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Creador de Formularios</h1>

        <section style={{ marginBottom: "20px" }}>
          <h2>Añadir Campo</h2>
          <div style={{ marginBottom: "10px" }}>
            <label>Nombre del Campo:</label>
            <input
              type="text"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              placeholder="Ej. Nombre"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tipo de Campo:</label>
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
            >
              <option value="text">Texto</option>
              <option value="number">Número</option>
              <option value="email">Correo Electrónico</option>
              <option value="password">Contraseña</option>
              <option value="checkbox">Checkbox</option>
              <option value="date">Fecha</option>
              <option value="radio">Radio Buttons</option>
            </select>
          </div>

          {newField.type === "radio" && (
            <div style={{ marginBottom: "10px" }}>
              <label>Opciones (separadas por coma):</label>
              <input
                type="text"
                value={radioOptions}
                onChange={(e) => setRadioOptions(e.target.value)}
                placeholder="Ej. Opción 1, Opción 2, Opción 3"
              />
            </div>
          )}

          <div style={{ marginBottom: "10px" }}>
            <label>Valor por Defecto:</label>
            <input
              type="text"
              value={newField.defaultValue}
              onChange={(e) => setNewField({ ...newField, defaultValue: e.target.value })}
              placeholder="Ej. Juan"
            />
          </div>

          <button onClick={handleAddField}>Añadir Campo</button>
        </section>

        <section>
          <h2>Vista Previa del Formulario</h2>
          {formFields.length === 0 && <p>No se han añadido campos aún.</p>}
          {formFields.map((field, index) => (
            <div key={index} style={{ marginBottom: "10px" }} className={styles.formulario}>
              <label>{field.name}:</label>
              <div className={styles.inputContainer}>
                {field.type === "radio" ? (
                    field.options.map((option, optIndex) => (
                    <div key={optIndex}>
                        <input
                        type="radio"
                        name={field.name}
                        value={option}
                        defaultChecked={option === field.defaultValue}
                        />
                        {option}
                    </div>
                    ))
                ) : (
                    <input
                    type={field.type}
                    defaultValue={field.defaultValue}
                    onChange={(e) =>
                        handleFieldChange(index, "defaultValue", e.target.value)
                    }
                    />
                )}
                <button
                    onClick={() => handleRemoveField(index)}
                >
                    Eliminar
                </button>
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: "20px" }}>
          <button onClick={handleSaveToJson} disabled={formFields.length === 0}>
            Guardar en JSON
          </button>
        </section>
      </section>
    </main>
  );
}
