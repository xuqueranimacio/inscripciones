"use client";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  const [isLoged, setIsLoged] = useState(false);
  const router = useRouter();

  // Función para verificar si el usuario está logueado
  const checkLoginStatus = () => {
    const user_id = localStorage.getItem("user_id");
    const nombre = localStorage.getItem("nombre");

    if (!user_id || !nombre) {
      return false;
    }

    return user_id && nombre; // Devuelve true si ambos valores están presentes
  };
  
  const handleLogoClick = () => {
    router.push("/");
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoged(false);
    router.push("/");
  };

  const handleLogIn = () => {
    router.push("/login");
  };

  // Re-renderizar cuando localStorage cambie
  useEffect(() => {
    const storageChangeListener = () => {
      setIsLoged(checkLoginStatus());
    };

    window.addEventListener("storage", storageChangeListener);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", storageChangeListener);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <header>
          <a onClick={handleLogoClick} className="logo">
            <img src="/logo.png" alt="Xuquer Animacio" />
          </a>

          <nav className={`${geistMono.variable} nav`}>
            {isLoged ? (
              <a onClick={handleLogOut}>Cerrar Sesión</a>
            ) : (
              <a onClick={handleLogIn}>Iniciar Sesión</a>
            )}
            <a onClick={handleLogOut}>Cerrar Sesión</a>
          </nav>
        </header>

        {children}

        <footer></footer>
      </body>
    </html>
  );
}
