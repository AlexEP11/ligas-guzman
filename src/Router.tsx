import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPlayer from "@/pages/team/RegisterPlayers";
import TeamLayout from "@/layout/TeamLayout";
import TablePlayers from "@/pages/team/TablePlayers";
import LoginPage from "@/pages/auth/LoginPage";
import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import UploadSignatures from "./pages/team/UploadSignatures";
import PromotionLayout from "./layout/PromotionLayout";
import PromotionPage from "./pages/promotion/PromotionPage";
import LeaguePage from "./pages/league/LeaguePage";
import LeagueLayout from "./layout/LeagueLayout";
import Return from "./components/payment/Return";
import SuccessPay from "./components/payment/SuccessPay";
import PaymentLayout from "./layout/PaymentLayout";

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
                        <Route
                            element={<RegisterPlayer />}
                            index
                            path="/registrar/credencial"
                        />
                        <Route
                            element={<TablePlayers />}
                            path="/historial/credenciales"
                        />
                        <Route
                            element={<UploadSignatures />}
                            path="/subir/firmas"
                        />
                    </Route>

                    {/* Ruta de ligas */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <LeagueLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route element={<LeaguePage />} index path="/liga" />
                    </Route>

                    {/* Ruta de promotoria */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <PromotionLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            element={<PromotionPage />}
                            index
                            path="/promotoria"
                        />
                    </Route>

                    <Route element={<PaymentLayout />}>
                        {/* Ruta de retorno */}
                        <Route element={<Return />} path="/return" />

                        {/* Ruta para mostrar el mensaje de pago completado */}
                        <Route element={<SuccessPay />} path="/pago/exito" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
