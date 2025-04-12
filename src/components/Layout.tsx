import { Outlet } from "react-router-dom";
import HeaderComponent from "./header/HeaderComponent";
import Footer from "./footer/Footer";

const Layout: React.FC = () => {
  return (
    <div className="layout-wrapper">
      <HeaderComponent />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
