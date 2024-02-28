import React from "react";
import NotesGroup from "../components/NotesGroup";
import NotesSection from "../components/NotesSection";
import CreateNoteTab from "../components/CreateNoteTab";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";

const Home = ({ setUser }) => {
  const [newGroup, setNewGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [showCreateTab, setShowCreateTab] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [noteAddedCount, setNoteAddedCount] = useState(0);

  useEffect(() => {
    getGroups();
  }, []);

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
        setUser={setUser}
      />
      {showCreateTab && (
        <CreateNoteTab
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          setShowCreateTab={setShowCreateTab}
          groups={groups}
          setGroups={setGroups}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default Home;
