import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/header/HeaderComponent.tsx";
import Footer from "./components/footer/Footer.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <HeaderComponent />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
