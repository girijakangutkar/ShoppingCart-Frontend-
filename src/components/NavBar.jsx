"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="hover:underline">
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className="hover:underline flex flex-row justify-between items-center align-center"
        >
          <span>
            <MdShoppingCart />
          </span>
          Cart
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;
