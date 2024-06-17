import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// Login with email (eve.holt@reqres.in)

const Login = (props) => {
  const { setIsLoggedIn, setHiden } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.account);

  const goToHomePage = () => {
    navigate("/");
    setHiden(false);
  };

  useEffect(() => {
    if (user && user.auth === true) {
      goToHomePage();
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter a valid email & password!");
      return;
    }
    dispatch(handleLoginRedux(email, password));
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
