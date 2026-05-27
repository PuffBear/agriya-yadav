"use client";
import React from 'react';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const page = pathname === '/' ? 'home' : pathname.replace('/', '');

  const links = [
    { id: "home",     label: "Index" },
    { id: "work",     label: "Work" },
    { id: "research", label: "Research" },
    { id: "now",      label: "Now" },
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <svg className="brand-mark" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="31" stroke="#14110E" strokeWidth="1.5"/>
            <path d="M14 44 L22 20 L30 44 M17 36 L27 36" stroke="#14110E" strokeWidth="2" strokeLinecap="square" fill="none"/>
            <path d="M34 20 L42 32 L50 20 M42 32 L42 44" stroke="#14110E" strokeWidth="2" strokeLinecap="square" fill="none"/>
          </svg>
          <span className="brand-name">Agriya Yadav</span>
        </Link>
        <nav className="nav">
          {links.map(l => (
            <Link key={l.id}
               href={l.id === 'home' ? '/' : `/${l.id}`}
               className={`nav-link ${page === l.id ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
          <span style={{ width: 1, height: 16, background: "var(--rule-strong)", margin: "0 4px" }}></span>
          <a href="mailto:agriya.yadav_ug2023@ashoka.edu.in" className="nav-link" style={{ color: "var(--clay)" }}>Email →</a>
        </nav>
      </div>
    </header>
  );
}
