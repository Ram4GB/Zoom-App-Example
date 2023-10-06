const waitForElement = (selector: string, timeout = 30000) => {
  return new Promise((resolve) => {
    const mutationObserver = new MutationObserver(() => {
      const el = document.querySelector(selector);

      if (el) {
        return resolve(el);
      }
    });

    const el = document.querySelector(selector);

    if (document.querySelector(selector)) return resolve(el);

    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      mutationObserver.disconnect();
      resolve(null);
    }, timeout);
  });
};

export default waitForElement;
