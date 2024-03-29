import React, { useEffect, useState } from "react";
import SelectedNotes from "./SelectedNotes";
import NotesBg from "../images/notesBg.png";
import lockIcon from "../images/lockIcon.png";

function NotesSection(props) {
  const [Notes, setNotes] = useState([]);

  return (
    <div className="notesSection">
      {!props.selectedGroup ? (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100%" }}
        >
          <div className="blank_notes">
            <img src={NotesBg} alt="" className="notesBgImg" />
            <p className="pocketNotesHead">Pocket Notes</p>
            <p>
              Send and receive messages without keeping your phone online.{" "}
              <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile
              phone
            </p>
          </div>
          <p className="encryptedLine d-flex align-items-center gap-2">
            <img
              src={lockIcon}
              alt=""
              style={{ width: "15px", height: "18px" }}
            />{" "}
            end-to-end encrypted
          </p>
        </div>
      ) : (
        <SelectedNotes
          Notes={Notes}
          id={props.selectedGroup}
          setUser={props.setUser}
        />
      )}
    </div>
  );
}

export default NotesSection;
