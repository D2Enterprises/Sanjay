// Initialize cart from localStorage
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);
}

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    if (!cartItemsContainer || !totalSpan) {
        console.error('Cart items container or total span not found.');
        return;
    }

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>`;

        cartItemsContainer.appendChild(itemDiv);
    });

    totalSpan.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);

    // Show Dynamic Island with removal effect
    showDynamicIsland('Product removed from cart!', true);
}

function showDynamicIsland(message, isRemoval) {
    const dynamicIsland = document.querySelector('.dynamic-island');

    if (!dynamicIsland) {
        console.error('Dynamic Island element not found');
        return;
    }

    // Set the message content
    const messageElement = dynamicIsland.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = message;
    } else {
        console.error('Message element not found inside Dynamic Island');
    }

    // Add show class and handle specific effects based on isRemoval
    dynamicIsland.classList.add('show');

    if (isRemoval) {
        dynamicIsland.classList.add('remove-item');
        dynamicIsland.classList.remove('add-item');
    } else {
        dynamicIsland.classList.add('add-item');
        dynamicIsland.classList.remove('remove-item');
    }

    // Hide the dynamic island after a timeout
    setTimeout(() => {
        dynamicIsland.classList.remove('show');
        dynamicIsland.classList.remove('add-item');
        dynamicIsland.classList.remove('remove-item');
    }, 2000); // 2 seconds
}

function navigateTo(url) {
    window.location.href = url;
}

// Event listeners for adding to cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image'); // Added image data attribute
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item is already in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Show Dynamic Island with add effect
        showDynamicIsland('Product added to cart!', false);
    });
});

window.onload = initializeCart;

const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');

function store(value) {
    localStorage.setItem('darkmode', value);
}

function load() {
    const darkmode = localStorage.getItem('darkmode');

    if (darkmode === null) {
        store('false');
        icon.classList.add('fa-sun');
    } else if (darkmode === 'true') {
        body.classList.add('darkmode');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.add('fa-sun');
    }
}

load();

btn.addEventListener('click', () => {
    body.classList.toggle('darkmode');
    icon.classList.add('animated');

    const isDarkMode = body.classList.contains('darkmode');
    store(isDarkMode ? 'true' : 'false');

    if (isDarkMode) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    setTimeout(() => {
        icon.classList.remove('animated');
    }, 500); // Animation duration
});

// Initialize the search Dynamic Island
function showSearchIsland() {
    const searchIsland = document.querySelector('.dynamic-island.search-island');

    if (!searchIsland) {
        console.error('Search Dynamic Island element not found');
        return;
    }

    // Set the message content for search Dynamic Island
    searchIsland.classList.add('show');
    searchIsland.classList.remove('remove-item'); // Ensure it's not using removal style

    // Hide the search island after a timeout
    setTimeout(() => {
        searchIsland.classList.remove('show');
    }, 2000); // 2 seconds
}

// Event to trigger search Dynamic Island
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-bar').value;
    if (searchInput.trim()) {
        showSearchIsland();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    const productsContainer = document.getElementById('products-container');

    if (!productsContainer) {
        console.error('Products container not found.');
        return;
    }

    // Example product data (replace with actual data fetching logic)
    const products = [
        {
            "name": "Product 1",
            "price": "99.99",
            "image": "images/product1.png"
        },
        {
            "name": "Product 2",
            "price": "89.99",
            "image": "images/product2.png"
        },
        {
            "name": "Product 3",
            "price": "79.99",
            "image": "images/product3.png"
        }
    ];

    productsContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });

    // Attach event listeners for add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            addToCart(name, price, image);
        });
    });
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showDynamicIsland('Product added to cart!', false);
}
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);
}

function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    if (!cartItemsContainer || !totalSpan) {
        console.error('Cart items container or total span not found.');
        return;
    }

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>`;

        cartItemsContainer.appendChild(itemDiv);
    });

    totalSpan.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(cart);
    showDynamicIsland('Product removed from cart!', true);
}

function showDynamicIsland(message, isRemoval) {
    const dynamicIsland = document.querySelector('.dynamic-island');

    if (!dynamicIsland) {
        console.error('Dynamic Island element not found');
        return;
    }

    const messageElement = dynamicIsland.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = message;
    } else {
        console.error('Message element not found inside Dynamic Island');
    }

    dynamicIsland.classList.add('show');
    if (isRemoval) {
        dynamicIsland.classList.add('remove-item');
        dynamicIsland.classList.remove('add-item');
    } else {
        dynamicIsland.classList.add('add-item');
        dynamicIsland.classList.remove('remove-item');
    }

    setTimeout(() => {
        dynamicIsland.classList.remove('show');
        dynamicIsland.classList.remove('add-item');
        dynamicIsland.classList.remove('remove-item');
    }, 2000); // 2 seconds
}

window.onload = initializeCart;
