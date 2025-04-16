import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="layout-wrapper">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
