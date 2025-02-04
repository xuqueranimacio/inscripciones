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

  const handleUserClick = () => {
          router.push("/login");
  };

  const handleResize = () => {
    if(window.screen.width < 768) {
      usuario.style.display = "none";
      menu.style.display = "block";
    } else {
        usuario.style.display = "block";
        menu.style.display = "none";
    }
  }

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

  // Re-renderizar cuando localStorage cambie
  useEffect(() => {


    let usuario = document.getElementById("usuario");
    let menu = document.getElementById("menu")
    
    
    handleResize();
    window.addEventListener("resize", handleResize);

  }, []);

  return (
    <html lang="en">
      <head>
        <title>Inscripciones Xuquer Animació</title>
      </head>
      <body className={`${geistSans.variable}`}>
        <header>
          <a onClick={handleLogoClick} className="logo">
            <img src="/logo.png" alt="Xuquer Animacio" />
          </a>

          <nav className={`${geistMono.variable} nav`} id="usuario">
              <a onClick={handleUserClick}><img src="/usuario.png" /></a>
          </nav>

          <nav id="menu">
            <a><img src="/menu.png" /></a>
          </nav>

        </header>

        {children}

        <footer></footer>
      </body>
    </html>
  );
}
