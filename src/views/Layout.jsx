import { Outlet } from "react-router-dom";
import SiteNavigation from "../components/SiteNavigation.jsx";
import { useUserContext } from "../contexts/UserContext.jsx";
import { useEffect } from "react";

const Layout = () => {
  const { handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <div>
      <header>
        <SiteNavigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright 2024</footer>
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
