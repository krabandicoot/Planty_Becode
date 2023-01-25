import "./App.css";
import Lottie from "lottie-react";
import animationData from './lotties/logo-Planty.json';
import { LandinPage } from "./components/LandingPage";
import { Title } from "./components/Title";

export default function App() {
  
  return (
    <div>
      <Title/>
      <LandinPage/>
    </div>
  );
}
