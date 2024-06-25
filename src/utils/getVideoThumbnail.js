const getVideoThumbnail = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/')[3];
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    // Placeholder thumbnail for non-YouTube videos
    return 'https://via.placeholder.com/150';
};

export default getVideoThumbnail;
