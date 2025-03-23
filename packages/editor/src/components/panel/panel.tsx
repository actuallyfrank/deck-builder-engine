import { ReactNode } from "react";
import "./panel.css";

export interface PanelProps {
  name: string;
  children: ReactNode;
}

export const Panel = ({ name, children }: PanelProps) => {
  return (
    <div className="panel">
      <div className="panel-title">{name}</div>
      <div className="panel-content">{children}</div>
    </div>
  );
};
