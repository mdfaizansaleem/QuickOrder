// Menu with categories and multiple order option
const menuItems = {
    "Starters": [
        { name: "Garlic Bread", price: 5 },
        { name: "Bruschetta", price: 6 },
        { name: "Spring Rolls", price: 7 },
        { name: "Nachos", price: 8 },
        { name: "Soup", price: 4 }
    ],
    "Main Course": [
        { name: "Pizza", price: 12 },
        { name: "Burger", price: 10 },
        { name: "Pasta", price: 11 },
        { name: "Steak", price: 15 },
        { name: "Chicken Wrap", price: 9 }
    ],
    "Desserts": [
        { name: "Brownie", price: 6 },
        { name: "Ice Cream", price: 5 },
        { name: "Cheesecake", price: 7 },
        { name: "Panna Cotta", price: 8 },
        { name: "Fruit Salad", price: 4 }
    ],
    "Salads": [
        { name: "Caesar Salad", price: 8 },
        { name: "Greek Salad", price: 7 },
        { name: "Cobb Salad", price: 9 },
        { name: "Caprese Salad", price: 6 },
        { name: "Quinoa Salad", price: 10 }
    ],
    "Sides": [
        { name: "Fries", price: 4 },
        { name: "Onion Rings", price: 5 },
        { name: "Coleslaw", price: 3 },
        { name: "Garlic Mushrooms", price: 6 },
        { name: "Baked Potato", price: 5 }
    ],
    "Drinks": [
        { name: "Water", price: 1 },
        { name: "Soda", price: 2 },
        { name: "Milkshake", price: 5 },
        { name: "Lemonade", price: 3 },
        { name: "Iced Tea", price: 3 }
    ]
};

// Function to display the menu with expandable categories
function displayMenu() {
    const menuDiv = document.getElementById('menuItems');

    for (const category in menuItems) {
        // Create category element
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `<h3>${category}</h3><span>+</span>`;
        menuDiv.appendChild(categoryDiv);

        // Create a hidden div for items
        const itemsDiv = document.createElement('div');
        itemsDiv.classList.add('menu-items');
        menuItems[category].forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.innerHTML = `<label for="${item.name}">${item.name} - $${item.price}</label>
                <div class="quantity-selector">
                    <button type="button" onclick="decrement('${item.name}')">-</button>
                    <input type="number" id="${item.name}" name="${item.name}" min="0" value="0" readonly>
                    <button type="button" onclick="increment('${item.name}')">+</button>
                </div>`;
            itemsDiv.appendChild(menuItemDiv);
        });
        menuDiv.appendChild(itemsDiv);

        // Toggle visibility of items on click (without closing previous catalogs)
        categoryDiv.addEventListener('click', () => {
            if (!itemsDiv.classList.contains('active')) {
                itemsDiv.classList.add('active');
                categoryDiv.querySelector('span').textContent = '-';
                // Scroll to the selected category
                itemsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                itemsDiv.classList.remove('active');
                categoryDiv.querySelector('span').textContent = '+';
            }
        });
    }
}

// Increment quantity
function increment(itemId) {
    const quantityInput = document.getElementById(itemId);
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Decrement quantity
function decrement(itemId) {
    const quantityInput = document.getElementById(itemId);
    if (quantityInput.value > 0) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Function to handle order submission
function submitOrder() {
    const customerName = document.getElementById('customerName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const selectedItems = [];

    // Validation for name, mobile number, and table number
    if (!customerName || !mobileNumber || !tableNumber || tableNumber < 1 || tableNumber > 8) {
        alert('Please fill in all details correctly.');
        return false;
    }

    // Collecting selected menu items
    let totalAmount = 0;
    for (const category in menuItems) {
        menuItems[category].forEach(item => {
            const quantity = parseInt(document.getElementById(item.name).value);
            if (quantity > 0) {
                selectedItems.push(`${item.name} x ${quantity}`);
                totalAmount += item.price * quantity;
            }
        });
    }

    if (selectedItems.length === 0) {
        alert('Please select at least one item.');
        return false;
    }

    // Displaying order confirmation
    document.getElementById('orderConfirmation').innerHTML = `
        <p>Order placed successfully!</p>
        <p>Customer Name: ${customerName}</p>
        <p>Mobile Number: ${mobileNumber}</p>
        <p>Table Number: ${tableNumber}</p>
        <p>Items Ordered: ${selectedItems.join(', ')}</p>
        <p>Total Amount: $${totalAmount}</p>
    `;

    return false; // Prevents form from refreshing the page
}

// Initialize menu display on page load
document.addEventListener('DOMContentLoaded', displayMenu);
