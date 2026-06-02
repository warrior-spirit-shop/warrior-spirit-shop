import "../styles/header.css"
import logoWarriorSpirit from "../../assets/logo-w.jpg"

export const Header = () => {
    return (
        <>
            <header className="header-icommerce">
                <div className="contenedor-img-logo">
                    <img 
                        src={logoWarriorSpirit} alt="imagen logo" 
                        className="img-logo-warrior-spirit"
                    />
                </div>
                <h1 className="text-welcome-to-warrior">
                    Hola bienvenido a Warrior spirit nuestra tienda en linea
                </h1>
            </header>
        </>
    )
}
