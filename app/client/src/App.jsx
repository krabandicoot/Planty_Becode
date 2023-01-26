import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { Title } from "./components/Title";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";


export default function App() {

  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Title /><LandingPage /></>} />
          <Route path="/signin" element={<><Title /><SignIn /></>} />
          <Route path="/signup" element={<><Title /><SignUp /></>} />
        </Routes>
      </BrowserRouter >
    </div >
  );
}
