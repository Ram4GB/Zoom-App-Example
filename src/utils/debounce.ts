const debounce = (cb: unknown, timeout: number = 200) => {
  let t: number;

  return (...args: unknown[]) => {
    if (t) clearTimeout(t);

    t = setTimeout(() => {
      if (typeof cb === "function") cb.apply(this, args);
    }, timeout);
  };
};

export default debounce;
