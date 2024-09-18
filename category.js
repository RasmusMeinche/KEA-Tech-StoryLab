const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc`;
const categoryList = document.querySelector("#categoryList");
const uniqueCategories = new Set(); // Opretter et tomt Set til unikke kategorier

// Mapping af kategorier til deres respektive SVG-ikoner
const categoryIcons = {
  "Studios - Podcast / Foto & Video": "img/clarity_camera-line.svg",
  "Foto & Video": "img/clarity_camera-line.svg",
  Lyd: "img/microphone.svg",
  "Kabler & Adaptere": "img/cable.svg",
  Strømforsyning: "img/electricity.svg",
  Lagring: "img/sdcard.svg",
};

fetch(
  "https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?select=Taksonomi1",
  {
    method: "GET",
    headers: {
      apikey: key,
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log response data to inspect its structure

    // Tjek om 'data' er et array, før vi bruger forEach
    if (Array.isArray(data)) {
      data.forEach((category) => {
        const categoryName = category["Taksonomi1"];

        // Tjekker om kategorien allerede er i sættet
        if (!uniqueCategories.has(categoryName)) {
          uniqueCategories.add(categoryName); // Tilføjes til sættet, hvis den ikke findes

          // Tildeler det rigtige SVG-ikon baseret på kategorinavnet
          const icon = categoryIcons[categoryName] || "img/default-icon.svg"; // fallback-ikon

          // Opretter HTML-struktur for hver kategori
          const categoryCard = `
            <article class="category_card">
              <img src="${categoryIcons}" alt="${categoryIcons}" />
              <a href="productlist.html?category=${categoryName}">
                ${categoryName}
              </a>
            </article>
          `;

          categoryList.innerHTML += categoryCard;
        }
      });
    } else {
      console.error("API'et returnerede ikke et array som forventet.");
    }
  })
  .catch((error) => console.error("Fejl ved hentning af kategorier:", error));
