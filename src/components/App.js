import React from "react"

import { HashRouter } from "react-router-dom"
import ScrollToTop from "./ScrollToTop";
import HomePage from "../pages/HomePage";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
    return (<AuthProvider>
            <HashRouter>
                <ScrollToTop />
                <HomePage />
            </HashRouter>
        </AuthProvider>
    )
}

export default App
