"use client";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FooterComponent } from "./components/FooterComponent";
import { verificarSesion } from "./components/utils";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();

  const handleResize = () => {
    if(window.screen.width < 768) {
        // menu.style.display = "block";
        links.style.display = "none";
    } else {
        // menu.style.display = "none";
        links.style.display = "flex";
    }
  }
  
  const handleLogoClick = () => {
    router.push("/");
  };

  // Re-renderizar cuando localStorage cambie
  useEffect(() => {

    if(verificarSesion()){
      setIsLoggedIn(true);
    }

    // let menu = document.getElementById("menu")
    let links = document.getElementById("links");
    
    
    handleResize();
    window.addEventListener("resize", handleResize);

  }, []);

  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/x-icon" href="/logo.png"/>
        <title>Inscripciones Xuquer Animació</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${geistSans.variable}`}>
        <header>
          <a onClick={handleLogoClick} className="logo">
            <img src="/logo.png" alt="Xuquer Animacio" />
          </a>
          
          <div className="navLinks" id="links">
            <Link href="/">
              Inicio
            </Link>
            <Link href="/#inscripciones">
              Inscripciones
            </Link>
            <Link href="/#funcionamiento">
              ¿Cómo funciona?
            </Link>
            <Link href="/terms">
              Términos y Condiciones
            </Link>
            {isLoggedIn ? (
              <Link href="/administrador">
                Panel de Administrador
              </Link>
            ) : (
              null
            )}
          </div>

        </header>

        {children}

        <FooterComponent />
      </body>
    </html>
  );
}
