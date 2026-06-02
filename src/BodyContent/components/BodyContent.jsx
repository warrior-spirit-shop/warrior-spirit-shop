import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles/bodyContent.css"
import { FacturaClient } from "./FacturaClient.jsx";

export const BodyContent = () => {
    const [isFixed, setIsFixed] = useState(false)
    const [placeholderHeight, setPlaceholderHeight] = useState(0)
    const containerRef = useRef(null)
    const initialTop = useRef(0)

    useEffect(() => {
        const updatePlaceholder = () => {
            if (!containerRef.current) return
            setPlaceholderHeight(containerRef.current.offsetHeight)
            if (initialTop.current === 0) {
                initialTop.current = containerRef.current.getBoundingClientRect().top + window.pageYOffset
            }
        }

        const handleScroll = () => {
            setIsFixed(window.pageYOffset > initialTop.current)
        }

        updatePlaceholder()
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", updatePlaceholder)
        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", updatePlaceholder)
        }
    }, [])

    return (
        <>
            <main className="body-content">
                <div ref={containerRef} className={`container-btn-routes${isFixed ? " fixed" : ""}`}>
                    <NavLink to="/zapatosRoute" 
                        className={({isActive}) => isActive ? "btn active" : "btn"}
                        >
                        Zapatillas
                    </NavLink>
                    <NavLink to="/relojesRoute" 
                        className={({isActive}) => isActive ? "btn active" : "btn"}
                        >
                        Relojes
                    </NavLink>
                    <NavLink to="/gafasRoute" 
                        className={({isActive}) => isActive ? "btn active" : "btn"}
                        >
                        Gafas
                    </NavLink>
                </div>
                {isFixed && <div aria-hidden="true" style={{ height: placeholderHeight }} />}
                <FacturaClient />
            </main>
        </>
    )
}
