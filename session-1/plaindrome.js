// 1. Inputs (المدخلات)
const inputWord = "racecar";

// 2. Logic (المنطق)
// بنحول الكلمة لمصفوفة حروف، بنعكس الحروف، ونرجع نجمعهم تاني في نص
const reversedWord = inputWord.split('').reverse().join('');

// 3. Output (المخرجات)
if (inputWord === reversedWord) {
    console.log("Palindrome");
} else {
    console.log("Not Palindrome");
}