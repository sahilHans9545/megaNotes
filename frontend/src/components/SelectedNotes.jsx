import React, { useEffect, useState } from "react";
import "./styles/selectedNotes.css";
import leftArrow from "../images/leftArrow.png";
import EnterIcon from "../images/enterNotes.png";
import EnterIconBlue from "../images/enterNotesBlue.png";
import axios from "axios";
import { toast } from "react-toastify";
import { generateAbbreviation } from "../utils/abbreviation";
import apiUrl from "../apiUrl";
import { useNavigate } from "react-router-dom";

function SelectedNotes(props) {
  const [noteData, setNoteData] = useState({});
  const [message, setMessage] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getNotes();
  }, [props.id]);

  const getNotes = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(`${apiUrl}/api/notes/${props.id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      setNoteData(response.data.notes);
      setGroupColor(response.data.groupColor);
      setGroupName(response.data.groupName);
    } catch (error) {
      toast(error.message);
    }
  };

  const getTimeAndDate = () => {
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];
    let strDate = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    return [strTime, strDate];
  };

  const addNotes = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      let [strTime, strDate] = getTimeAndDate();
      const options = {
        method: "post",
        url: `${apiUrl}/api/addNote/${props.id}`,
        data: {
          content: message,
          time: strTime,
          date: strDate,
        },
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const result = await axios(options);
      setNoteData([
        ...noteData,
        { content: message, time: strTime, date: strDate },
      ]);
    } catch (error) {
      toast(error.message);
      if (error.response.status === 401) {
        props.setUser("");
        navigate("/login");
      }
    }
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const goBack = () => {
    document.querySelector(".notesGroup").classList.remove("mobile-hide");
    document.querySelector(".notesSection").classList.remove("mobile-show");
  };

  return (
    <div>
      <div className="notes-upper-section d-flex flex-column">
        <div className="group notes-heading py-2 py-md-3 p-3 d-flex align-items-center gap-3">
          <img
            src={leftArrow}
            alt=""
            onClick={goBack}
            style={{ width: "18px", filter: "brightness(100)" }}
            className="d-md-none"
          />
          <div
            className="group-icon flex-shrink-0"
            style={{ background: groupColor }}
          >
            {groupName &&
              (function () {
                return generateAbbreviation(groupName);
              })()}
          </div>
          <div className="group-name">{groupName}</div>
        </div>
        <div id="Notes">
          {noteData.length > 0 &&
            noteData.map((e, index) => {
              return (
                <div className="noteItem mb-4" key={index}>
                  <p>{e.content}</p>
                  <div className="noteTime d-flex justify-content-end">
                    <p className="d-flex align-items-center gap-3">
                      {e.date}
                      <span className="dot"></span>
                      {e.time}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="EnterNotes">
        <textarea
          name=""
          id=""
          placeholder="Enter your text here..........."
          className="px-md-4 px-3 py-md-3 py-2"
          onChange={handleMessage}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNotes();
              setMessage("");
            }
          }}
        ></textarea>
        <img
          src={message.length ? EnterIconBlue : EnterIcon}
          alt=""
          onClick={() => {
            // props.EnterNewNote(message, props.id);
            addNotes();
            setMessage("");
          }}
        />
      </div>
    </div>
  );
}

export default SelectedNotes;
