"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleLoginLink = () => {
    router.push("/login");
  };

  const handleClickRegistro = () => {
    router.push("/registro");
  };

  return (
    <main className={styles.main}>

      <div className={styles.page}>
        <h1>Bienvenido/a a la plataforma de gestión de Xuqer Animació</h1>
        <div className={styles.buttonContainer}>
          <a onClick={handleLoginLink} className={styles.login + " " + styles.botonGeneral}>Iniciar Sesión</a>
          <a onClick={handleClickRegistro} className={styles.register + " " +  styles.botonGeneral}>Registrarse</a>
        </div>
      </div>

      <section  className={styles.sectiontwo}>
    

      </section>

    </main>
  );
}
