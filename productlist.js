//Når hele HTML-Dokumentet er indlæst, bliver funktionen init kaldt 
/* window.addEventListener("DOMContentLoaded", init); */


//Kode for kategoriliste
const categoryList = document.querySelector("#categorylist");
const uniqueCategories = new Set(); // Opretter et tomt Set til at holde unikke kategorier

fetch("https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?select=Taksonomi1", {
  method: "GET",
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc"
  }
})
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const categoryName = category['Taksonomi1'];
      
      // Tjekker om kategorien allerede er i sættet
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.add(categoryName); // Tilføjes til sættet, hvis den ikke findes
        categoryList.innerHTML += `<li><a href="productlist.html?category=${categoryName}">${categoryName}</a></li>`;
      }
    });
  });

//Kategorier der mangler:
/*
Power Storage & Power Adapters
Computers & Peripheral Devices
Remote-controlled & Robot Devices
 */


// Hent kategori-parametret fra URL'en (husk at det er 'category' her, ikke 'Taksonomi1')
const params = new URLSearchParams(document.location.search);
const category = params.get("category");

console.log(category);

let url = undefined;

// Tjek om kategori-parametret er til stede i URL'en
  url = `https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?select=${category}`

function init() {
  const productList = document.querySelector("#productTemplate");
  const productTemplate = document.querySelector("template").content;

  fetch(url, {
    method: "GET",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc"
    }
  })
  .then((res) => res.json())
  .then((json) => {
    console.log("JSON response:", json);
    json.forEach(showProduct);
  });
}

function showProduct(product) {
  const clone = productTemplate.cloneNode(true);
  clone.querySelector("h3").textContent = product.Taksonomi1;
  productList.appendChild(clone);
}