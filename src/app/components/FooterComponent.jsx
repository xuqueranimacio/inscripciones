import Link from "next/link"
import "./footer.css"

export function FooterComponent(){
    return (
        <>
        <footer className="footer-wrapper">
            <div className="footer-info container">
                <div className="footer-title">
                    <img src="/logo.png" alt="Logo de Xuquer Animació" />
                </div>
                <div className="footer-section">
                    <h2>Contacte</h2>
                    <a>+34 621 319 967</a>
                    <a>
                        xuqueranimacio@gmail.com
                    </a>
                    <a>Albalat de la Ribera, València</a>
                </div>
                <div className="footer-section">
                    <h2>Qui Som</h2>
                    <a>Empresa d’animació sociocultural</a>
                    <a>Tot tipus d’events</a>
                </div>
                <div className="footer-section">
                    <h2>Activitats</h2>
                    <Link href="https://www.xuqueranimacio.es/campaments">Campaments</Link>
                    <Link href="https://www.xuqueranimacio.es/escoles-de-vacances">Escoles de Vacances</Link>
                    <Link href="https://www.xuqueranimacio.es/extraescolars">Extraescolars</Link>
                    <Link href="https://www.xuqueranimacio.es/animacions">Animacions</Link>
                </div>
                <div className="footer-section">
                    <h2>Xarxes socials</h2>
                    <a href="https://www.instagram.com/xuqueranimacio/" target="_blank">Instagram</a>
                    <a href='https://www.facebook.com/profile.php?id=100086562876828'>Facebook</a>
                </div>
            </div>
        </footer>
        
        </>
    )
}