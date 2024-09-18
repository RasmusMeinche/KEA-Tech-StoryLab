//Kopi fra produktliste efter besked fra Rasmus
//const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc`;
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc`;

//Kode for kategoriliste
//const categoryList = document.querySelector("#categorylist");
const categoryList = document.querySelector(".brandList");
const uniqueCategories = new Set(); // Opretter et tomt Set til at holde unikke kategorier

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
  .then((categories) => {
    categories.forEach((category) => {
      const categoryName = category["Taksonomi1"];

      // Tjekker om kategorien allerede er i sættet
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.add(categoryName); // Tilføjes til sættet, hvis den ikke findes
        categoryList.innerHTML += `<li><a href="productlist.html?category=${categoryName}">${categoryName}</a></li>`;
      }
    });
  });
