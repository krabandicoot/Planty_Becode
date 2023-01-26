import { LandingPage } from "./components/LandingPage";
import { Title } from "./components/Title";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { useState } from "react";


export default function App() {
  const [user, setLoginUser] = useState({

  })
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Title /><LandingPage /></>} />
          <Route path="/signin" element={<><Title /><SignIn setLoginUser={setLoginUser} /></>} />
          <Route path="/signup" element={<><Title /><SignUp /></>} />
        </Routes>
      </BrowserRouter >
    </div >
  );
}
