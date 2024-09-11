window.addEventListener("DOMContentLoaded", init);

const params = new URLSearchParams(document.location.search);
const category = params.get("category");
let url = undefined;

if (params.has("category")) {
  url = `https://wqcieablytxowrowovbq.supabase.co/rest/v1/T&S/products?category=${category}`;
} else {
  url = "https://wqcieablytxowrowovbq.supabase.co/rest/v1/T&S";
}

let productList;
let productTemplate;

function init() {
  productList = document.querySelector("#productTemplate");
  console.log("productList", productList);

  productTemplate = document.querySelector("template").content;
  console.log("productTemplate", productTemplate);

  fetch(url)
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then(showProducts);
}


function showProducts(json) {
  console.log("json", json);
  json.forEach(showProduct);
}

function showProduct(product) {
  const clone = productTemplate.cloneNode(true);
  clone.querySelector("h3").textContent = product.productdisplayname;
  clone.querySelector(".brand").textContent = product.articletype;
  clone.querySelector(".type").textContent = product.brandname;
  clone.querySelector(".price").textContent = product.price;
  clone.querySelector("img").src= `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`
  clone.querySelector("a").href = `produkt.html?id=${product.id}`;
  if(product.soldout){
    clone.querySelector(".smallProduct").classList.add("soldOut"); 
  }
  if (product.discount){
    clone.querySelector(".smallProduct").classList.add("discount");
    clone.querySelector(".discounted p span").textContent = Math.round(product.price - (product.price * product.discount) / 100);
    clone.querySelector(".discounted p+p span").textContent = product.discount;
  }
  if (product.discount === null) {
    clone.querySelector(".discounted p+p").classList.add("removeDiscount");
  }

  clone.querySelector("a").setAttribute("href", `product.html?id=${product.id}`);

  productList.appendChild(clone);


}