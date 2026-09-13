// 1. Inputs
const sentence = "   Fly me to the moon   ";

// 2. Logic
// trim() بتشيل المسافات اللي في الأطراف
// split(' ') بتكسر الجملة لمصفوفة كلمات عند كل مسافة
const words = sentence.trim().split(' ');

// بنجيب الكلمة الأخيرة من المصفوفة
const lastWord = words[words.length - 1];

// 3. Output
console.log(`Length of Last Word: ${lastWord.length}`);