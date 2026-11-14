
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/inicio" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
