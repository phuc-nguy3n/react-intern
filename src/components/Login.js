import { useState, useEffect, useContext } from "react";
import { loginApi } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Login with email (eve.holt@reqres.in)

const Login = (props) => {
  const { setIsLoggedIn, setHiden } = props;
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const goToHomePage = () => {
    navigate("/");
    setHiden(false);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let emailTemp = localStorage.getItem("email");
    if (token) {
      loginContext(emailTemp, token);
      goToHomePage();
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter a valid email & password!");
      return;
    }
    setIsloading(true);
    let res = await loginApi(email.trim(), password);
    setIsloading(false);
    if (res && res.token) {
      loginContext(email, res.token);
      setIsLoggedIn(true);
      goToHomePage();
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
  };

  const handleStatusLoginBtn = () => {
    if (isLoading) {
      return "loading";
    } else {
      if (email && password) {
        return "active";
      } else {
        return "";
      }
    }
  };

  const handlePressEnter = (event) => {
    if (email && password) {
      if (event.key === "Enter") {
        handleLogin();
      }
    }
  };

  return (
    <>
      <div className="login-container col-12 col-sm-8 col-md-6 col-xl-4">
        <div className="title">Login</div>
        <div className="text">Email or username</div>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="Email or username..."
          onKeyDown={(event) => handlePressEnter(event)}
        />
        <div className="field-group">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={isShowPassword ? "text" : "password"}
            placeholder="Password..."
            onKeyDown={(event) => handlePressEnter(event)}
          />
          <i
            onClick={() => setIsShowPassword(!isShowPassword)}
            className={`fa-solid ${
              isShowPassword ? "fa-eye" : "fa-eye-slash"
            } `}
          ></i>
        </div>
        <button
          className={handleStatusLoginBtn()}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
          onKeyDown={(event) => handlePressEnter(event)}
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
        <div className="back" onClick={goToHomePage}>
          <i className="fa-solid fa-chevron-left"></i>
          <span> Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
