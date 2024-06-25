import React, { useState } from 'react';
import styles from './CreateVideo.module.css';

const CreateVideo = () => {
    // hardcoded user_id for the current user, please replace this with the actual user_id from local storage or other sources
    const user_id = 'yiting_xiao';

    // initial form data structure
    const initialFormData = {
        title: '',
        video_url: '',
        description: '',
        user_id: user_id
    };

    // state to manage video data form inputs
    const [videoData, setVideoData] = useState(initialFormData);

    // base url for the api
    const URL = process.env.REACT_APP_URL;

    // function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData(prev => ({ ...prev, [name]: value }));
    };

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(videoData)
            });
            if (response.ok) {
                // reset the form fields to initial state on successful submission
                setVideoData(initialFormData);
            } else {
                console.log('Failed to submit video');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.heading}>Create New Video</h2>
                <label className={styles.label}>Title</label>
                <input
                    name="title"
                    value={videoData.title}
                    onChange={handleChange}
                    className={styles.input}
                />
                <label className={styles.label}>Video URL</label>
                <input
                    name="video_url"
                    value={videoData.video_url}
                    onChange={handleChange}
                    className={styles.input}
                />
                <label className={styles.label}>Description</label>
                <textarea
                    name="description"
                    value={videoData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                ></textarea>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
};

export default CreateVideo;