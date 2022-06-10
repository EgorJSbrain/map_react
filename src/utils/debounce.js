export const debounce = (fn, ms) => {
  let timeout;
  return function (value) {
    const fnCall = () => fn.apply(this, [value, arguments]);
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  }
};
