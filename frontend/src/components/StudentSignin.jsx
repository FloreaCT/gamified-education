import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser !== "undefined" && loggedInUser !== null) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.avatar === undefined) {
        navigate("/avatar-creation");
      } else {
        navigate("/dashboard/"); // Navigate to the dashboard
      }
    }
  }, [navigate, user]);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const registerUser = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");
    setFullNameError("");
    setUsernameError("");
    setPasswordError("");
    setVerifyPasswordError("");
    // Check if the user has entered both fields correctly

    if (fullName.length < 4) {
      setFullNameError("Full name must be longer then 4 characters");
      return;
    }

    if (username.length < 4) {
      setUsernameError("Username must be longer then 4 characters");
      return;
    }
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

    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
      return;
    }

    // If the user has entered all fields correctly, send the data to the server
    try {
      const response = await fetch("http://localhost:3001/api/userRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          username: username,
          email: email,
          password: password,
        }),
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
        {isRegistering ? (
          <div className="bg-white p-4 bg-opacity-20 rounded-3xl">
            <h1 className="titleContainer">Student Register</h1>
            <br />
            <div className="inputContainer">
              <input
                value={fullName}
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="inputBox"
              />
              <label className="errorLabel">{fullNameError}</label>
            </div>
            <br />
            <div className="inputContainer">
              <input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="inputBox"
              />
              <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className="inputContainer">
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="inputBox"
              />
              <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className="inputContainer">
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="inputBox"
              />
              <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
              <input
                value={verifyPassword}
                type="password"
                placeholder="Verify Password"
                onChange={(e) => setVerifyPassword(e.target.value)}
                className="inputBox"
              />
              <label className="errorLabel">{verifyPasswordError}</label>
            </div>
            <br />
            <div className="inputContainer">
              <button
                className="bg-teal-500 self-center hover:bg-teal-600 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
                onClick={() => {
                  registerUser();
                }}
              >
                Register
              </button>
            </div>
            <div className="inline-block text-white bg-black p-4 bg-opacity-40 rounded-3xl my-4">
              Already have an account?
              <div>
                <button
                  className="bg-teal-500 my-2 self-center hover:bg-teal-600 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
                  onClick={toggleForm}
                >
                  Sign in
                </button>
              </div>
            </div>
            <label className="text-red-500 text-center ">
              {credentialError}
            </label>
          </div>
        ) : (
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
              <div className="text-white bg-black p-4 bg-opacity-40 rounded-3xl my-4">
                Don't have an account?
                <div>
                  <button
                    onClick={toggleForm}
                    className="my-2 bg-teal-500 self-center hover:bg-teal-600 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
                  >
                    {" "}
                    Register
                  </button>
                </div>
              </div>
              <label className="text-red-500 text-center ">
                {credentialError}
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
