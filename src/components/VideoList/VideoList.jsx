import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VideoList.module.css';
import { VideoContext } from '../../contexts/VideoContext';
import Loader from '../Loader/Loader';

const VideoList = () => {
    const { videoList, error, loading } = useContext(VideoContext);
    const navigate = useNavigate();

    // handle click on video thumbnail to navigate to the video play page
    const handleThumbnailClick = (videoId) => {
        navigate(`/playvideo/${videoId}`);
    };

    return (
        <div>
            {error ? (
                <div className={styles.error}>Error: {error}</div>
            ) : loading ? (
                // show loader while videos are being fetched
                <Loader />
            ) : (
                <>
                    <div className={styles.videoGrid}>
                        {videoList.map((video) => (
                            <div
                                key={video.id}
                                className={styles.videoItem}
                                onClick={() => handleThumbnailClick(video.id)}
                            >
                                <div className={styles.videoThumbnailContainer}>
                                    <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
                                    <div className={styles.timeLength}>{video.time_length}</div>
                                </div>
                                <div className={styles.videoContent}>
                                    <div className={styles.videoTitle}>{video.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoList;