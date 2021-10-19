"use strict";

//ta emot API
const productAPIURL =
  "https://mock-data-api.firebaseio.com/webb21/products.json";
//keep track of filter input
let filterRating = 0;
//array for cart
const cartItems = [];
//Get html elements
const ratingSelector = document.getElementById("rating");
const productsContainer = document.getElementById("products");
const totalAmountContainer = document.getElementById("totalAmount");
totalAmountContainer.innerText = `Total Amount: ${getTotalAmount()} sek`;

function handleOnSubmit() {
  event.preventDefault();
  filterRating = ratingSelector.value;

  getProductData();
}

//get API
function getProductData() {
  productsContainer.innerHTML = "";
  fetch(productAPIURL)
    .then((res) => res.json())
    .then((data) => {
      renderProductList(data);
    });
}

//filters the data
function filterData(filter) {
  return function (data) {
    return data.rating >= filter;
  };
}
//render the list of product data
function renderProductList(data) {
  if (filterRating != 0) {
    data = data.filter(filterData(filterRating));
  }

  data.forEach((productItem) => {
    renderProductItem(productItem);
  });
}

function renderProductItem(productItem) {
  const wrapper = document.createElement("div");

  wrapper.appendChild(createProductName(productItem));
  // wrapper.appendChild(createProductImage(productItem));
  wrapper.appendChild(createProductImageClickable(productItem));
  wrapper.appendChild(createProductDescription(productItem));
  //   wrapper.appendChild(createProductID(productItem));
  wrapper.appendChild(createProductPrice(productItem));
  wrapper.appendChild(createProductRating(productItem));
  wrapper.appendChild(createProductStock(productItem));
  wrapper.appendChild(createProductItemButton(productItem));

  productsContainer.appendChild(wrapper);
}
//Description
function createProductDescription(productItem) {
  const description = document.createElement("p");
  description.innerText = productItem.description;

  return description;
}
//ID
function createProductID(productItem) {
  const id = document.createElement("p");
  id.innerText = productItem.id;
  return id;
}
//Ordinary Image
function createProductImage(productItem) {
  const image = document.createElement("img");
  image.src = productItem.images[0].src.small;
  image.alt = productItem.images[0].alt;
  image.style.width = "50%";

  return image;
}
//Name
function createProductName(productItem) {
  const name = document.createElement("h2");
  name.innerText = productItem.name;
  return name;
}
//Price
function createProductPrice(productItem) {
  const price = document.createElement("p");
  price.innerText = `Price: ${productItem.price} sek`;
  return price;
}
//Stock
function createProductStock(productItem) {
  const stock = document.createElement("p");
  stock.innerText = `Stock:  ${productItem.stock}`;
  return stock;
}
//Rating
function createProductRating(productItem) {
  const rating = document.createElement("p");
  rating.innerText = `Rating: ${productItem.rating}`;
  return rating;
}
//Clickable Image for buying stuff
function createProductImageClickable(productItem) {
  const imageWrapper = document.createElement("div");
  const image = createProductImage(productItem);

  image.addEventListener("click", function () {
    addToCart(productItem.name, productItem.price);
    renderTotalAmount();
    renderCart();
  });

  imageWrapper.appendChild(image);
  return imageWrapper;
}
//Button for buying stuff
function createProductItemButton(productItem) {
  const button = document.createElement("button");
  button.innerText = "Buy";
  button.onclick = function () {
    addToCart(productItem.name, productItem.price);
    renderTotalAmount();
    renderCart();
  };

  return button;
}

//render amount and cart
function getTotalAmount() {
  let totalAmount = 0;

  cartItems.forEach((productItem) => {
    totalAmount += productItem.price;
  });

  return totalAmount;
}
function renderTotalAmount() {
  const totalAmount = getTotalAmount();
  totalAmountContainer.innerText = `Total Amount: ${totalAmount} sek`;
}
function addToCart(name, price) {
  cartItems.push({ name, price });
}

function renderCart() {
  const cartContainer = document.getElementById("cart");
  const cart = document.createElement("p");

  cartItems.forEach((item) => {
    cart.innerText = `${item.name} - ${item.price} sek\n`;
    cartContainer.appendChild(cart);
  });
}

getProductData();
