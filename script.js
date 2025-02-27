document.addEventListener("DOMContentLoaded", function () {
    var quill = new Quill('#editor-container', {
        theme: 'snow',
        readOnly: true,
        modules: {
            toolbar: false
        }
    });

    // Set initial text content
    quill.root.innerHTML = 'some text here';
});
