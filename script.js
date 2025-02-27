document.addEventListener("DOMContentLoaded", function () {
    var editorContainer = document.getElementById("editor-container");

    if (editorContainer) {
        var quill = new Quill('#editor-container', {
            theme: 'snow',
            readOnly: false,  // Set to true if you want it locked
            modules: {
                toolbar: true  // Enable toolbar for text formatting
            }
        });

        // Set initial text content
        quill.root.innerHTML = 'type here';
    } else {
        console.error("Editor container not found. Make sure #editor-container exists in your HTML.");
    }

    // Fix deprecated DOMNodeInserted event with MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                console.log("New node added:", mutation.addedNodes);
                // Place your existing event logic here
            }
        });
    });

    // Start observing changes in the body or any specific container
    observer.observe(document.body, { childList: true, subtree: true });
});
