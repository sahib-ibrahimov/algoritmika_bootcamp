const [LOG, WARN, ERROR] = [0, 1, 2];

function print(obj, stat=LOG) {
  switch (stat) {
    case LOG:
      (Array.isArray(obj))
      ? console.log(obj.toString())
      : console.log(obj);
      break;
    case WARN:
      (Array.isArray(obj))
      ? console.warn(obj.toString())
      : console.warn(obj);
      break;
    default:
      (Array.isArray(obj))
      ? console.error(obj.toString())
      : console.error(obj);
  }
}

function debug(obj) { console.warn(obj); }

function printMatris(arr, stat=LOG) {
  let s = [];
  arr.forEach((item) => {
    s.push(item.toString());
  });
  print(s.join('\n'), stat);
}

function intArray(arr){
  arr.forEach((_,i) => {arr[i] = parseInt(arr[i]);});
}

function getRandomInt(n=100) {
  return Math.trunc(Math.random() * n) +1;
}

function shuffle(arr) {
  for(let i=0; i<arr.length; ++i) {
    let x = getRandomInt(arr.length)-1;
    let temp = arr[i];
    arr[i] = arr[x];
    arr[x] = temp;
  }
  return arr;
}

function isDigit(c) {
  switch(c) {
    case '0': case '1': case '2':
    case '3': case '4': case '5':
    case '6': case '7': case '8':
    case '9': return true;
    default: return false;
  }
}

function isFloat(n){ 
  return Number(n) == n && Number(n) % 1 !== 0; 
}

function isNumber(str) {
  let p = 0;
  for(let i=0; i<str.length; ++i) {
    if (str[i] == '.') ++p;
    else if (! isDigit(str[i]) ) return false;
    if (p > 1) return false;
  }
  return Boolean(str.length);
}
