// ==========================================
// TASK 1: Product Array Creation
// Each product has: id (unique), name, and price.
// ==========================================
const products = [
    { id: 1, name: "Laptop", price: 3000 },
    { id: 2, name: "Mouse", price: 50 },
    { id: 3, name: "Keyboard", price: 50 }
];

// ==========================================
// TASK 2: JavaScript Set usage
// ==========================================
// Creating a Set with duplicated values (it will automatically remove duplicates)
const prices = new Set([3000, 50, 50]);

// Print initial Set to show automatic duplicate removal
console.log("Initial Set (Duplicates removed):", prices);

// Add a new number using .add()
prices.add(70);

// Verify if a specific number exists with .has()
console.log("Does the price 70 exist?:", prices.has(70));

// Remove a number with .delete()
prices.delete(50);

// Iterate through the Set using for...of (Required for Task 4 as well)
console.log("Iterating through the Set:");
for (const price of prices) {
    console.log(`- Value: ${price}`);
}

// ==========================================
// TASK 3: Map Creation
// Mapping Categories (Key) to Product Names (Value)
// ==========================================
const productMap = new Map();
productMap.set("Computers", "Laptop");
productMap.set("Accessories", "Mouse");
productMap.set("Peripherals", "Keyboard");

// ==========================================
// TASK 4: Iteration over Data Structures
// ==========================================

// 1. Using for...in to list object properties and values
console.log("\n--- Listing Product Properties (for...in) ---");
products.forEach(product => {
    for (let key in product) {
        console.log(`${key}: ${product[key]}`);
    }
    console.log("-----------------------");
});

// 2. Using forEach() for the Map to show keys and values descriptively
productMap.forEach((productName, category) => {
    console.log(`Category: ${category} | Product: ${productName}`);
});

// ==========================================
// TASK 5: Validation and Testing
// ==========================================

// Function to validate if each product has valid id, name, and price
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