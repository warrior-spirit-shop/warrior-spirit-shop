import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import { BodyContent } from './BodyContent/components/BodyContent.jsx'
import { Header } from './HeaderIcommerce/components/Header.jsx'
import { ZapatosRoute } from "./Routes/components/ZapatosRoute.jsx"
import { RelojesRoute } from "./Routes/components/RelojesRoute.jsx"
import { GafasRoute } from "./Routes/components/GafasRoute.jsx"
import { FacturaProvider } from "./Context/Context-para-factura/FacturaProvider.jsx"
import { ProviderRelojes } from "./Context/ContextRelojesRoute/ProviderRelojes.jsx"

function App() {

    return (
        <>
            <FacturaProvider>
            <BrowserRouter>
                <Header />
                <p className='text-induccion'>
                    Aqui podras encontrar artículos interesantes de uso diario, tales como: 
                    correas, gorras y zapatos.
                </p>
                <BodyContent />
                <ProviderRelojes>
                    <Routes>
                        <Route path="/" element={<ZapatosRoute />}/>
                        <Route path="/zapatosRoute" element={<ZapatosRoute />}/>
                        <Route path="/relojesRoute" element={<RelojesRoute />}/>
                        <Route path="/gafasRoute" element={<GafasRoute />}/>
                    </Routes>
                </ProviderRelojes>
            </BrowserRouter>
            </FacturaProvider>
        </>
    )
}

export default App
