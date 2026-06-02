import { useContext, useEffect, useRef, useState } from "react"
import "../styles/facturaClient.css"
import { FacturaContext } from "../../Context/Context-para-factura/FacturaContext"

export const FacturaClient = () => {

    const {datosCliente} = useContext(FacturaContext)
    const [cantidadArticulo, setCantidadArticulo] = useState(1)
    const [clienteInfo, setClienteInfo] = useState({
        nombre: "",
        direccion: "",
        telefono: ""
    })
    const [shoeSize, setShoeSize] = useState("")
    const [showDone, setShowDone] = useState(false)
    const [showCancel, setShowCancel] = useState(false)
    const doneTimerRef = useRef(null)
    const cancelTimerRef = useRef(null)
    const shoeType = typeof datosCliente?.isShoe === "function" ? datosCliente.isShoe() : false

    useEffect(() => {
        return () => {
            if (doneTimerRef.current) clearTimeout(doneTimerRef.current)
            if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current)
        }
    }, [])

    const validarCantidadDeArticuloNoMenorAUno = () =>{
        cantidadArticulo < 2 ? alert("La cantidad de artículos no puede ser menor a 1") : setCantidadArticulo(cantidadArticulo -1)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setClienteInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleShoeSizeChange = (e) => {
        setShoeSize(e.target.value)
    }

        const getImageDataUrl = async (src) => {
            if (!src) return null
            try {
                const response = await fetch(src)
                const blob = await response.blob()
                return await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result)
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                })
            } catch (error) {
                console.warn("No se pudo convertir la imagen a Data URL:", error)
                return null
            }
        }

        const generarFacturaHtml = (imageSrc, fecha, total) => `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Factura Warrior spirit</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #333; }
            .factura-header { text-align: center; margin-bottom: 24px; }
            .factura-header h1 { margin: 0; font-size: 28px; }
            .factura-section { margin-bottom: 18px; }
            .factura-section h2 { margin: 0 0 10px; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
            .factura-row { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
            .factura-row span { display: block; margin-bottom: 4px; }
            .factura-product { display: flex; align-items: flex-start; gap: 16px; }
            .factura-product img { max-width: 180px; border: 1px solid #ddd; border-radius: 10px; }
            .factura-box { flex: 1; min-width: 220px; }
            .factura-total { font-size: 20px; font-weight: bold; margin-top: 16px; }
        </style>
    </head>
    <body>
        <div class="factura-header">
            <h1>Factura Warrior spirit</h1>
            <p>Fecha: ${fecha}</p>
        </div>
        <div class="factura-section">
            <h2>Datos del cliente</h2>
            <div class="factura-row">
                <span><strong>Nombre:</strong> ${clienteInfo.nombre || "No especificado"}</span>
                <span><strong>Dirección:</strong> ${clienteInfo.direccion || "No especificado"}</span>
                <span><strong>Teléfono:</strong> ${clienteInfo.telefono || "No especificado"}</span>
            </div>
        </div>
        <div class="factura-section">
            <h2>Detalles de la compra</h2>
                <div class="factura-product">
                ${imageSrc ? `<img src="${imageSrc}" alt="Artículo" />` : ""}
                <div class="factura-box">
                    <span><strong>Artículo:</strong> ${datosCliente.description}</span>
                    ${shoeType ? `<span><strong>Talla:</strong> ${shoeSize || "No especificada"}</span>` : ""}
                    <span><strong>Cantidad:</strong> ${cantidadArticulo}</span>
                    <span><strong>Precio unitario:</strong> ${datosCliente.precioArticulo} COP</span>
                    <span class="factura-total">Total: ${total.toLocaleString("es-ES")} COP</span>
                </div>
            </div>
        </div>
        <div class="factura-section">
            <p>Gracias por su compra en Warrior spirit.</p>
        </div>
    </body>
    </html>`

        const descargarFactura = async () => {
            const precioUnidad = Number(datosCliente.precioArticulo.replace(/\./g, ""))
            const total = precioUnidad * cantidadArticulo
            const fecha = new Date().toLocaleDateString("es-CO")
            const imageDataUrl = await getImageDataUrl(datosCliente.srcImage)
            const facturaHtml = generarFacturaHtml(imageDataUrl, fecha, total)
                const blob = new Blob([facturaHtml], { type: "text/html;charset=utf-8" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = `factura-warrior-spirit-${Date.now()}.html`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
    }

            const verFacturaEnNuevaPestana = async () => {
                const precioUnidad = Number(datosCliente.precioArticulo.replace(/\./g, ""))
                const total = precioUnidad * cantidadArticulo
                const fecha = new Date().toLocaleDateString("es-CO")
                const imageDataUrl = await getImageDataUrl(datosCliente.srcImage)
                const facturaHtml = generarFacturaHtml(imageDataUrl, fecha, total)
                const blob = new Blob([facturaHtml], { type: "text/html;charset=utf-8" })
                const url = URL.createObjectURL(blob)
                const newWindow = window.open(url, "_blank")
                if (!newWindow) {
                    // Fallback: trigger download if popup blocked
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `factura-warrior-spirit-${Date.now()}.html`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                    return
                }
                // revoke after a delay so the page can load
                setTimeout(() => URL.revokeObjectURL(url), 60000)
            }

    const compartirFactura = async () => {
        const precioUnidad = Number(datosCliente.precioArticulo.replace(/\./g, ""))
        const total = precioUnidad * cantidadArticulo
        const fecha = new Date().toLocaleDateString("es-CO")
        const imageDataUrl = await getImageDataUrl(datosCliente.srcImage)
        const facturaHtml = generarFacturaHtml(imageDataUrl, fecha, total)

        // Intentar usar Web Share API si está disponible
        if (navigator.share) {
            try {
                const blob = new Blob([facturaHtml], { type: "text/html;charset=utf-8" })
                const file = new File([blob], `factura-warrior-spirit-${Date.now()}.html`, { type: "text/html" })
                await navigator.share({
                    title: "Factura Warrior spirit",
                    text: `Factura de compra - ${datosCliente.description}`,
                    files: [file]
                })
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.warn("Error compartiendo:", error)
                }
            }
            return
        }

        // Fallback: copiar al portapapeles
        try {
            await navigator.clipboard.writeText(facturaHtml)
            alert("Factura copiada al portapapeles. Puedes pegarla en un email o mensaje.")
        } catch (error) {
            console.warn("No se pudo copiar al portapapeles:", error)
            // Último recurso: descargar
            descargarFactura()
        }
    }

    const confirmarFactura = () => {
        setShowDone(true)
        if (doneTimerRef.current) clearTimeout(doneTimerRef.current)
        doneTimerRef.current = setTimeout(() => {
            setShowDone(false)
            devolverScrollAPagina()
            setCantidadArticulo(1)
        }, 3000)
    }

    const cancelarCompra = () => {
        setShowCancel(true)
        if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current)
        cancelTimerRef.current = setTimeout(() => {
            setShowCancel(false)
            devolverScrollAPagina()
            setCantidadArticulo(1)
        }, 2000)
    }

    const devolverScrollAPagina = () =>{
        document.querySelector("#root").className = "body-si-scrooll"
        document.querySelector(".factura-cliente").classList.toggle("factura-cliente-oculta")
    }

    return (
        <>
            <div className={`factura-cliente factura-cliente-oculta${showDone ? " show-done" : ""}`}>
                <h1 className="name-store">Warrior spirit</h1>
                <p className="texto-tu-factura">Tu factura.</p>
                <p className="name-client-container">
                    Nombre cliente:
                    <input
                        type="text"
                        name="nombre"
                        value={clienteInfo.nombre}
                        placeholder="Tu nombre"
                        className="input-name-client input-factura"
                        onChange={handleInputChange}
                    />
                </p>
                <p className="addrees-client-container">
                    Dirección:
                    <input
                        type="text"
                        name="direccion"
                        value={clienteInfo.direccion}
                        placeholder="Tu dirección"
                        className="input-addrees-client input-factura"
                        onChange={handleInputChange}
                    />
                </p>
                <p className="phone-number-client-container">
                    Número de teléfono:
                    <input
                        type="text"
                        name="telefono"
                        value={clienteInfo.telefono}
                        placeholder="Tu número de teléfono"
                        className="input-phone-number-client input-factura"
                        onChange={handleInputChange}
                    />
                </p>
                <p className="product-name-container">
                    Nombre del artículo:
                    <span className="product-name">{datosCliente.description}</span>
                </p>
                {shoeType && (
                    <p className="shoe-size-container">
                        Talla:
                        <input
                            type="text"
                            name="shoeSize"
                            value={shoeSize}
                            placeholder="Ej: 42"
                            className="input-talla input-factura"
                            onChange={handleShoeSizeChange}
                        />
                    </p>
                )}
                <p className="cantidad-de-producto-container">
                    <span className="cantidad-de-producto-texto">Cantidad:</span>
                    <span className="cantidad-de-producto-numero">
                        {cantidadArticulo} 
                    </span>
                    <button className="btn-incrementar-cantidad"
                        onClick={() => setCantidadArticulo(cantidadArticulo +1)}
                        >
                        +
                    </button>
                    <button className="btn-restar-cantidad"
                        onClick={() => validarCantidadDeArticuloNoMenorAUno()}
                        >
                        -
                    </button>
                </p>
                <p className="precio-total-container">
                    Precio total:
                    <span className="precio-total">
                        {
                        ((datosCliente.precioArticulo.replace(/\./g, "")) * cantidadArticulo).toLocaleString("es-ES")
                        }
                    </span> COP
                </p>
                <div className="container-btns-important-in-factura">
                    <button
                        type="button"
                        className="btn-download-factura btn-important-in-factura"
                        onClick={descargarFactura}
                    >
                        Descargar
                    </button>
                    <button
                        type="button"
                        className="btn-preview-factura btn-important-in-factura"
                        onClick={verFacturaEnNuevaPestana}
                    >
                        Ver factura
                    </button>
                    <button className="btn-close-factura btn-important-in-factura"
                        onClick={confirmarFactura}
                        >
                        Finalizar
                    </button>
                </div>
                <div className={`container-btn-cancelar-compra${showCancel ? " show-cancel" : ""}`}>
                    <button className="btn-cancelar-compra"
                        onClick={cancelarCompra}
                        >
                        Cancelar compra
                    </button>
                    <p className="texto-compartir-factura">
                        Por favor envianos tu factura al Whatsapp: <b>3223258882</b> para hacer el envío de tu pedido
                        <button
                            type="button"
                            className="btn-share-factura btn-important-in-factura"
                            onClick={compartirFactura}
                        >
                            Enviar factura
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}
