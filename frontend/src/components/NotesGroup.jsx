import React, { useEffect, useState } from "react";
import PlusBtn from "../images/plus-button.png";
import axios from "axios";
import { generateAbbreviation } from "../utils/abbreviation";

function NotesGroup(props) {
  const handleCreateTab = () => {
    props.setShowCreateTab(true);
  };

  const handleGroup = (e) => {
    try {
      document
        .querySelector(".selectedGroup")
        .classList.remove("selectedGroup");
      e.target.classList.add("selectedGroup");
    } catch (error) {
      e.target.classList.add("selectedGroup");
    }

    props.setSelectedGroup(e.target.getAttribute("selected_id"));

    // console.log(e.target.getAttribute("selected_id"));
    document.querySelector(".notesGroup").classList.add("mobile-hide");
    document.querySelector(".notesSection").classList.add("mobile-show");
  };

  return (
    <div className="notesGroup position-relative d-flex flex-column">
      <h2 style={{ fontSize: "1.9rem" }} className="text-center px-4 mb-4">
        Pocket Notes
      </h2>

      <button
        className="createNotesBtn position-absolute d-flex justify-content-center align-items-center rounded-circle border-0 p-3"
        onClick={handleCreateTab}
      >
        <img src={PlusBtn} alt="" />
      </button>
      <div className="overflow-auto">
        <div id="groups">
          {props.groups.map((e, index) => {
            return (
              <div
                className="group  py-3 ps-sm-4 px-3 px-sm-4 d-flex align-items-center gap-3 "
                onClick={handleGroup}
                key={index}
                selected_id={e._id}
              >
                <div
                  className="group-icon flex-shrink-0"
                  style={{ background: e.groupColor }}
                >
                  {generateAbbreviation(e.groupName)}
                </div>
                <div className="group-name">{e.groupName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotesGroup;
