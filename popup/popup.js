document.addEventListener('DOMContentLoaded', function () {
    // Retrieves the user's choice from storage and sets the toggle accordingly
    chrome.storage.sync.get(['adSkipEnabled'], function (result) {
        const adSkipEnabled = result.adSkipEnabled !== undefined ? result.adSkipEnabled : true;
        document.getElementById('adSkipToggle').checked = adSkipEnabled;
    });

    // Adds a change event listener to the toggle switch
    document.getElementById('adSkipToggle').addEventListener('change', function () {
        const adSkipEnabled = this.checked;

        // Saves the user's choice in storage
        chrome.storage.sync.set({ 'adSkipEnabled': adSkipEnabled });

        //reload page to apply changes
        chrome.tabs.reload();


    });
});
