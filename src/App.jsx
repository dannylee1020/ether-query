import Search from "./components/Search";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search />}></Route>
                    <Route
                        path="/transactions"
                        element={<Transactions />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
