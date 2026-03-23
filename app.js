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
    BingeObserver.observe(document.body, config);
}


// Function to handle mutations and skip ads
function bingeSkipAds() {
    try {
        const video = document.querySelector('video');

        if (video) {
            const isAd =
                document.querySelector('[data-ad-countdown]') ||
                document.querySelector('[data-test-id="AD_COUNTDOWN_LABEL"]');
            const playBackRate = isEdge ? 3 : 8;

            video.playbackRate = isAd ? playBackRate : videoSpeed;
            video.muted = isAd;
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
