
// Load from Google Sheets
const sheetURL = "https://docs.google.com/spreadsheets/d/1hyXiieWqIXYEQyGZT0qHA4mStQakHx5YPD9mgHZzeBE/export?format=csv&gid=0";

// []- take content from sheet to new sheet (same as TSB table)
// []- make release for steps, e.g. before adding pictures and stuff
// Alternative for later: use JSON and Google Sheets API

// Function to get an emoji based on the recipe title
function getEmoji(title) {
    if (!title) return false;

    // FIX THIS; EITHER NO CONTAINS OR TAKE CARE OF EMPTY TEXT
    title = title.toLowerCase();

    if (title.includes("pfanne")) return "🍳";
    if (title.includes("salat")) return "🥗";
    if (title.includes("sandwich")) return "🥪";
    if (title.includes("soup")) return "🍲";
    if (title.includes("burger")) return "🍔";
    if (title.includes("pizza")) return "🍕";
    
    if (containsAny(title, ["pasta", "nudel", "lasagne", "gnocchi"])) {
        return "🍝";
    }
    
    if (title.includes("taco") || title.includes("wrap")) return "🌮";
    if (title.includes("sushi")) return "🍣";
    if (title.includes("brot")) return "🍞";
    if (title.includes("fisch")) return "🐟";
    if (title.includes("huhn")) return "🍗";
    if (title.includes(" ei")) return "🥚";
    if (title.includes("kartoffel")) return "🥔";
    
    if (containsAny(title, ["reis", "risotto"])) {
        return "🍚";
    }

    if (containsAny(title, ["apfel", "obst"])) {
        return "🍎";
    }
    
    if (containsAny(title, ["gemüse", "karotte"])) {
        return "🥕";
    }
    if (title.includes("paprika")) return "🫑";
    if (title.includes("melone")) return "🍉";

    return "🍽️"; // default
}

fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n")
        const headers = rows[0].split(","); // Get header row
        const recipeRows = rows.slice(1); // Skip header row
        const recipeContainer = document.getElementById("recipe-container");
        
        const titleIndex = headers.indexOf("Name");
        const descriptionIndex = headers.indexOf("Rezept");
        const linkIndex = headers.indexOf("Link");
        const alternativeIndex = headers.indexOf("Markenprodukt_link");
        // const imageURL = headers.indexOf("Link");
        // const recipeBasis = headers.indexOf("Markenprodukt");

        recipeRows.forEach(row => {
            const columns = row.split(",");

            const title = columns[titleIndex];
            const description = columns[descriptionIndex];
            const link = columns[linkIndex];
            const alternative = columns[alternativeIndex];
            //const image = columns[imageIndex];
        
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";
            
            const clickableLink = link || alternative; // Use link if available, otherwise use alternative
            
            if (clickableLink) { 
                recipeCard.classList.add("clickable");

                recipeCard.addEventListener("click", () => {
                    window.open(clickableLink, "_blank");
                });
            }

            // Emoji
            const emoji = getEmoji(title);

            const recipeEmoji = document.createElement('div');
            recipeEmoji.className = 'recipe-image';
            recipeEmoji.textContent = emoji;

            // Text content
            const contentBox = document.createElement('div');
            contentBox.className = 'recipe-content';

            const recipeTitle = document.createElement('h2');
            recipeTitle.className = 'recipe-title';
            recipeTitle.textContent = title || 'Unbenanntes Rezept';
            
            const recipeDescription = document.createElement('p');
            recipeDescription.className = 'recipe-description';
            recipeDescription.textContent = description || 'Keine Beschreibung vorhanden.';

            contentBox.appendChild(recipeTitle);
            contentBox.appendChild(recipeDescription);

            recipeCard.appendChild(recipeEmoji);
            recipeCard.appendChild(contentBox);

            recipeContainer.appendChild(recipeCard);
        });
});

/* // Alternative using async/await
async function loadData() {
  const response = await fetch(url);
  const data = await response.text();
}
*/

