"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginCliente } from "../components/db";
import { sesionUsuario } from "../components/utils";
import styles from "./login.module.css";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    const userId = localStorage.getItem("user_id");
    if (userId) {
      router.push(`/cliente/${userId}`);
    }
  }, [router]);

  const [clienteData, setClienteData] = useState({
    mail: "",
    contrasena: ""
  });

  // Estado para manejar los errores
  const [errors, setErrors] = useState({
    mail: "",
    contrasena: ""
  });

  const handleRegisterClick = () => {
    router.push("/registro");
  };

  // Función para validar el formulario
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Obtener los valores de los campos
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    // Comprobación de campos vacíos
    if (!mail) {
      formErrors.mail = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      formErrors.mail = "Por favor, ingresa un correo electrónico válido.";
      isValid = false;
    }
    if (!password) {
      formErrors.password = "La contraseña es obligatoria.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    
    // Obtener los valores de los campos
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    if (validateForm()) {
      try {
        const response = await loginCliente(mail, password);
        if (response.success) {
          sesionUsuario(response.user_id, response.nombre);
          router.push(`/cliente/${response.user_id}`);
        } else {
          // Handle login failure (optional)
          setErrors(prevErrors => ({
            ...prevErrors,
            general: "Inicio de sesión fallido. Verifica tus credenciales."
          }));
        }
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
        setErrors(prevErrors => ({
          ...prevErrors,
          general: "Ocurrió un error al iniciar sesión."
        }));
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Inicio de Sesión</h1>

        <div className={styles.form}>
          <div>
            <label>Correo Electrónico</label>
            <input type="email" name="" id="mail" />
            {errors.mail && <p style={{color: 'red'}}>{errors.mail}</p>}
          </div>
          
          <div>
            <label>Constraseña</label>
            <input type="password" name="" id="password" />
            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          </div>

          {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}

          <button onClick={handleSubmit} className={styles.postButton}>Acceder</button>
          
        </div>
        <p>O registrate <a onClick={handleRegisterClick} className={styles.registro}><b>aquí</b></a></p>
      </div>
    </main>
  );
}