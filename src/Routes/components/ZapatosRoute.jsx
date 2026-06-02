import { Articulo } from "./Articulo.jsx"
import {srcShoes} from "./Helpers/srcShoes.js"
import "../styles/zapatosRoute.css"
import { VerImgArticuloEnGrande } from "./VerImgArticuloEnGrande.jsx"
import { useContext } from "react"
import { ContextRelojes } from "../../Context/ContextRelojesRoute/ContextRelojes.jsx"

export const ZapatosRoute = () => {

    const {arrayOfImagesShoes} = srcShoes()
    const {srcImgArticuloParaVerEnGrande} = useContext(ContextRelojes)

    return (
        <>
            <section className="container-section-shoes">
                <VerImgArticuloEnGrande srcImg={srcImgArticuloParaVerEnGrande}/>
                {
                    arrayOfImagesShoes.map(ele => (
                        <Articulo
                            key={ele.srcShoe}
                            className="container-articulo"
                            price={ele.precio}
                            srcImage={ele.srcShoe}
                            description={ele.descripcion}
                            shoe="zapatilla"
                        />
                    ))     
                }
            </section>
        </>
    )
}
