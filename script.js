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
    let dateString = filePath.replace("entries/", "").replace(".html", "");

    if (dateString.length !== 8) {
        console.error("Invalid date format:", dateString);
        return "Invalid Date";
    }

    let day = dateString.substring(0, 2); 
    let month = dateString.substring(2, 4); 
    let year = dateString.substring(4, 8); 

    return `${parseInt(day, 10)} ${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let monthIndex = parseInt(month, 10) - 1; 
    return monthNames[monthIndex] || "Invalid"; 
}


