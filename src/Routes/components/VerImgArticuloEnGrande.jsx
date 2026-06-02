import { useContext } from "react"
import { ContextRelojes } from "../../Context/ContextRelojesRoute/ContextRelojes"


export const VerImgArticuloEnGrande = ({srcImg}) => {

    const {srcImgArticuloParaVerEnGrande, setSrcArticuloParaVerEnGrandeExport} = useContext(ContextRelojes)

    return (
        <div className={`container-mostrar-img-en-grande ${
                srcImgArticuloParaVerEnGrande.length > 4 ? "img-big-visible" : ""
            }
            `}
            >
            <img src={srcImg} alt="imágen de artículo en grande" 
                className="img-articulo-en-grande"
            />
            <button className="cerrar-img-articulo-en-grande"
                onClick={() => setSrcArticuloParaVerEnGrandeExport("../")}
                >
                Cerrar
            </button>
        </div>
    )
}
