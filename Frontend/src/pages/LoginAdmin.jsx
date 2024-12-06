import { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoginAdmin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isValidUser = await authenticateUser(username, password);

    if (isValidUser) {
      localStorage.setItem("authToken", isValidUser.token);
      onLogin(isValidUser.role);
      navigate(isValidUser.role === "admin" ? "/adashboard" : "/dashboard");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const authenticateUser = async (username, password) => {
    const validCredentials = {
      admin: "admin123",
      user: "user123",
    };

    if (validCredentials[username] === password) {
      return { role: username };
    }
    return null;
  };

  return (
    <div>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login Page</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @import url('https://fonts.googleapis.com/css2?family=Plush+Variable+Roman:wght@100..900&display=swap');
              
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }

              body {
                font-family: Arial, sans-serif;
              }

              .wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, rgba(2, 0, 0.6) -20%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
                margin: 0;
                padding: 0;
                z-index: -1;
                border: none;
                border-radius: 0px;
              }

              .box div {
                position: absolute;
                width: 60px;
                height: 60px;
                background-color: transparent;
                border: 6px solid rgba(255, 255, 255, 0.8);
              }
              .box div:nth-child(1) { top: 12%; left: 42%; animation: animate 10s linear infinite; }
              .box div:nth-child(2) { top: 70%; left: 50%; animation: animate 7s linear infinite; }
              .box div:nth-child(3) { top: 17%; left: 6%; animation: animate 9s linear infinite; }
              .box div:nth-child(4) { top: 20%; left: 60%; animation: animate 10s linear infinite; }
              .box div:nth-child(5) { top: 67%; left: 10%; animation: animate 6s linear infinite; }
              .box div:nth-child(6) { top: 80%; left: 70%; animation: animate 12s linear infinite; }
              .box div:nth-child(7) { top: 60%; left: 80%; animation: animate 15s linear infinite; }
              .box div:nth-child(8) { top: 32%; left: 25%; animation: animate 16s linear infinite; }
              .box div:nth-child(9) { top: 90%; left: 25%; animation: animate 9s linear infinite; }
              .box div:nth-child(10) { top: 20%; left: 80%; animation: animate 5s linear infinite; }
              @keyframes animate {
                0% {
                  transform: scale(0) translateY(0) rotate(0);
                  opacity: 1;
                }
                100% {
                  transform: scale(1.3) translateY(-90px) rotate(360deg);
                  opacity: 0;
                }
              }

              .login-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                position: relative;
                z-index: 10;
              }

              .glass {
                background: rgba(255, 255, 255, 0);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                width: 600px;
                height: 450px;
                border-radius: 15px;
                border-color: rgba(255, 255, 255,0.2);
                position: relative;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .login-form {
                width: 90%;
                max-width: 520px;
                text-align: center;
                padding: 24px;
                margin-top: -40px; /* Slight uplift */
              }

              .login-form h1 {
                font-family: 'Plush Variable Roman', serif;
                font-size: 45px;
                font-weight: 800;
                margin-bottom: 20px;
                color: white;
              }

              .input-group {
                margin-bottom: 16px;
                position: relative;
              }

              .input-group input {
                width: 100%;
                height: 50px;
                padding: 12px;
                padding-right: 40px;
                border-radius: 25px;
                border: 2px solid #ccc;
                outline: none;
                font-size: 16px;
                background-color: rgba(255,255,255,0.9);
                transition: border-color 0.3s;
              }

              .input-group input:focus {
                border-color: #007bff;
              }

              .input-group svg {
                position: absolute;
                top: 50%;
                right: 16px;
                transform: translateY(-50%);
                color: #888;
              }

              .error-message {
                color: red;
                font-size: 14px;
                margin-bottom: 16px;
              }

              .login-button {
                width: 100%;
                padding: 12px;
                border-radius: 25px;
                background: #007bff;
                color: white;
                font-size: 16px;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s;
              }

              .login-button:hover {
                background-color: #0056b3;
              }

              .forget-password {
                color: white;
                text-decoration: none;
                position: absolute;
                right: 24px;
                bottom: 50px;
                font-size: 14px;
                font-weight: bold;
              }

              .forget-password:hover {
                text-decoration: underline;
                color: #ddd;
              }
            `,
          }}
        />
        <div className="wrapper">
          <div className="box">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>

        <div className="login-container">
          <div className="glass">
            <div className="login-form">
              <h1>SIET LMS</h1>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <FaUserGraduate />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <RiLockPasswordFill />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              <a href="#" className="forget-password">Forget Password</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;