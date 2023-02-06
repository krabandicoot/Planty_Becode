import { Layout } from "./components/Layout";

import { Title } from "./components/Title";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import ColorPicker from "./components/PickColor";
import { SignUp } from "./components/SignUp";

import { Header } from "./components/Header";
import { Map } from "./components/Map";
import { Leaderboard } from "./components/Leaderboard";
import { Gamelog } from "./components/Gamelog";
import { GameRules } from "./components/GameRules";
import { User } from "./components/User";
import { Tree } from "./components/Tree";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from 'react-router-dom'
import RequireLayout from "./components/RequireLayout";

export default function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<><Title /><LandingPage /></>} />
        <Route path="/signin" element={<><Title /><SignIn /></>} />
        <Route path="/signup" element={<><Title /><SignUp /></>} />


        {/* Private Routes */}
        <Route element={<RequireLayout />}>
          <Route path="map" element={<><Header /><Map /><Navbar /></>} />
          <Route path="leaderboard" element={<><Header /><Leaderboard /><Navbar /></>} />
          <Route path="gamelog" element={<><Header /><Gamelog /><Navbar /></>} />
          <Route path="gamerules" element={<><Header /><GameRules /><Navbar /></>} />
          <Route path="account" element={<><Header /><User /><Navbar /></>} />
          <Route path="tree" element={<><Header /><Tree /><Navbar /></>} />
        </Route>
      </Route>
    </Routes >
  );
}
