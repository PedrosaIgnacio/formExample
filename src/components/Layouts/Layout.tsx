import React, { ReactNode } from "react";
import { Footer } from "../Index/Footer";
import { NavBar } from "../NavBar/NavBar";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <main className="w-100 d-flex flex-column" style={{ minHeight: "100vh" }}>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};
