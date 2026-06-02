import { useContext, useState } from "react"
import { Articulo } from "./Articulo.jsx"
import { FiltroParaRutas } from "./FiltroParaRutas.jsx"
import { srcGafas } from "./Helpers/srcGafas.js"
import { VerImgArticuloEnGrande } from "./VerImgArticuloEnGrande.jsx"
import { ContextRelojes } from "../../Context/ContextRelojesRoute/ContextRelojes.jsx"

export const GafasRoute = () => {
    
    const {arrayDeGafas} = srcGafas()
    const {srcImgArticuloParaVerEnGrande} = useContext(ContextRelojes)
    const [filterClassGafa, setFilterClassGafa] = useState("okley")

    return (
        <>
            <section className="container-section-gafas">
                <VerImgArticuloEnGrande 
                    srcImg={srcImgArticuloParaVerEnGrande}
                />
                <FiltroParaRutas 
                    palabraClave={filterClassGafa}
                    setPalabraClave={setFilterClassGafa}
                    arrayDePalabrasClave={["okley", "deportiva", "okley sunglasses", "cartier sunglasses"]}
                />
                {
                    arrayDeGafas.map(ele => (
                        ele.marca == filterClassGafa
                        ? <Articulo 
                            key={ele.srcImgGafa}
                            price={ele.precio}
                            srcImage={ele.srcImgGafa}
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
