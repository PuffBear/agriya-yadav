"use client";
import React from 'react';
/* Footer.jsx — single-line footer with section sign + IST clock */

function Footer() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span><span style={{ color: "var(--clay)" }}>§</span> &nbsp; Sonipat → wherever &nbsp; · &nbsp; v2026.10</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{time.toTimeString().slice(0,8)} IST</span>
      </div>
    </footer>
  );
}



export default Footer;
