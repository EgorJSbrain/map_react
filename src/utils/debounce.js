export const debounce = (fn, ms) => {
  let timeout;
  return function (e) {
    const fnCall = () => fn.apply(this, [e, arguments]);
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  }
};
