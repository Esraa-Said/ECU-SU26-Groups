// LeetCode 20: Valid Parentheses
function isValid(s) {
    const stack = [];
    const bracketsMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char); // إضافة القوس الفاتح للمصفوفة
        } else {
            // فحص هل القوس المقفول يطابق آخر قوس مفتوح
            if (stack.pop() !== bracketsMap[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// التجربة
console.log(isValid("()[]{}")); // Output: true
console.log(isValid("(]"));     // Output: false