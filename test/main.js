const F_LOG = 0;
const F_WARN = 1;
const F_ERROR = 2;

function print(msg, stat=F_LOG) {
  switch (stat) {
    case F_LOG: console.log(msg);   break;
    case F_WARN: console.warn(msg);  break;
    default: console.error(msg);
  }
}
