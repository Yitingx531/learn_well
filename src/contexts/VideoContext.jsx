import React, { createContext, useState, useEffect } from 'react';
import getVideoThumbnail from '../utils/getVideoThumbnail';

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [videoList, setVideoList] = useState([]);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const user_id = 'yiting_xiao'; // replace this with the actual user id
    const URL = `${process.env.REACT_APP_URL}?user_id=${user_id}`;

    // function to fetch videos from the server
    const fetchVideos = async () => {
        try {
            setLoading(true); // set loading state to true
            const response = await fetch(URL);
            const contentType = response.headers.get("content-type");

            // check if the response is ok and is in JSON format
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail ? errorData.detail[0].msg : `Network error, received a status code of ${response.status}`);
            }
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("received non-JSON response");
            }

            // parse the response and add video thumbnails
            const parsedResponse = await response.json();
            const videosWithThumbnails = parsedResponse.videos.map(video => ({
                ...video,
                thumbnail: getVideoThumbnail(video.video_url)
            }));

            setVideoList(videosWithThumbnails); // update video list state
            setLoading(false); // set loading state to false
        } catch (error) {
            setError(error.message); // set error state
            setLoading(false); // set loading state to false
            console.error('error fetching videos:', error);
        }
    };

    // useEffect to fetch videos once when the component mounts
    useEffect(() => {
        fetchVideos();
    }, [URL]);

    // useEffect to filter videos based on the search keyword
    useEffect(() => {
        const filtered = videoList.filter(video => video.title.toLowerCase().includes(searchKeyword.toLowerCase()));
        setVideoList(filtered);
    }, [searchKeyword]);

    return (
        <VideoContext.Provider value={{ videoList, error, setSearchKeyword, loading }}>
            {children}
        </VideoContext.Provider>
    );
};

export { VideoContext, VideoProvider };
