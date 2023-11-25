const hostname = window.location.hostname;
const ua = window.navigator.userAgent;
const isBinge = /binge.com.au/.test(hostname);
const isEdge = /edg/i.test(ua);
const config = { attributes: true, childList: true, subtree: true };
const videoSpeed = 1;

// Function to start BingeObserver
function startBinge() {
    BingeObserver.observe(document, config);
}

// BingeObserver initialization
const BingeObserver = new MutationObserver(bingeSkipAds);

// Function to handle mutations and skip ads
function bingeSkipAds() {
    try {
        const video = document.querySelector('video');
        const videoLength = document.querySelector('.lonZvL');

        if (video) {
            const videoLengthText = videoLength?.textContent?.trim();
            // Default to false if videoLengthText is undefined
            const isNegative = videoLengthText?.includes('-') || false;

            // Set playback rate based on browser
            const playBackRate = isEdge ? 3 : 8;

            // Adjust playback rate based on ad detection
            video.playbackRate = isNegative ? playBackRate : videoSpeed;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Start BingeObserver if on Binge website
if (isBinge) startBinge();
