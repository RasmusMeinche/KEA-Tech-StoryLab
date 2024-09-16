//Når hele HTML-Dokumentet er indlæst, bliver funktionen init kaldt 
window.addEventListener("DOMContentLoaded", init);


//Kode for categoriliste
const categoryList = document.querySelector("#categorylist");
const uniqueCategories = new Set(); // Opretter et tomt Set til at holde unikke kategorier

fetch("https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc&select=Taksonomi1", {
  method: "GET",
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc"
  }
})
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const categoryName = category['Taksonomi1'];
      
      // Tjek om kategorien allerede er i sættet
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.add(categoryName); // Tilføj til sættet, hvis den ikke findes
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



//Tager alle URL-parametre fra den aktuelle side (det der står efter ? i URL'en) og gør dem tilgængelige via params
const params = new URLSearchParams(document.location.search);

const category = params.get("category");
let url = undefined;

if (params.has("category")) {
  // Gør brug af 
  url = `https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc&select=*&Taksonomi_1=eq.${category}`;
} else {
  url = "https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc";
}

function init() {
  // Declare productList and productTemplate properly
  productList = document.querySelector("#productTemplate");
  console.log("productList", productList);

  productTemplate = document.querySelector("template").content;
  console.log("productTemplate", productTemplate);

  // Use the dynamically generated 'url'
  fetch(url, {
    method: "GET",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc"
    }
  })
    .then((res) => res.json())
    .then(showProducts);
}

function showProducts(json) {
  console.log("json", json);
  json.forEach(showProduct);
}

function showProduct(product) {
  const clone = productTemplate.cloneNode(true);
  clone.querySelector("h3").textContent = product.Type;
  productList.appendChild(clone);
}
