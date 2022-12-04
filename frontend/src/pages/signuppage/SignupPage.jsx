import { useState, useEffect } from "react";
import "./signup-page.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignupPage = ({ setLoggedIn, URL }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const showToast = () => {};

  const signupUser = (userData) => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(`${URL}user`, {
          username: userData.email,
          password: userData.password,
        });
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        toast.success("User created successfully");
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        navigate("/");
      }
    })();
  };

  useEffect(() => {
    document.title = "BookStock | Signup";
  }, []);

  const validate = () => {
    if (userData.firstName === "") {
      showToast({
        message: "First Name can't be empty",
        type: "error",
      });
      return false;
    }
    if (userData.lastName === "") {
      showToast({
        message: "Last Name can't be empty",
        type: "error",
      });
      return false;
    }
    if (userData.email === "") {
      showToast({
        message: "Email can't be empty",
        type: "error",
      });
      return false;
    }
    if (userData.password.length < 6) {
      showToast({
        message: "Password length should be greater than 6",
        type: "error",
      });
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      showToast({
        message: "Passwords do not match",
        type: "error",
      });
      return false;
    }
    return true;
  };

  function signupHandler(event) {
    event.preventDefault();
    if (validate()) {
      signupUser(userData);
    }
  }

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="signin-container">
      <form className="form-wrapper">
        <label className="input-label" htmlFor="firstName">
          First Name{" "}
        </label>
        <input
          className="input"
          type="text"
          name="firstName"
          id="firstName"
          required
          value={userData.firstName}
          onChange={onChange}
        />
        <label className="input-label" htmlFor="lastName">
          Last Name{" "}
        </label>
        <input
          className="input"
          type="text"
          name="lastName"
          id="lastName"
          required
          value={userData.lastName}
          onChange={onChange}
        />
        <label className="input-label" htmlFor="email">
          Username{" "}
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          required
          value={userData.email}
          onChange={onChange}
        />
        <label className="input-label" htmlFor="password">
          Password{" "}
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          required
          value={userData.password}
          onChange={onChange}
        />
        <label className="input-label" htmlFor="confirmPassword">
          Confirm Password{" "}
        </label>
        <input
          className="input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={userData.confirmPassword}
          onChange={onChange}
        />
        <Button
          className="btn btn-primary-solid btn-login"
          bg="purple.600"
          color="white"
          size={{ base: "lg", md: "lg" }}
          my={2}
          px={10}
          _hover={{ background: "#9F7AEA" }}
          isLoading={isLoading}
          type="submit"
          value="Signup"
          onClick={signupHandler}
        >
          Signup
        </Button>
        <div className="link-container">
          <Link to={"/login"}>Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};
