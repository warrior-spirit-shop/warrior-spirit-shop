import { srcRelojes } from "./Helpers/srcRelojes.js"
import { Articulo } from "./Articulo.jsx"
import { useContext, useEffect, useRef, useState } from "react"
import { VerImgArticuloEnGrande } from "./VerImgArticuloEnGrande.jsx"
import { ContextRelojes } from "../../Context/ContextRelojesRoute/ContextRelojes.jsx"

export const RelojesRoute = () => {

    const sourseRelojes = srcRelojes()
    const {srcImgArticuloParaVerEnGrande} = useContext(ContextRelojes)
    const [filterClassReloj, setFilterClassReloj] = useState("invicta")
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
            <section className="container-section-relojes">
                <VerImgArticuloEnGrande 
                    srcImg={srcImgArticuloParaVerEnGrande}
                />
                <div ref={containerRef} className={`container-btns-filter-class-reloj${isSticky ? " fixed" : ""}`} style={isSticky ? { top: topOffset } : undefined}>
                    <button 
                        className={`btn-filter-class-reloj ${filterClassReloj == "invicta"
                            ? "filter-default" : ""
                        }
                        `}
                        onClick={() => setFilterClassReloj("invicta")}
                        >
                        Invicta
                    </button>
                    <button className={`btn-filter-class-reloj ${filterClassReloj == "invicta 2 horas"
                        ? "filter-default" : ""
                    }
                    `}
                        onClick={() => setFilterClassReloj("invicta 2 horas")}
                        >
                        Invicta 2 horas
                    </button>
                    <button className={`btn-filter-class-reloj ${filterClassReloj == "invicta ps"
                        ? "filter-default" : ""
                    }
                    `}
                        onClick={() => setFilterClassReloj("invicta ps")}
                        >
                        Invicta Pulcera Silicona
                    </button>
                </div>
                {isSticky && <div aria-hidden="true" style={{ height: placeholderHeight }} />}
                {
                    sourseRelojes.map(ele => (
                        filterClassReloj == ele.marca
                        ? <Articulo 
                            key={ele.srcImgRelog}
                            price={ele.precio}
                            srcImage={ele.srcImgRelog}
                            className={"container-articulo"}
                            description={ele.descripcion}
                            />
                        : ""
                    ))
                }
            </section>
        </>
    )
}
