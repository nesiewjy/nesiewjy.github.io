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

//navigation buttons for entires page
document.addEventListener("DOMContentLoaded", function () {

    fetch("/entries.json")
        .then(response => response.json())
        .then(data => {

            const currentPath = window.location.pathname
                .replace(/^\/+/, '')
                .replace(/\/+$/, '');

            let currentSeries = null;
            let currentIndex = -1;

            // Find which series the current page belongs to
            for (const [seriesName, entries] of Object.entries(data)) {
                const index = entries.indexOf(currentPath);

                if (index !== -1) {
                    currentSeries = entries;
                    currentIndex = index;
                    break;
                }
            }

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// Back always works
if (backBtn) {
    backBtn.onclick = () => {
        window.location.href = "/";
    };
}

if (!currentSeries) {
    console.warn("Current page not found in entries.json");

    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";

    return;
}

            // Previous
            if (currentIndex > 0) {
                prevBtn.onclick = () => {
                    window.location.href = "/" + currentSeries[currentIndex - 1];
                };
            } else {
                prevBtn.disabled = true;
            }

            // Next
            if (currentIndex < currentSeries.length - 1) {
                nextBtn.onclick = () => {
                    window.location.href = "/" + currentSeries[currentIndex + 1];
                };
            } else {
                nextBtn.disabled = true;
            }

        })
        .catch(error => console.error("Error loading entries:", error));

});


//drop down button front page
const btn = document.querySelector('.bio-toggle');
const bio = document.querySelector('.bio-text');
const words = document.querySelector('.borrowed-words');

if (btn && bio && words) {
    btn.addEventListener('click', () => {
        const open = !bio.hidden;

        bio.hidden = open;
        words.hidden = !open;

        btn.textContent = open ? '▾' : '▴';
        btn.setAttribute('aria-expanded', !open);
    });
}

document.querySelectorAll('.article-trigger').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    document.body.classList.remove('locked');

    document.querySelectorAll('.article-list').forEach(list => {
      list.hidden = true;
    });

    const target = document.getElementById(link.dataset.target);

    target.hidden = false;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});