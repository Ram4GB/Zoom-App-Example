const waitForElement = (selector: string, timeout = 30000) => {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);

    if (document.querySelector(selector)) return resolve(el);

    const timer = setTimeout(() => {
      mutationObserver.disconnect();
      resolve(null);
    }, timeout);

    const mutationObserver = new MutationObserver(() => {
      const el = document.querySelector(selector);

      if (el) {
        clearTimeout(timer);
        mutationObserver.disconnect();
        return resolve(el);
      }
    });

    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
};

export default waitForElement;
