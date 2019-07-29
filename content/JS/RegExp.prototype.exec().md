The **exec()** method executes a search for a match in a specified string. Returns a result array, or [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

JavaScript [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) objects are **stateful** when they have the [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) or [`sticky`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) flags set (e.g. `/foo/g` or `/foo/y`). They store a [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) from the previous match. Using this internally, `exec()` can be used to iterate over multiple matches in a string of text (with capture groups), as opposed to getting just the matching strings with [`String.prototype.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match).

A newer function has been proposed to simplify matching multiple parts of a string (with capture groups): [`String.prototype.matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll).

If you are executing a match simply to find true or false, use the [`RegExp.prototype.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) method or the [`String.prototype.search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search) method.

<iframe class="interactive interactive-js" frameborder="0" height="250" src="https://interactive-examples.mdn.mozilla.net/pages/js/regexp-prototype-exec.html" width="100%" style="margin: 0px; padding: 10px; border: 1px solid rgb(234, 242, 244); max-width: 100%; box-sizing: border-box; background-color: rgb(245, 249, 250); color: rgb(51, 51, 51); height: 490px; width: 1038.75px;"></iframe>

## Syntax[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Syntax)

```
regexObj.exec(str)
```

### Parameters[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Parameters)

- `str`

  The string against which to match the regular expression.

### Return value[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Return_value)

If the match succeeds, the `exec()` method returns an array and updates the [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)property of the regular expression object. The returned array has the matched text as the first item, and then one item for each capturing parenthetical that matched containing the text that was captured.

If the match fails, the `exec()` method returns [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), and sets [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) to 0.

## Description[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Description)

Consider the following example:

```js
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

The following table shows the results for this script:

| Object          | Property/Index                                               | Description                                                  | Example                   |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- |
| `result`        | `[0]`                                                        | The full string of characters matched                        | `"Quick Brown Fox Jumps"` |
| `[1], ...[*n*]` | The parenthesized substring matches, if any. The number of possible parenthesized substrings is unlimited. | `result[1] === "Brown"result[2] === "Jumps"`                 |                           |
| `index`         | The 0-based index of the match in the string.                | `4`                                                          |                           |
| `input`         | The original string that was matched against.                | `"The Quick Brown Fox Jumps Over The Lazy Dog"`              |                           |
| `re`            | `lastIndex`                                                  | The index at which to start the next match. If `g` is absent, this will always be `0`. | `25`                      |
| `ignoreCase`    | Indicates if the `i` flag was used to ignore case.           | `true`                                                       |                           |
| `global`        | Indicates if the `g` flag was used for a global match.       | `true`                                                       |                           |
| `multiline`     | Indicates if the `m` flag was used to search across multiple lines. | `false`                                                      |                           |
| `source`        | The text of the pattern.                                     | `"quick\s(brown).+?(jumps)"`                                 |                           |

## Examples[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Examples)

### Finding successive matches[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches)

If your regular expression uses the "`g`" flag, you can use the `exec()` method multiple times to find successive matches in the same string. When you do so, the search starts at the substring of `str` specified by the regular expression's [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property ([`test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) will also advance the [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property).  Note that the [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property will not be reset when searching a different string, it will start its search at its existing [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) .

For example, assume you have this script:

```js
var myRe = /ab*/g;
var str = 'abbcdefabh';
var myArray;
while ((myArray = myRe.exec(str)) !== null) {
  var msg = 'Found ' + myArray[0] + '. ';
  msg += 'Next match starts at ' + myRe.lastIndex;
  console.log(msg);
}
```

This script displays the following text:

```html
Found abb. Next match starts at 3
Found ab. Next match starts at 9
```

Note: Do not place the regular expression literal (or [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor) within the `while` condition or it will create an infinite loop if there is a match due to the [`lastIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)property being reset upon each iteration. Also be sure that the global flag ("`g`") is set or an infinite loop will occur here also.

### Using `exec()` with `RegExp` literals[Section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Using_exec()_with_RegExp_literals)

You can also use `exec()` without creating a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object explicitly:

```js
var matches = /(hello \S+)/.exec('This is a hello world!');
console.log(matches[1]);
```

This will log a message containing 'hello world!'.