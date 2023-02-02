import { Layout } from "./components/Layout";

import { Title } from "./components/Title";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

import { Header } from "./components/Header";
import { Map } from "./components/Map";
import { Leaderboard } from "./components/Leaderboard";
import { Gamelog } from "./components/Gamelog";
import { GameRules } from "./components/GameRules";
import { User } from "./components/User";
import { Tree } from "./components/Tree";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="/" element={<><Title /><LandingPage /><Footer /></>} />
        <Route path="signin" element={<><Title /><SignIn /><Footer /></>} />
        <Route path="signup" element={<><Title /><SignUp /><Footer /></>} />

        {/* protected routes */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="map" element={<><Header /><Map /><Navbar /><Footer /></>} />
        <Route path="leaderboard" element={<><Header /><Leaderboard /><Navbar /><Footer /></>} />
        <Route path="gamelog" element={<><Header /><Gamelog /><Navbar /><Footer /></>} />
        <Route path="gamerules" element={<><Header /><GameRules /><Navbar /><Footer /></>} />
        <Route path="account" element={<><Header /><User /><Navbar /><Footer /></>} />
        <Route path="/tree" element={<><Header /><Tree /><Navbar /><Footer /></>} />
      </Route>
    </Routes >
  );
}
