import { PlayerProvider } from "./context/PlayerContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <UserProvider>
        <PlayerProvider>
            <Router />
        </PlayerProvider>
    </UserProvider>
    // </StrictMode>
);
