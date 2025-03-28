import { ReactNode, RefObject, useState } from "react";
import "./panel.css";

export interface PanelProps {
  name: string;
  children: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
}

export const Panel = ({ name, children, ref }: PanelProps) => {
  return (
    <div ref={ref} className="panel">
      <div className="panel-title">{name}</div>
      <div className="panel-content">{children}</div>
    </div>
  );
};

export interface AreaProps {
  name: string;
  children: ReactNode;
}

const Area = ({ children, name }: AreaProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="panel-area">
      <div
        className="panel-area-header"
        role="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {name}
      </div>
      {!isCollapsed && <div className="panel-area-content">{children}</div>}
    </div>
  );
};

Panel.Area = Area;
