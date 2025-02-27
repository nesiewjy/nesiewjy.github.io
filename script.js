document.addEventListener("DOMContentLoaded", function () {
    var editorContainer = document.getElementById("editor-container");

    if (editorContainer) {
        function setEditorWidth() {
            if (window.innerWidth > 768) {
                editorContainer.style.width = "70%";  // Desktop: 70% width
            } else {
                editorContainer.style.width = "100%"; // Mobile: Full width
            }
            editorContainer.style.margin = "0"; // Align to the left
        }

        setEditorWidth();
        window.addEventListener("resize", setEditorWidth);

        var quill = new Quill('#editor-container', {
            theme: 'snow',
            readOnly: false,
            modules: {
                toolbar: true
            }
        });

        // Extract date key from the filename
        var pagePath = window.location.pathname;
        var dateKey = pagePath.substring(pagePath.lastIndexOf("/") + 1, pagePath.lastIndexOf("."));
        
        // Load saved text from localStorage
        var savedContent = localStorage.getItem(dateKey);
        if (savedContent) {
            quill.root.innerHTML = savedContent;
        }

        // Auto-save content to localStorage on text change
        quill.on('text-change', function () {
            localStorage.setItem(dateKey, quill.root.innerHTML);
        });

        // 📌 Button to save directly to GitHub
        var saveGitHubButton = document.createElement("button");
        saveGitHubButton.innerText = "Save to GitHub";
        saveGitHubButton.style.marginTop = "10px";
        saveGitHubButton.onclick = function () {
            var fullHtml = document.documentElement.outerHTML;;
            saveToGitHub(dateKey, textToSave);
        };
        editorContainer.parentNode.appendChild(saveGitHubButton);
    } else {
        console.error("Editor container not found. Make sure #editor-container exists in your HTML.");
    }

    // GitHub API function to commit and push the file
    function saveToGitHub(filename, content) {
        var githubUsername = "nesiewjy"; // Replace with your GitHub username
        var repoName = "nesiewjy.github.io"; // Replace with your GitHub repo name
        var branch = "main"; // Change if you're using a different branch
        var filePath = "entries/" + filename + ".html"; // Adjust path to where you store entries
        var githubToken = prompt("Enter your GitHub Access Token:");


        var apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

        // Get the latest file SHA (GitHub requires this for updates)
        fetch(apiUrl, {
            headers: { Authorization: `token ${githubToken}` }
        })
        .then(response => response.json())
        .then(data => {
            var sha = data.sha; // Get existing file SHA

            // Prepare commit payload
            var payload = {
                message: `Updated diary entry ${filename}`,
                content: btoa(unescape(encodeURIComponent(content))), // Convert text to Base64
                branch: branch
            };

            if (sha) {
                payload.sha = sha; // Include SHA if the file already exists
            }

            // Commit the file to GitHub
            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization: `token ${githubToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.commit) {
                    alert("Diary entry saved to GitHub successfully!");
                } else {
                    alert("Error saving to GitHub: " + JSON.stringify(data));
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
        })
        .catch(error => {
            console.log("File does not exist, creating new.");
            var payload = {
                message: `Created diary entry ${filename}`,
                content: btoa(unescape(encodeURIComponent(content))), // Convert text to Base64
                branch: branch
            };

            fetch(apiUrl, {
                method: "PUT",
                headers: {
                    Authorization: `token ${githubToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.commit) {
                    alert("Diary entry saved to GitHub successfully!");
                } else {
                    alert("Error saving to GitHub: " + JSON.stringify(data));
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
        });
    }
});
