import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section>
      <br />
      <br />
      <div className="bg-dark text-right">
        <footer className="container" style={{ color: "#fff" }}>
          <br />
          <br />
          <span>Powered By </span>
          <a
            href="http://openwisp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWISP
          </a>
          <br />
          <br />
        </footer>
      </div>
    </section>
  );
};

export default Footer;
