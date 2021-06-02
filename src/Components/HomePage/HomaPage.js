import React from "react";
import NavbarExt from "../NavbarExt/NavbarExt";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-Container">
      <NavbarExt />
      <h1 className="abc">informations about the app and what it does</h1>
    </div>
  );
}

export default HomePage;
