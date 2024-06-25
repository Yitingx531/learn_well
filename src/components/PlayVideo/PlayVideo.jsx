import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Video from '../Video/Video';
import formatDate from '../../utils/formatDate';
import avatar from '../../assets/images/avatar.png';
import styles from './PlayVideo.module.css';

const PlayVideo = () => {
    const { videoId } = useParams(); // get videoId from URL parameters
    const navigate = useNavigate(); // hook to programmatically navigate
    const [video, setVideo] = useState(null); // state to store video data
    const [comments, setComments] = useState([]); // state to store comments
    const [commentText, setCommentText] = useState(''); // state to store new comment text
    const [warning, setWarning] = useState(''); // state to store warning messages
    const [loading, setLoading] = useState(true); // state to handle loading state
    const [error, setError] = useState(null); // state to store error messages

    const URL = process.env.REACT_APP_URL; // API base URL

    useEffect(() => {
        // function to fetch video data
        const fetchVideo = async () => {
            try {
                const response = await fetch(`${URL}/single?video_id=${videoId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video');
                }
                const videoData = await response.json();
                setVideo(videoData.video); // set video data to state
                setLoading(false); // set loading state to false
            } catch (err) {
                setError(err.message); // set error message to state
                setLoading(false); // set loading state to false
            }
        };

        // function to fetch comments data
        const fetchComments = async () => {
            try {
                const response = await fetch(`${URL}/comments?video_id=${videoId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await response.json();
                setComments(commentsData.comments); // set comments data to state
            } catch (err) {
                console.error('Error fetching comments:', err);
            }
        };

        fetchVideo(); // call function to fetch video data
        fetchComments(); // call function to fetch comments data
    }, [videoId, URL]); // dependencies array

    // function to handle adding a new comment
    const handleAddComment = async () => {
        if (commentText.length < 1) {
            setWarning('Comment cannot be empty.');
            return;
        }

        const commentData = {
            video_id: videoId,
            content: commentText,
            user_id: 'yiting_xiao', // replace this with the actual user id
            created_at: new Date().toISOString() // set creation date
        };

        try {
            const response = await fetch(`${URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const newComment = await response.json();
            setComments([...comments, {
                ...commentData,
                id: newComment.id
            }]); // add new comment to state
            setCommentText(''); // clear comment input
            setWarning(''); // clear warning message
        } catch (error) {
            console.error('Error posting comment:', error);
            setWarning('Failed to post comment. Please try again.');
        }
    };

    // function to handle closing the video player
    const handleClose = () => {
        navigate('/'); // navigate to home page
    };

    if (loading) {
        return <p>Loading...</p>; // show loading message
    }

    if (error) {
        return <p>Error: {error}</p>; // show error message
    }

    return (
        <div className={styles.container}>
            {video ? (
                <>
                    <div className={styles.videoSection}>
                        <Video video={video} onClose={handleClose} />
                    </div>
                    <div className={styles.commentSection}>
                        <h3>Comments</h3>
                        <div className={styles.commentInput}>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment"
                                rows="4"
                                cols="50"
                            />
                            <button onClick={handleAddComment}>Add Comment</button>
                        </div>
                        {warning && <div className={styles.warning}>{warning}</div>}
                        <div className={styles.commentsList}>
                            {comments.length === 0 ? (
                                <p>No comments yet</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index} className={styles.comment}>
                                        <img
                                            src={avatar} // replace with actual avatar url 
                                            alt="Avatar"
                                            className={styles.commentAvatar}
                                        />
                                        <div className={styles.commentContent}>
                                            <div className={styles.commentMeta}>
                                                <span>{comment.user_id}</span>
                                                <span>{formatDate(comment.created_at)}</span>
                                            </div>
                                            <div className={styles.commentText}>
                                                {comment.content}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Video not found</p>
            )}
        </div>
    );
};

export default PlayVideo;
