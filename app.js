const hostname = window.location.hostname;
const ua = window.navigator.userAgent;
const isBinge = /binge.com.au/.test(hostname);
const isEdge = /edg/i.test(ua);
const config = { attributes: true, childList: true, subtree: true };
const videoSpeed = 1;


// BingeObserver initialization
const BingeObserver = new MutationObserver(bingeSkipAds);

// Function to start BingeObserver
function startBinge() {
    BingeObserver.observe(document, config);
}


// Function to handle mutations and skip ads
function bingeSkipAds() {
    try {
        const video = document.querySelector('video');
        const videoLength = document.querySelector('[role="timer"]');

        if (video) {
            const videoLengthText = videoLength?.textContent?.trim();
            // Default to false if videoLengthText is undefined
            const isNegative = videoLengthText?.includes('-') || false;

            // Set playback rate based on browser
            const playBackRate = isEdge ? 3 : 8;

            // Adjust playback rate based on ad detection
            video.playbackRate = isNegative ? playBackRate : videoSpeed;

            // Mutes the video if the video length is negative
            video.muted = isNegative;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Retrieve user's choice from storage
chrome.storage.sync.get(['adSkipEnabled'], function (result) {
    const adSkipEnabled = result.adSkipEnabled !== undefined ? result.adSkipEnabled : true;
    // Starts BingeObserver if adSkipEnabled is true
    if (isBinge && adSkipEnabled) startBinge();
});
