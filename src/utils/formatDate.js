const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
};

export default formatDate;
