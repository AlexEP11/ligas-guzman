import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlayerProvider } from "./context/PlayerConext.tsx";
import Router from "./Router.tsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UserProvider>
            <PlayerProvider>
                <Router />
            </PlayerProvider>
        </UserProvider>
    </StrictMode>
);
