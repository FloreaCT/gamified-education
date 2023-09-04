import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      if (loggedInUser.avatar === undefined) {
        navigate("/avatar-creation");
      } else {
        navigate("/dashboard/"); // Navigate to the dashboard
      }
    }
  }, [navigate]);

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // If the user has entered both fields correctly, send the data to the server
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message === "User not found") {
          setCredentialError("User does not exist");
        } else if (data.message === "Invalid credentials") {
          setCredentialError("Invalid credentials");
        } else {
          throw new Error(data.message || "Server error");
        }
      } else {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        if (user.avatar === null) {
          navigate("/avatar-creation");
        } else {
          navigate("/dashboard/"); // Navigate to the dashboard
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="mt-2 text-white flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/images/hero.jpg')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={"mainContainer"}>
        <div className="bg-white p-4 bg-opacity-20 rounded-3xl">
          <div className={"titleContainer"}>
            <div>Student Login</div>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              type="password"
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              className="bg-teal-500 self-center hover:bg-teal-600 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
              type="button"
              onClick={onButtonClick}
              value={"Log in"}
            />
            <label className="text-red-500 text-center ">
              {credentialError}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
