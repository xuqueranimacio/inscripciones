"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../login/login.module.css";
import { registroCliente } from "../components/db";

export default function Home() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login");
  };

  const handleTermsClick = () => {
    router.push("/terms");
  };

  const [clienteData, setClienteData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    password: "",
    confirmPassword: "", // Se agrega aquí para validación
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData({ ...clienteData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validaciones de cada campo
    if (!clienteData.nombre) {
      formErrors.nombre = "El nombre es obligatorio.";
      isValid = false;
    }
    if (!clienteData.apellidos) {
      formErrors.apellidos = "Los apellidos son obligatorios.";
      isValid = false;
    }
    if (!clienteData.correo) {
      formErrors.correo = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(clienteData.correo)) {
      formErrors.correo = "Por favor, ingresa un correo electrónico válido.";
      isValid = false;
    }
    if (!clienteData.password) {
      formErrors.password = "La contraseña es obligatoria.";
      isValid = false;
    }
    if (clienteData.password !== clienteData.confirmPassword) {
      formErrors.confirmPassword = "Las contraseñas no coinciden.";
      isValid = false;
    }
    if (!clienteData.telefono) {
      formErrors.telefono = "El número de teléfono es obligatorio.";
      isValid = false;
    } else if (!/^\d{9}$/.test(clienteData.telefono)) {
      formErrors.telefono = "El número de teléfono debe tener 9 dígitos.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    if (validateForm()) {
      try {
        const response = await registroCliente({
          nombre: clienteData.nombre,
          apellidos: clienteData.apellidos,
          correo: clienteData.correo,
          telefono: clienteData.telefono,
          password: clienteData.password,
        });

        if (response.success) {
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("nombre", clienteData.nombre);
          router.push("/login");
        } else {
          console.error("Error en el registro:", response.message);
        }
      } catch (error) {
        console.error("Error en el registro:", error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Registro</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={clienteData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
          </div>

          <div>
            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={clienteData.apellidos}
              onChange={handleChange}
            />
            {errors.apellidos && (
              <p className={styles.error}>{errors.apellidos}</p>
            )}
          </div>

          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              value={clienteData.correo}
              onChange={handleChange}
            />
            {errors.correo && <p className={styles.error}>{errors.correo}</p>}
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={clienteData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div>
            <label>Repita su contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={clienteData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label>Número de Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={clienteData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <p className={styles.error}>{errors.telefono}</p>}
          </div>

          <button className={styles.postButton} type="submit">
            Registrarse
          </button>
        </form>
      </div>
      <p>O inicia sesión <a onClick={handleClickLogin} className={styles.registro}><b>aquí</b></a></p>
      <p><i>Al registrarte, aceptas nuestros <a onClick={handleTermsClick} className={styles.registro}>términos y condiciones</a>.</i></p>
    </main>
  );
}