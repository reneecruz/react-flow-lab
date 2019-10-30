import React from "react";

const Sidebar = (props) => {

  return <ul className="sidebar-ul">
    {props.people.map((person => {
      return <li
        className="sidebar-li"
        onClick={props.handleClick}
        key={person.id}>
        {person.name}
      </li>
    }))}
  </ul>;
};

export default Sidebar;
