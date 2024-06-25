import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import styles from './Video.module.css';

const Video = ({ video, onClose }) => {
    const playerRef = useRef(null);
    const [volume, setVolume] = useState(0.8); // default volume
    const [playbackRate, setPlaybackRate] = useState(1); // default playback speed

    useEffect(() => {
        console.log('Video URL:', video.video_url); // Log video URL
    }, [video]);

    const handleFullScreen = () => {
        if (screenfull.isEnabled && playerRef.current) {
            screenfull.request(playerRef.current.wrapper);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const handlePlaybackRateChange = (rate) => {
        setPlaybackRate(rate);
    };

    return (
        <div className={styles.playerWrapper}>
            <div className={styles.videoTitle}>{video.title}</div>
            <div className={styles.aspectRatioBox}>
                <div className={styles.aspectRatioBoxContent}>
                    <ReactPlayer
                        ref={playerRef}
                        url={video.video_url}
                        controls
                        playing
                        volume={volume}
                        playbackRate={playbackRate}
                        width="100%"
                        height="100%"
                    />
                </div>
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
            <div className={styles.controlsSection}>
                <div className={styles.controlRow}>
                    <label htmlFor="volume">Volume: </label>
                    <input
                        id="volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <button onClick={handleFullScreen} className={styles.fullscreenButton}>Full Screen</button>
                </div>
                <div className={styles.controlRowPlayback}>
                    <label>Playback Speed: </label>
                    {[0.5, 1, 1.5, 2].map(rate => (
                        <button
                            key={rate}
                            onClick={() => handlePlaybackRateChange(rate)}
                            className={styles.playbackRateButton}
                        >
                            {rate}x
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;
