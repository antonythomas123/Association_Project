import React from "react";
import "./Committee.css";

function Committee({ item }) {
  console.log(item.name);
  return (
    <div className="commitee_container">
      <div className="committee_image">
        <img src={item.profile} alt="Profile Picture" />
      </div>
      <div className="committee_content">
          <span className="p_name">{item.name}</span>
          <span className="po_name">{item.position}</span>
      </div>
    </div>
  );
}

export default Committee;