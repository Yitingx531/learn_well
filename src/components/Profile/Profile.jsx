import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import formatDate from '../../utils/formatDate'; // assuming you have a utility function to format dates

const Profile = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editVideo, setEditVideo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editUrl, setEditUrl] = useState('');
    const URL = process.env.REACT_APP_URL;

    // fetch user's videos
    useEffect(() => {
        const fetchUserVideos = async () => {
            try {
                const response = await fetch(`${URL}?user_id=yiting_xiao`); // replace with the actual user ID
                if (!response.ok) {
                    throw new Error('Failed to fetch user videos');
                }
                const data = await response.json();
                setVideos(data.videos);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserVideos();
    }, [URL]);

    // handle editing video details
    const handleEditVideo = async (videoId) => {
        const editData = {
            video_id: videoId,
            title: editTitle,
            description: editDescription,
            video_url: editUrl,
        };

        try {
            //edit video info
            const response = await fetch(`${URL}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit video');
            }

            const updatedVideo = await response.json();
            setVideos(videos.map(video => video.id === videoId ? updatedVideo : video));
            setEditVideo(null);
        } catch (error) {
            console.error('Error editing video:', error);
            setError('Failed to edit video. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Your Videos</h2>
            {videos.length === 0 ? (
                <p>No videos found</p>
            ) : (
                <div className={styles.videoList}>
                    {videos.map(video => (
                        <div key={video.id} className={styles.videoItem}>
                            {editVideo === video.id ? (
                                <div className={styles.editForm}>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                    <label>Description:</label>
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                    <label>Video URL:</label>
                                    <input
                                        type="text"
                                        value={editUrl}
                                        onChange={(e) => setEditUrl(e.target.value)}
                                    />
                                    <div>
                                        <button className={`${styles.editFormButton} ${styles.saveButton}`} onClick={() => handleEditVideo(video.id)}>Save</button>
                                        <button className={`${styles.editFormButton} ${styles.cancelButton}`} onClick={() => setEditVideo(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                    <p>Created on: {formatDate(video.created_at)}</p>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => {
                                            setEditVideo(video.id);
                                            setEditTitle(video.title);
                                            setEditDescription(video.description);
                                            setEditUrl(video.video_url);
                                        }}>Edit</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
