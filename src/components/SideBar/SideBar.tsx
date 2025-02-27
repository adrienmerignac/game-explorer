import React from "react";
import NavItems from "../NavItems/NavItems";

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <label htmlFor="sidebar-toggle" className="sidebar-close">
      ✖
    </label>
    <nav className="sidebar__nav">
      <NavItems />
    </nav>
  </div>
);

export default Sidebar;
