// ask the user to enter your name and age 
let name = prompt("¿Enter your name");
let ageinput = prompt("¿Enter your age");

// turning age out into a number 
let age = Number(ageinput);

// validating if the user is underage or if user is of legal age
if (isNaN(age)) {
    console.error("Error: please enter a valid number.");
} else if (age < 18) {
    console.log(`Hi, ${name}, you're underage. Keep learning and enjoying the code!`);
} else { 
    console.log(`Hi, ${name}, You are of legal age. get ready for big opportunities in the world of programming!`);
}



