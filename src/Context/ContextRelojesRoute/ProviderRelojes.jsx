import {ContextRelojes} from "./ContextRelojes.jsx"
import { useState } from "react"

export const ProviderRelojes = ({children}) => {

    const [classReloj, setClassReloj] = useState("n")
    const [srcImgArticuloParaVerEnGrande, setSrcArticuloParaVerEnGrande] = useState("../")

    const setClassRelojParaExport = (newClass) => setClassReloj(newClass)
    const setSrcArticuloParaVerEnGrandeExport = (newSrc) => setSrcArticuloParaVerEnGrande(newSrc)

    const valor = {classReloj, setClassRelojParaExport, srcImgArticuloParaVerEnGrande,
        setSrcArticuloParaVerEnGrandeExport
    }

    return (
        <ContextRelojes.Provider value={valor}>
            {children}
        </ContextRelojes.Provider>
    )
}
