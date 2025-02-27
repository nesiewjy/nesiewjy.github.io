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
        quill.root.innerHTML = `<p>Berlin is snowing. It’s my third day in Wedding...</p>
            <p>The studio faces the street like a shopfront...</p>
            <p>And then the snow comes, making people more aware...</p>
            <p>I was telling my friends that Berlin feels so much livelier than The Netherlands...</p>
            <hr>
            <p>I’m staying in an old, grand building, its thick walls that hold the weight of time...</p>
            <p>Inside, the studio is full of textures...</p>
            <p>There’s something intimate about living in a place so meticulously arranged...</p>
            <p>I think that’s what makes doing a residency special...</p>
            <p>My playlist shuffles to a song “A都市の秋” (City A’s autumn)...</p>`;
    } else {
        console.error("Editor container not found. Make sure #editor-container exists in your HTML.");
    }
});
