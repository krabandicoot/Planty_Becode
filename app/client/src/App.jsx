import { Layout } from "./components/Layout";

import { Title } from "./components/Title";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import ColorPicker from "./components/PickColor";
import { SignUp } from "./components/SignUp";

import { Map } from "./components/Map";
import { Leaderboard } from "./components/Leaderboard";
import { Gamelog } from "./components/Gamelog";
import { GameRules } from "./components/GameRules";
import { User } from "./components/User";
import { Tree } from "./components/Tree";

import { Routes, Route } from 'react-router-dom'
import RequireLayout from "./components/RequireLayout";

export default function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<><Title /><Layout /><Footer /></>}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/pickcolor" element={<ColorPicker />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Private Routes */}
      <Route path="/" element={<><Header /><RequireLayout /><Navbar /><Footer /></>}>
        <Route path="map" element={<Map />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="gamelog" element={<Gamelog />} />
        <Route path="gamerules" element={<GameRules />} />
        <Route path="account" element={<User />} />
        <Route path="tree" element={<Tree />} />
      </Route>
    </Routes >
  );
}
