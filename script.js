document.addEventListener("DOMContentLoaded", function () {
    fetch("entries.json") // Fetch the entries list from JSON
        .then(response => response.json())
        .then(data => {
            let entryFiles = data.entries;
            let entriesList = document.getElementById("entriesList");

            // Clear existing list (if any)
            entriesList.innerHTML = "";

            // Populate the list dynamically
            entryFiles.forEach(entry => {
                let entryDate = entry.replace("entries/", "").replace(".html", ""); // Extract date
                let formattedDate = formatEntryDate(entryDate); // Format date

                let listItem = document.createElement("li");
                let link = document.createElement("a");
                link.href = entry;
                link.textContent = formattedDate;

                listItem.appendChild(link);
                entriesList.appendChild(listItem);
            });
        })
        .catch(error => console.error("❌ Error loading entries:", error));
});

// Function to format filenames (entries/DDMMYYYY.html) into "DD Month YYYY"
function formatEntryDate(filePath) {
    // Extract only the date part (removing "entries/" and ".html")
    let dateString = filePath.replace("entries/", "").replace(".html", "");

    // Ensure it's an 8-digit date (DDMMYYYY)
    if (dateString.length !== 8) {
        console.error("Invalid date format:", dateString);
        return "Invalid Date";
    }

    let day = dateString.substring(0, 2); // First 2 characters are the day
    let month = dateString.substring(2, 4); // Next 2 characters are the month
    let year = dateString.substring(4, 8); // Last 4 characters are the year

    return `${parseInt(day, 10)} ${getMonthName(month)} ${year}`;
}

// Function to convert month number to name
function getMonthName(month) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
    return monthNames[monthIndex] || "Invalid"; // Return valid month or "Invalid"
}


