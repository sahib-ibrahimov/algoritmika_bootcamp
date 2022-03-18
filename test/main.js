const LOG = 0;
const WARN = 1;
const ERROR = 2;

function print(msg, stat=LOG) {
  switch (stat) {
    case LOG: console.log(msg);   break;
    case WARN: console.warn(msg);  break;
    default: console.error(msg);
  }
}

function printArray(arr) {
  let s = '';
  for(let i=0; i<arr.length; ++i) s+= arr[i] + ' ';
  print(s);
}

function intArray(arr){
  for(let i=0; i<arr.length; ++i)
    arr[i] = parseInt(arr[i]);
}

function getRandomInt(n) {
  return Math.trunc(Math.random() * n) +1;
}