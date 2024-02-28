import React, { useState } from "react";
import "./createNoteTab.css";
import apiUrl from "../apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const colorArray = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

function CreateNoteTab(props) {
  const [InputText, setInputText] = useState("");
  const [Color, setColor] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleColor = (e) => {
    try {
      document
        .querySelector(".colorIcon.selected")
        .classList.remove("selected");
      e.target.classList.add("selected");
    } catch (error) {
      e.target.classList.add("selected");
    }
    setColor(e.target.id);
  };
  const addNewGroup = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const options = {
        method: "post",
        url: `${apiUrl}/api/createGroup`,
        data: {
          groupName: InputText,
          groupColor: Color,
        },
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const result = await axios(options);
      const resultData = result.data;

      props.setGroups([
        {
          _id: resultData.id,
          groupName: resultData.groupName,
          groupColor: resultData.groupColor,
        },
        ...props.groups,
      ]);
      props.setSelectedGroup(resultData.id);
      document
        .querySelector(".selectedGroup")
        .classList.remove("selectedGroup");
      document.querySelector("#groups .group").classList.add("selectedGroup");
    } catch (err) {
      // toast(err.response.data.message);

      if (err.response.status === 401) {
        toast(err.response.data.error);
        props.setUser("");
        navigate("/login");
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (InputText === "") {
      alert("Enter a Valid Group Name !");
      return;
    } else if (Color === "") {
      alert("Select a Color !");
      return;
    }
    addNewGroup();
    setColor("");
    setInputText("");
    props.setShowCreateTab(false);
  };

  return (
    <div>
      <div
        className="bg-overlay"
        onClick={() => {
          props.setShowCreateTab(false);
        }}
      ></div>

      <div id="createNoteTab" className="">
        <p className="createNodeHead">Create New Notes group</p>
        <div className="InputField d-flex align-items-center gap-3 gap-sm-4 mt-4 px-sm-2">
          <h2 className="fieldName">Group Name</h2>
          <input
            type="text"
            placeholder="Create New Notes group...."
            className="flex-1"
            onChange={handleChange}
            value={InputText}
          />
        </div>
        <div className="InputField d-flex  align-items-center justify-content-between justify-content-md-start gap-2 gap-sm-4 mt-4 px-sm-2">
          <h2 className="fieldName">Choose colour</h2>
          <div className="d-flex gap-2 flex-1 flex-wrap">
            {colorArray.map((e) => {
              return (
                <div
                  key={e}
                  id={e}
                  className="colorIcon"
                  style={{ background: e }}
                  onClick={handleColor}
                ></div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-sm-end mt-4 pt-2 pt-sm-0 mt-sm-3">
          <button className="createBtn" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNoteTab;
