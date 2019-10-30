import React from "react";

const ShowPanel = (props) => {
  // console.log(props.person)
  // If there is no person selected from the sidebar this component should render an empty div with the id "show-panel", else it should render the format below with the selected person's info
  return (
    <div id="show-panel">
      {props.person.id ? <button
        onClick={() => props.handleDelete(props.person.id)}
        className="delete-button"> Delete </button> : null}
      <img
        className="show-image"
        src={props.person.img_url}
        alt={props.person.name} />
      <h1>{props.person.name}</h1>
      <span>{props.person.bio}</span>
    </div>
  );
};

export default ShowPanel;
