import React from "react";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className={"w-full h-full overflow-hidden bg-[#fff]"}>
      <Sidebar />
    </div>
  );
};

export default Layout;
