import React, { useState } from "react";
import "./createNoteTab.css";

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

  const handleSubmit = () => {
    if (InputText === "") {
      alert("Enter a Valid Group Name !");
      return;
    } else if (Color === "") {
      alert("Select a Color !");
      return;
    }
    let id = new Date().getTime();
    props.setNewGroup({ groupName: InputText, groupColor: Color });
    const notesData = JSON.parse(localStorage.getItem("NotesData"));
    localStorage.setItem(
      "NotesData",
      JSON.stringify([...notesData, { id: id, notes: [] }])
    );

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
