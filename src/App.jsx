import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import CreateVideo from './components/CreateVideo/CreateVideo';
import VideoList from './components/VideoList/VideoList';
import NavBar from './components/NavBar/NavBar';
import PlayVideo from './components/PlayVideo/PlayVideo';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <VideoProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/create" element={<CreateVideo />} />
          <Route path="/playvideo/:videoId" element={<PlayVideo />} />
          <Route path="/profile" element={<Profile />} /> {/* add Profile route */}
        </Routes>
      </BrowserRouter>
    </VideoProvider>
  );
}

export default App;
