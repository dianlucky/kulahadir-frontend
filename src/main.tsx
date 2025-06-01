import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./components/providers";
import { AppRoutes } from "./routes";
import { defineCustomElements } from "@ionic/pwa-elements/loader"; // ⬅️ Tambahkan ini
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);

// ⬇️ Tambahkan ini agar <pwa-camera-modal> bisa dipakai di browser
defineCustomElements(window);
