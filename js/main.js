import { object } from "./project.js";
const cardList = document.getElementById('card_list')
let api = object;

const productName = document.getElementById('productName');
const price = document.getElementById('productPrice');
const box = document.querySelector('.box');
const btn = document.getElementById('submit');

let img = 'https://picsum.photos/id/1/300/160';


window.addEventListener('DOMContentLoaded', () => {
    let render = api.map((item) => {
        return `
        <div class="card" data-id="${item.id}">
            <img src="${item.img}" alt="img" />
            <div class="scene">
            <p>${item.pirce}</p>
            </div>
            <h3>${item.decription}</h3>
            <button class="korzina">Savatga</button>
        </div>
        `
    })
    render = render.join(' ');
    cardList.innerHTML = render;
})



// Initialize products and basket as empty arrays
let products = [];
let basket = [];

function getLocalStorage() {
    let data = localStorage.getItem("list");
    if (data) {
        return JSON.parse(localStorage.getItem("list"));
    } else {
        return [];
    }
}

function addToLocalStorage(img, name, price) {
    let id = new Date().getTime().toString().slice(-5, -1);
    let product = { id, img, name, price };
    products.push(product); // Push the product to the 'products' array
    localStorage.setItem("list", JSON.stringify(products));
}

btn.addEventListener('click', () => {
    if (productName.value.trim() !== '' && price.value.trim() !== '') {
        addToLocalStorage(img, productName.value, price.value);
        location.reload(); // Reload the page to display the updated products
    } else {
        alert('Iltimos malumotlarni toliq kiritganingizga ishonch hosil qiling');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    let time = new Date();
    let display = products.map((item) => {
        return `
        <div class="new_card" id="el" data-id="${item.id}">
            <img src="${item.img}" alt="">
            <h2>${item.name}</h2>
            <h2>${item.price}</h2>
            <p>${time} shu vaqtda qoshildi</p>
            <button class="add" data-id="${item.id}">Savatga</button>
        </div>
        `;
    });
    box.innerHTML = display.join('');
    
    const addButtons = document.querySelectorAll('.add');
    
    addButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            let uid = e.target.getAttribute('data-id');
            
            products.forEach((item) => {
                if (item.id === uid) {
                    basket.push(item);
                    // You can optionally remove the item from 'products' here if you want
                }
            });
            
            // Update the 'basket' content or perform any desired actions
           localStorage.setItem('product',JSON.stringify(basket));
        });
    });
});

// Fetch the existing products from localStorage on page load
products = getLocalStorage();