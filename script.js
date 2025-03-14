document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script loaded!");

    fetch("/entries.json") // Ensure this is accessible at the root
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Entries loaded:", data.entries);

            let entryFiles = data.entries;
            let currentPage = window.location.pathname.split("/").pop();
            let currentEntry = "entries/" + currentPage;
            let currentIndex = entryFiles.indexOf(currentEntry);

            let prevBtn = document.getElementById("prevBtn");
            let nextBtn = document.getElementById("nextBtn");

            if (currentIndex !== -1) {
                if (currentIndex > 0) {
                    prevBtn.onclick = () => {
                        console.log("⬅ Navigating to:", entryFiles[currentIndex - 1]);
                        window.location.href = "/" + entryFiles[currentIndex - 1];
                    };
                } else {
                    prevBtn.disabled = true;
                }

                if (currentIndex < entryFiles.length - 1) {
                    nextBtn.onclick = () => {
                        console.log("➡ Navigating to:", entryFiles[currentIndex + 1]);
                        window.location.href = "/" + entryFiles[currentIndex + 1];
                    };
                } else {
                    nextBtn.disabled = true;
                }
            } else {
                console.warn("⚠ Current entry not found in list!");
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        })
        .catch(error => console.error("❌ Error fetching entries:", error));
});
