import React, { useState, useEffect } from "react";
import { Router } from "react-router";
import { Link } from "react-router-dom";

const data = [
  { id: 0, label: "Assignment 1" },
  { id: 1, label: "Assignment 2" },
];

const Dropdown = (props) => {
  // console.log(props);
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item) => item.id == selectedItem).label
          : props.name}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <Link
            className="dropdown-item"
            // onClick={(e) => handleItemClick(e.target.id)}
            to={{ pathname: "/assignmentDetails", state: item }}
            key={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
