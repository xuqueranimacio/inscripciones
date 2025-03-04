import { useState, useEffect } from "react";
import { actualizarFormularioActividad, obtenerFormularioActividad, subirInscripcionActividad } from "./db";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import styles from "../actividad/actividad.module.css";

export async function sesionUsuario(id, nombre){
    localStorage.setItem("user_id", id);
    localStorage.setItem("nombre", nombre);
}

export function verificarSesion(){
    const user_id = localStorage.getItem("user_id");
    const nombre = localStorage.getItem("nombre");

    if(user_id && nombre){
        return true;
    }
    return false;
}

export function jsonToXlsx(jsonData, fileName) {
    
    const datosProcesados = jsonData.map(formulario => JSON.parse(formulario));
    const worksheet = XLSX.utils.json_to_sheet(datosProcesados);

    const encabezados = Object.keys(datosProcesados[0]);
    encabezados.forEach((key, index) => {
      // Aplicar estilos a las celdas de la primera fila (encabezados)
      const cell = worksheet[`${String.fromCharCode(65 + index)}1`]; // Calcula la celda (A1, B1, C1...)
      if (cell) {
        cell.s = {
          font: { bold: true }, // Negrita
          fill: { fgColor: { rgb: "D3D3D3" } }, // Fondo gris claro
        };
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function FormCreator({ actividadId, initialFields = [] }) {
  const [formFields, setFormFields] = useState(initialFields);
  const [newField, setNewField] = useState({ name: "", type: "text", defaultValue: "", options: [] });
  const [radioOptions, setRadioOptions] = useState("");

  const router = useRouter();

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

  const handleUploadForm = () => {
    const jsonData = JSON.stringify(formFields, null, 2);
    let actualizacion = actualizarFormularioActividad(actividadId, jsonData).then((response) => {
      if (response.success) {
        router.push("/administrador/actividad/" + actividadId);
      } else {
        alert("Error al actualizar formulario: " + response.error);
      }
    });
  };

  return (
    <section className={styles.creatorSection}>
      <h1 className={styles.title}>Creador de Formularios</h1>

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
            <option value="radio">Opciones</option>
          </select>
        </div>

        {newField.type === "radio" && (
          <div style={{ marginBottom: "10px" }} className={styles.radioOptions}>
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
                  <div key={optIndex} className={styles.radioOptions}>
                    <p>{option}</p>
                    <input
                      type="radio"
                      name={field.name}
                      value={option}
                      defaultChecked={option === field.defaultValue}
                    />
                  </div>
                ))
              ) : (
                <input
                  type={field.type}
                  defaultValue={field.defaultValue}
                  onChange={(e) => handleFieldChange(index, "defaultValue", e.target.value)}
                />
              )}
              <button onClick={() => handleRemoveField(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "20px" }}>
        <button onClick={handleUploadForm} disabled={formFields.length === 0}>
          Actualizar Formulario
        </button>
      </section>
    </section>
  );
}

export function FormGetter({ actividadId }) {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const router = useRouter();

    useEffect(() => {
        async function fetchForm() {
            const response = await obtenerFormularioActividad(actividadId);
            if (response.success) {
                setFormFields(JSON.parse(response.formulario));
            } else {
                alert("Error al obtener formulario: " + response.error);
            }
        }
        fetchForm();
    }, [actividadId]);

    const handleInputChange = (index, value) => {
        setFormData({
            ...formData,
            [formFields[index].name]: value
        });
    };

    const handleSubmit = async () => {
      
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            alert("Por favor, inicia sesión para enviar el formulario.");
            return;
        }

        const response = await subirInscripcionActividad( actividadId, JSON.stringify(formData));
        if (response.success) {
            alert("Formulario enviado con éxito.");
            router.push(`/actividad/${actividadId}`);
        } else {
            alert("Error al enviar el formulario: " + response.error);
        }
    };

    return (
        <section style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1 style={{ fontSize: "2rem" }}>Formulario de Actividad</h1>
            {formFields.length === 0 && <p>No se ha encontrado el formulario.</p>}
            {formFields.map((field, index) => (
                <div key={index} style={{ marginBottom: "10px" }} className={styles.formulario}>
                    <label>{field.name}:</label>
                    <div className={styles.inputContainer}>
                        {field.type === "radio" ? (
                            field.options.map((option, optIndex) => (
                                <div key={optIndex} className={styles.radioOptions}>
                                    {option}
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={option}
                                        defaultChecked={option === field.defaultValue}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </div>
                            ))
                        ) : (
                            <input
                                type={field.type}
                                defaultValue={field.defaultValue}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        )}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
                Enviar Formulario
            </button>
        </section>
    );
}
