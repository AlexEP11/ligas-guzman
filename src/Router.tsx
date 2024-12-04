import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import RegisterPlayer from "@/pages/team/RegisterPlayers";
import TeamLayout from "@/layout/TeamLayout";
import TablePlayers from "@/pages/team/TablePlayers";
import LoginPage from "@/pages/auth/LoginPage";
import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import UploadSignatures from "./pages/team/UploadSignatures";
import "react-toastify/dist/ReactToastify.css";

export default function Router() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Ruta pública */}
                    <Route element={<LoginPage />} path="/" />

                    {/* Rutas protegidas */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <TeamLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route element={<RegisterPlayer />} index path="/registrar/credencial" />
                        <Route element={<TablePlayers />} path="/historial/credenciales" />
                        <Route element={<UploadSignatures />} path="/subir/firmas" />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer closeOnClick hideProgressBar position="bottom-right" theme="colored" />
        </QueryClientProvider>
    );
}
