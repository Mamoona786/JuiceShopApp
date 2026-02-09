"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CartDropdown from "@/components/cart/CartDropdown";

export default function Navbar() {
  const [transparent, setTransparent] = useState(false);
  useEffect(() => {
    const onScroll = () => setTransparent(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav id="navbar" className={`navbar navbar-expand-lg navbar-dark sticky-top ${transparent ? "transparent" : ""}`}>
      <div className="top-section container-fluid">
        <Link className="navbar-brand" href="#">
          <Image src="/images/logo.png" alt="Juice Shop" width={150} height={50} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <CartDropdown />
            <li className="nav-item"><a className="nav-link" href="#"><i className="fas fa-user" /> Login</a></li>
            <li className="nav-item"><a className="nav-link" href="#"><i className="fas fa-user-plus" /> Register</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
