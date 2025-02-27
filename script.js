document.addEventListener("DOMContentLoaded", function () {
    var quill = new Quill('#editor-container', {
        theme: 'snow',
        readOnly: false,
        modules: {
            toolbar: true
        }
    });

    // Set initial text content
    quill.root.innerHTML = 'some text here';
});
