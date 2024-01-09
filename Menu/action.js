var cartItems = [];
var total = 0;

function addToCart() {
    var item = {
        name: "Butter Chicken",
        price: $200,
        quantity: 1
    };

    // Check if the item is already in the cart
    var existingItem = cartItems.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push(item);
    }

    updateCart();
}

function updateCart() {
    var sidebar = document.getElementById("sidebar");
    var cartList = document.getElementById("cartItems");
    var totalPriceElement = document.getElementById("totalPrice");

    // Clear existing items in the cart
    cartList.innerHTML = "";

    // Update and display each item in the cart
    cartItems.forEach(function (item, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${item.name}</span>
            <input class="quantity-input" type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <span class="remove" onclick="removeItem(${index})">Remove</span>
        `;
        cartList.appendChild(listItem);

        total += item.price * item.quantity;
    });

    // Display the total price
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

    // Show the sidebar
    sidebar.style.display = "block";
}

function updateQuantity(index, newQuantity) {
    cartItems[index].quantity = parseInt(newQuantity, 10) || 1;
    total = 0;
    updateCart();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    total = 0;
    updateCart();
}
