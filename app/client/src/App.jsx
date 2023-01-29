import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { Title } from "./components/Title";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Map } from "./components/Map";
import { Routes, Route } from 'react-router-dom'

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<><Title /><LandingPage /></>} />
        <Route path="/signin" element={<><Title /><SignIn /></>} />
        <Route path="/signup" element={<><Title /><SignUp /></>} />

        {/* protected routes */}
        <Route path="/map" element={<Map />} />
      </Route>
    </Routes>
  );
}
