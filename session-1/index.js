// LeetCode 28: Find the Index of the First Occurrence in a String
function strStr(haystack, needle) {
    // استخدام دالة indexOf الجاهزة في JavaScript
    return haystack.indexOf(needle);
}

// التجربة
console.log(strStr("sadbutsad", "sad")); // Output: 0
console.log(strStr("leetcode", "leeto")); // Output: -1