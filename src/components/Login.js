import { useState, useEffect } from "react";
import { loginApi } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Login with email (eve.holt@reqres.in)

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const goToHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      goToHomePage();
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter a valid email & password!");
      return;
    }
    setIsloading(true);
    let res = await loginApi(email, password);
    setIsloading(false);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
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
        />
        <div className="field-group">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={isShowPassword ? "text" : "password"}
            placeholder="Password..."
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
        >
          {isLoading ? (
            <i class="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
        <div className="back">
          <i className="fa-solid fa-chevron-left"></i>
          <span> Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
