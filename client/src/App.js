import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import OurServices from './pages/OurServices';
import FindYourPath from './pages/FindYourPath';
import PathResults from './pages/PathResults';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import SupportWall from './pages/SupportWall';
import VolunteerSchedulePage from './pages/VolunteerSchedule';
import News from './pages/News';
import AreYouAVictim from './pages/AreYouAVictim';
import Contact from './pages/Contact';
import LilacGala from './pages/LilacGala';
import About from './pages/About';
import Resources from './pages/Resources';
import Sponsorship from './pages/Sponsorship';
import Membership from './pages/Membership';
import Donate from './pages/Donate';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/find-your-path" element={<FindYourPath />} />
          <Route path="/volunteer-schedule" element={<VolunteerSchedulePage />} />
          <Route path="/path-results" element={<PathResults />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support-wall" element={<SupportWall />} />
          <Route path="/news" element={<News />} />
          <Route path="/are-you-a-victim" element={<AreYouAVictim />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lilac-gala" element={<LilacGala />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
