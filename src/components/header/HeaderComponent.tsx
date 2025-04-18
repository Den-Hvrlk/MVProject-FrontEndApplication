import UpHeader from "./UpHeader.tsx";
import DownHeader from "./DownHeader.tsx";
import React from "react";
import "./Header.css";

const Header: React.FC = React.memo(() => {
  console.log("HeaderComponent");
  return (
    <>
      <header>
        <UpHeader />
        <DownHeader />
      </header>
    </>
  );
});

export default Header;
