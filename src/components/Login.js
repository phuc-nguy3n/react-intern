import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className="login-container  col-12 col-sm-4">
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
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
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
