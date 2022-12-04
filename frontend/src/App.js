import { Header, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import {
  LoginPage,
  SignupPage,
  LandingPage,
  DetailPage,
  ChatPage,
  FormPage,
} from "./pages";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let URL = "";
function App() {
  if(process.env.NODE_ENV == "development"){
    URL="http://localhost:3001/";
  }else{
    URL="https://hostel-mate-b9js.onrender.com/";
  }
  // console.log(process.env);
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }

    (async () => {
      const res = await axios.get("http://localhost:3001/products");
      setItems(res.data.data);
    })();
  }, []);

  return (
    <>
      <ChakraProvider>
        <ToastContainer />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="" element={<LandingPage items={items} URL={URL}/>} />
          <Route
            path="login"
            element={
              <LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} URL={URL}/>
            }
          />
          <Route
            path="my-items"
            element={
              <FormPage
                items={items}
                setItems={setItems}
                setLoggedIn={setLoggedIn}
                URL={URL}
              />
            }
          />
          <Route
            path="signup"
            element={<SignupPage setLoggedIn={setLoggedIn} URL={URL}/>}
          />
          <Route path="detail/:id" element={<DetailPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
