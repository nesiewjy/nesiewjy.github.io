document.addEventListener("DOMContentLoaded", function () {
    var editorContainer = document.getElementById("editor-container");

    if (editorContainer) {
        var quill = new Quill('#editor-container', {
            theme: 'snow',
            readOnly: false,  // Change to false to allow editing
            modules: {
                toolbar: true  // Show formatting toolbar
            }
        });

        // Set initial text content
        quill.root.innerHTML = 'type something here';
    } else {
        console.error("Editor container not found. Make sure #editor-container exists in your HTML.");
    }
});
