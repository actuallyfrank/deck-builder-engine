import { ReactNode } from "react";
import "./layout.css";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="layout">{children}</div>;
};
