// Array of product objects with id, name and price
const products = [
    { id: 1, name: "Laptop", price: 3000 },
    { id: 2, name: "Mouse", price: 50 },
    { id: 3, name: "Keyboard", price: 50 }
];

// Set stores unique price values
const prices = new Set([3000, 50, 50]);

console.log("Initial Set (Duplicates removed):", prices);
prices.add(70);
console.log("Does the price 70 exist?:", prices.has(70));
prices.delete(50);

console.log("Iterating through the Set:");
for (const price of prices) {
    console.log(`- Value: ${price}`);
}

// Map categories to product names
const productMap = new Map();
productMap.set("Computers", "Laptop");
productMap.set("Accessories", "Mouse");
productMap.set("Peripherals", "Keyboard");

console.log("\n--- Listing Product Properties ---");
products.forEach(product => {
    for (let key in product) {
        console.log(`${key}: ${product[key]}`);
    }
});

productMap.forEach((productName, category) => {
    console.log(`Category: ${category} | Product: ${productName}`);
});

// Validate each product object and log results
function validateProducts(list) {
    console.log("\n--- Running Validations ---");
    list.forEach(p => {
        const isValid = 
            typeof p.id === 'number' && p.id > 0 &&
            typeof p.name === 'string' && p.name.trim() !== "" &&
            typeof p.price === 'number' && p.price >= 0;

        if (isValid) {
            console.log(` Product "${p.name}" is valid.`);
        } else {
            console.error(` Product ID ${p.id} has invalid data.`);
        }
    });
}

validateProducts(products);

console.log("\n--- Final Unique Prices (Set) ---");
console.log(prices);

console.log("\n--- Product/Category Relationship (Map) ---");
console.log(productMap);