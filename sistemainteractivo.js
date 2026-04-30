let name = prompt("¿Enter your name");
let ageinput = prompt("¿Enter your age");

let age = Number(ageinput);

if (isNaN(age)) {
    console.error("Error: please enter a valid number.");
} else if (age < 18) {
    console.log(`Hi, ${name}, you're underage. Keep learning and enjoying the code!`);
} else { 
    console.log(`Hi, ${name}, You are of legal age. get ready for big opportunities in the world of programming!`);
}

