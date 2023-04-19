// // Answers for first 5 question with detailed explanations 


// // 1)   find duplicate and same values in two array 
// // var fullWordList = ['1','2','3','4','5'];
// //  var wordsToRemove = ['1','2','3'];


// // Solutions-
//  // duplicate values
//  var fullWordList = ['1','2','3','4','5'];
//  var wordsToRemove = ['1','2','3'];
//  var duplicates = fullWordList.filter(number => wordsToRemove.includes(number));
// console.log('Duplicate values:', duplicates); // Output: ['1', '2', '3']
 
// // same values
// var sameValues = fullWordList.filter(number => !wordsToRemove.includes(number));
// console.log('Same values:', sameValues); // Output: ['4', '5']

// // 2)longest-chain-of-letters-in-word-javascript
// //  const word = '00000111110101001111100001001'

// // Solutions-
//  const wordd = '00000111110101001111100001001';
// let currentLetter = '';
// let currentChainLength = 0;
// let maxChainLength = 0;

// for (let i = 0; i < wordd.length; i++) {
//   const letter = wordd[i];
//   if (letter === currentLetter) {
//     currentChainLength++;
//   } else {
//     currentLetter = letter;
//     currentChainLength = 1;
//   }
//   if (currentChainLength > maxChainLength) {
//     maxChainLength = currentChainLength;
//   }
// }

// console.log('The longest chain of letters is:', maxChainLength); // The longest chain of letters is: 5

// // 3) let obj1 = { "greeting": "hello" };
// // let obj2 = obj1;
// // obj1["greeting"] = "Bye";
// // console.log(obj1);
// // console.log(obj2);


// //Solution;

// { greeting: 'Bye' }
// { greeting: 'Bye' }

// // "We create an object obj1 with a greeting property set to "hello", create obj2 as a reference to obj1, update the value of greeting in obj1 to "Bye", and log both obj1 and obj2 to the console in a single statement."

// // 4) console.log("7" > 7)
// // console.log("2">"21")
// // console.log("KL">"S")

// // Solutions 
// console.log("7" > 7); // Output: false
// console.log("2" > "21"); // Output: false
// console.log("KL" > "S"); // Output: false



// // 5) function average(a, b) {
// //     return a + b / 2;
// //     }
// //     console.log(average(2, 1));


// // Solution 

// function average(a, b) {
//     return (a + b) / 2;
//   }
//   console.log(average(2, 1)); // Output: 1.5

//   // The average function calculates the arithmetic mean of two numbers and logs it to the console.
  





