import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ChartLine, FilePdf, List, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { useMobile } from "@/hooks/isMobile";

const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useMobile();

  const renderUl = () => (
    <ul className="flex flex-col md:flex-row gap-10 items-center mt-20 md:mt-0">
      <li>
        <Link
          to="/dashboard"
          className={clsx("flex gap-2 items-center", {
            "text-blue-500": pathname === "/dashboard",
            "hover:text-blue-500": pathname !== "/dashboard",
          })}
          onClick={() => setMenuOpen(false)}
        >
          <ChartLine size={20} weight="bold" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/invoices-library"
          className={clsx("flex gap-2 items-center", {
            "text-blue-500": pathname === "/invoices-library",
            "hover:text-blue-500": pathname !== "/invoices-library",
          })}
          onClick={() => setMenuOpen(false)}
        >
          <FilePdf size={20} weight="bold" />
          Biblioteca de Faturas
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="w-[100vw] flex flex-col justify-start">
      <header className="flex w-full justify-between items-center border-b-1 border-solid border-zinc-500 bg-white py-2 shadow-lg px-4 md:px-20">
        <Link to={"/"}>
          <span className="text-3xl md:text-5xl font-bold italic text-blue-500">
            LUMI
          </span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
            )}
          </button>
        </div>
        {isMobile && (
          <nav
            className={clsx(
              "fixed z-10 md:relative top-0 md:top-auto right-0 md:right-auto bg-white w-full md:w-auto h-screen md:h-auto transition-transform transform",
              {
                "translate-x-0": menuOpen,
                "translate-x-full": !menuOpen,
              },
            )}
          >
            {renderUl()}
          </nav>
        )}
        {!isMobile && <nav>{renderUl()}</nav>}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
