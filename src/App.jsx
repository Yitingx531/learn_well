import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import CreateVideo from './components/CreateVideo/CreateVideo';
import VideoList from './components/VideoList/VideoList';
import NavBar from './components/NavBar/NavBar';
import PlayVideo from './components/PlayVideo/PlayVideo';
import Profile from './components/Profile/Profile'; 
import styles from './App.module.css'; 

function App() {
  return (
    <VideoProvider>
      <div className={styles.appContainer}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<VideoList />} />
            <Route path="/create" element={<CreateVideo />} />
            <Route path="/playvideo/:videoId" element={<PlayVideo />} />
            <Route path="/profile" element={<Profile />} /> {/* add Profile route */}
          </Routes>
        </BrowserRouter>
      </div>
    </VideoProvider>
  );
}

export default App;
