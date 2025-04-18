import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.tsx";
import PersistLogin from "./components/PersistLogin.tsx";

createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/*" element={<App />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ToastProvider>
);
