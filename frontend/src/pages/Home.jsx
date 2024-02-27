import React from "react";
import NotesGroup from "../components/NotesGroup";
import NotesSection from "../components/NotesSection";
import CreateNoteTab from "../components/CreateNoteTab";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";

const Home = () => {
  const [newGroup, setNewGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [showCreateTab, setShowCreateTab] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [noteAddedCount, setNoteAddedCount] = useState(0);

  useEffect(() => {
    addNewGroup();
  }, [newGroup]);

  useEffect(() => {
    getGroups();
  }, []);

  const addNewGroup = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const options = {
        method: "post",
        url: `${apiUrl}/api/createGroup`,
        data: {
          groupName: newGroup.groupName,
          groupColor: newGroup.groupColor,
        },
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const result = await axios(options);
      const resultData = result.data;
      setGroups([
        {
          _id: resultData.id,
          groupName: resultData.groupName,
          groupColor: resultData.groupColor,
        },
        ...groups,
      ]);
    } catch (err) {
      // toast(err.response.data.message);

      console.log(err);
      return false;
    }
  };

  const getGroups = async (req, res) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      if (!token) {
      } else {
        const response = await axios.get(`${apiUrl}/api/groups`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        console.log(response);
        setGroups(response.data.groups);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App d-md-flex">
      <NotesGroup
        setNewGroup={setNewGroup}
        groups={groups}
        setShowCreateTab={setShowCreateTab}
        setSelectedGroup={setSelectedGroup}
      />
      <NotesSection
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        noteAddedCount={noteAddedCount}
      />
      {showCreateTab && (
        <CreateNoteTab
          newGroup={newGroup}
          setNewGroup={setNewGroup}
          setShowCreateTab={setShowCreateTab}
        />
      )}
    </div>
  );
};

export default Home;
