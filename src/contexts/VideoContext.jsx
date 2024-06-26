import React, { createContext, useState, useEffect } from 'react';
import getVideoThumbnail from '../utils/getVideoThumbnail';

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [videoList, setVideoList] = useState([]);
    const [originalVideoList, setOriginalVideoList] = useState([]);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const user_id = 'yiting_xiao'; // replace this with the actual user id
    const URL = `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${user_id}`;

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
            setOriginalVideoList(videosWithThumbnails); // store the original video list
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

    // function to handle search and reset the video list
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        if (keyword === '') {
            setVideoList(originalVideoList); // reset video list to all videos if search keyword is cleared
        } else {
            const filtered = originalVideoList.filter(video => video.title.toLowerCase().includes(keyword.toLowerCase()));
            setVideoList(filtered);
        }
    };

    return (
        <VideoContext.Provider value={{ videoList, error, handleSearch, loading }}>
            {children}
        </VideoContext.Provider>
    );
};

export { VideoContext, VideoProvider };
