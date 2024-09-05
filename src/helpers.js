// src/helpers.js

export function timeAgo(date) {
    if (date === 'Checking...') {
        return 'Checking...';
    }

    const now = new Date();  // Local time
    const secondsAgo = Math.floor((now - new Date(date + 'Z')) / 1000);  // Convert server time to local time using 'Z'

    if (secondsAgo < 60) {
        return `${secondsAgo} secs ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 604800) {
        const daysAgo = Math.floor(secondsAgo / 86400);
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 2419200) {
        const weeksAgo = Math.floor(secondsAgo / 604800);
        return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else if (secondsAgo < 31536000) {
        const monthsAgo = Math.floor(secondsAgo / 2419200);
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else {
        const yearsAgo = Math.floor(secondsAgo / 31536000);
        return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
    }
}

export function timeAgoClass(date) {
    if (date === 'Checking...') {
        return 'pill-yellow';
    }

    const now = new Date();  // Local time
    const secondsAgo = Math.floor((now - new Date(date + 'Z')) / 1000);  // Convert server time to local time using 'Z'

    if (secondsAgo < 60) {
        return 'pill-green';
    } else if (secondsAgo < 86400) { // up to 23 hours
        return 'pill-blue';
    } else if (secondsAgo < 604800) { // up to 6 days
        return 'pill-yellow';
    } else {
        return 'pill-red';
    }
}