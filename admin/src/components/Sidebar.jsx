import React from "react";
import addIcon from "../assets/add_icon.png";
import orderIcon from "../assets/order_icon.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-[20%] h-full border-r border-gray-300 bg-white mt-18">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add-product"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={addIcon} alt="" />
          <p className="hidden md:block">Add Products</p>
        </NavLink>

        <NavLink
          to="/products-list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={orderIcon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={orderIcon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
