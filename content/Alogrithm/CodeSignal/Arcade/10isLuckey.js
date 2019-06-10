function isLucky(n) {
   return String(n).slice(String(n).length/2).split("").reduce((prev, curr) => prev+ Number(curr), 0) +
    String(n).slice(0,String(n).length/2).split("").reduce((prev, curr) => prev+ Number(curr), 0)
}
