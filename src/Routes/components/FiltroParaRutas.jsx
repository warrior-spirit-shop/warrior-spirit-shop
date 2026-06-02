import { useEffect, useRef, useState } from "react"
import "../styles/filtroParaRutas.css"

export const FiltroParaRutas = ({arrayDePalabrasClave, setPalabraClave,
    palabraClave
}) => {
    const [isSticky, setIsSticky] = useState(false)
    const [topOffset, setTopOffset] = useState(0)
    const [placeholderHeight, setPlaceholderHeight] = useState(0)
    const containerRef = useRef(null)
    const initialTop = useRef(0)

    useEffect(() => {
        const updateMeasurements = () => {
            if (!containerRef.current) return
            setPlaceholderHeight(containerRef.current.offsetHeight)
            initialTop.current = containerRef.current.getBoundingClientRect().top + window.pageYOffset
        }

        const handleScroll = () => {
            const fixedHeader = document.querySelector(".container-btn-routes.fixed")
            const routeHeight = fixedHeader?.offsetHeight ?? document.querySelector(".container-btn-routes")?.offsetHeight ?? 0
            setTopOffset(routeHeight)
            setIsSticky(window.pageYOffset >= initialTop.current - routeHeight)
        }

        updateMeasurements()
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", updateMeasurements)
        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", updateMeasurements)
        }
    }, [])

    return (
        <>
            <div ref={containerRef} className={`container-filtro-para-rutas${isSticky ? " fixed" : ""}`} style={isSticky ? { top: topOffset } : undefined}>
                {
                    arrayDePalabrasClave.map(ele => (
                        <button type="button" 
                            className={`btn-palabra-clave-en-filtro ${palabraClave == ele
                                ? "btn-palabra-clave-activa" : ""
                            }
                            `}
                            onClick={() => setPalabraClave(ele)}
                            >
                            {ele}
                        </button>
                    ))
                }
            </div>
            {isSticky && <div aria-hidden="true" style={{ height: placeholderHeight }} />}
        </>
    )
}
