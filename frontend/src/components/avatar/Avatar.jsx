import React, { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer, avataaars, loreleiNeutral } from "@dicebear/collection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Avatar = ({ answers }) => {
  const [features, setFeatures] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const dashboard = () => {
    navigate("/dashboard/");
  };

  useEffect(() => {
    if (answers[0] === "Mr. Awesome") {
      setFeatures(["Cuddles", adventurer]);
    } else if (answers[0] === "Ms. Fabulous") {
      setFeatures(["Mimi", adventurer]);
    } else if (answers[0] === "Enby Star") {
      setFeatures(["Spooky", avataaars]);
    } else if (answers[0] === "I'm a Mystery!") {
      setFeatures(["Felix", loreleiNeutral]);
    }
  }, [answers]);

  useEffect(() => {
    if (features.length === 2) {
      const generatedAvatar = createAvatar(features[1], {
        seed: features[0],
        size: 128,
      }).toDataUriSync();

      setAvatar(generatedAvatar);

      // Update the database
      const updateAvatarInDB = async () => {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const userEmail = user.email;
        try {
          await axios.post("http://localhost:3001/api/setAvatar", {
            avatar: generatedAvatar,
            email: userEmail,
          });

          // Update localStorage
          user.avatar = generatedAvatar;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to update avatar:", error);
        }
      };

      updateAvatarInDB();
    }
  }, [features]);

  if (!avatar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col align-center items-center ">
      <div>🎉 Ta-da! Behold your pixel-perfect alter ego! 🎉</div>
      <div>
        🛠️ Fear not, young adventurer! As you level up, you'll unlock magical
        scrolls to tweak or totally morph your avatar! 🛠️
      </div>
      <img src={avatar} alt="Avatar" />

      <button
        type="button"
        className="bg-teal-500 rounded-lg p-3 text-white"
        onClick={dashboard}
      >
        Continue
      </button>
    </div>
  );
};

export default Avatar;
