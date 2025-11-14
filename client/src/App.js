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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/find-your-path" element={<FindYourPath />} />
          <Route path="/path-results" element={<PathResults />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support-wall" element={<SupportWall />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
