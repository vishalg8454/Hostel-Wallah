import { useState } from "react";
import "./login-page.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormPage } from "../../pages";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";

const LoginPage = ({ loggedIn, setLoggedIn, URL }) => {
  console.log(loggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function setGuestCredential(event) {
    event.preventDefault();
    setEmail("vishal");
    setPassword("admin");
  }

  async function loginHandler(event) {
    event.preventDefault();
    (async () => {
      try {
        console.log("here");
        setIsLoading(true);
        const res = await axios.post(`${URL}signin`, {
          username: email,
          password: password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("id", res.data.id);
        setLoggedIn(true);
        toast.success("Logged in Successfully");
        navigate("/");
        console.log(res.data);
      } catch (error) {
        toast.error("Unable to log in");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <div className="signin-container">
      <form className="form-wrapper">
        <label className="input-label" htmlFor="email">
          Email Address{" "}
        </label>
        <input
          className="input"
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox-div">
          <input type="checkbox" name="remember" />
          <label htmlFor="remember"> Remember me</label>
        </div>
        <span className="input-label btn-link">
          <a href="#">Forgot your Password?</a>
        </span>
        <Button
          bg="purple.600"
          color="white"
          size={{ base: "lg", md: "lg" }}
          my={2}
          px={10}
          _hover={{ background: "#9F7AEA" }}
          isLoading={isLoading}
          className="btn btn-primary-solid btn-login"
          type="submit"
          value="Login"
          onClick={loginHandler}
        >
          Login
        </Button>
        <Button
          className="btn btn-secondary-solid btn-login"
          onClick={(e) => setGuestCredential(e)}
        >
          Use guest credentials
        </Button>
        <div className="link-container">
          <Link to={"/signup"}>Create New Account</Link>
        </div>
      </form>
    </div>
  );
};

export { LoginPage };
