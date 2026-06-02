import { useState } from "react";
import { FacturaContext } from "./FacturaContext.jsx";

export function FacturaProvider({children}){

    const [datosCliente, setDatosCliente] = useState({precioArticulo: "5000", description: "nn", countUnidades: 0, srcImage: ""})
    const setDatosClienteParaExport = (newData) =>{
        setDatosCliente(newData)
        console.log(newData)
    }
    const valor = {datosCliente, setDatosClienteParaExport}

    return (
        <FacturaContext.Provider value={valor}>
            {children}
        </FacturaContext.Provider>
    )
}