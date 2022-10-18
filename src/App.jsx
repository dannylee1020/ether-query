import Search from "./components/Search";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Search />}></Route>
                <Route path="/transactions" element={<Transactions />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
