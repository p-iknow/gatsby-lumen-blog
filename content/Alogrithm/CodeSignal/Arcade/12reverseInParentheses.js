const testcase = "foo(bar)baz(blim)"

function reverseInParentheses(string) {
    if(string.indexOf(")") < 0) return string;
    let reversedString, indexOfOpenParenth, indexOfCloseParenth, beforeParenth, afterParenth, parsedString;
    indexOfOpenParenth = string.lastIndexOf("(");
    indexOfCloseParenth = string.indexOf(")", string.lastIndexOf("("));
    beforeParenth = string.substring(0, indexOfOpenParenth);
    afterParenth = string.substring(indexOfCloseParenth +1);
    parsedString = string.substring(indexOfOpenParenth + 1, indexOfCloseParenth).split("").reverse().join("");

    return  reverseInParentheses(beforeParenth + parsedString + afterParenth)
}
reverseInParentheses(testcase);