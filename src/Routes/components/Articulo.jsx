import { useContext } from "react"
import { FacturaContext } from "../../Context/Context-para-factura/FacturaContext.jsx"
import { ContextRelojes } from "../../Context/ContextRelojesRoute/ContextRelojes.jsx"

export const Articulo = ({className, srcImage, price, description, shoe}) => {

    const {setDatosClienteParaExport} = useContext(FacturaContext)
    const {setSrcArticuloParaVerEnGrandeExport} = useContext(ContextRelojes)
    const actualizarDatosCliente = () =>{
        setDatosClienteParaExport({
            precioArticulo: price,
            description,
            srcImage,
            countUnidades: 1,
            isShoe: () => shoe ? shoe : false
        })
    }
    const impedirScrollEnPagina = () =>{
        document.querySelector("#root").className = "body-no-scrooll"
        document.querySelector(".factura-cliente").classList.toggle("factura-cliente-oculta")
    }

    return (
        <>
            <div className={className}>
                <img src={srcImage} alt="imagen artículo" className="img-articulo"
                    onClick={() => setSrcArticuloParaVerEnGrandeExport(srcImage)}
                />
                <div className="container-price-and-description">
                    <span className="precio-number-articulo">COP: {price}</span>
                    <span className="descripcion-articulo"> Descripción: {description}</span>
                    <button className="btn-comprar-articulo"
                        onClick={() => {
                            actualizarDatosCliente()
                            impedirScrollEnPagina()
                        }}
                        >
                        Comprar
                    </button>
                </div>
            </div>
        </>
    )
}
