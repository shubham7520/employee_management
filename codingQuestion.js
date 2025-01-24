
// Task 1:- Reverse Only Letters

function reverse(s) {

    const stack = [];
    for (const char of s) {

        const charCode = char.charCodeAt(0);

        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            stack.push(char);
        }
    }


    let result = '';
    for (const char of s) {

        const charCode = char.charCodeAt(0);

        if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
            result += stack.pop();
        } else {
            result += char;
        }
    }

    return result;
}


console.log(reverse("ab-cd"));
// Output: "dc-ba"

console.log(reverse("a-bC-dEf-ghIj"));
// Output: "j-Ih-gfE-dCba"


// Task 2: Power of Four

function isPowerOfFour(n) {

    if (n <= 0) return false;

    while (n % 4 === 0) {
        n /= 4;
    }

    return n === 1;
}

console.log(isPowerOfFour(16));
// Output: true

console.log(isPowerOfFour(5));
// Output: false

console.log(isPowerOfFour(1));
// Output: true


// Task 3: Concatenating variable number of arrays into one

function mergeArrays(arrays) {
    let mergedArray = [];

    for (let i = 0; i < arrays.length; i++) {
        mergedArray.push(...arrays[i]);
    }

    return mergedArray;
}

console.log(mergeArrays([[1, 5], [44, 67, 3], [2, 5], [7], [4], [3, 7], [6]]));
// Output: [1, 5, 44, 67, 3, 2, 5, 7, 4, 3, 7, 6]

console.log(mergeArrays([[4, 4, 4, 4, 4]]));
// Output: [4, 4, 4, 4, 4]

console.log(mergeArrays([[1], [2], [6], [9], [7]]));
// Output: [1, 2, 6, 9, 7]