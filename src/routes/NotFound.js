import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Alert variant="warning" className="mt-3 not-found-alert">
        <Alert.Heading>Oh snap! Something wrong!</Alert.Heading>
        <p>
          This page does not exist, back to{" "}
          <span onClick={backToHome}> homepage</span>.
        </p>
      </Alert>
    </>
  );
};

export default NotFound;
