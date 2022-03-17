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

function getRandomInt(n) {
  return Math.trunc(Math.random() * n) +1;
}