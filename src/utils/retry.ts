type FC = (...args: unknown[]) => unknown | Promise<unknown>;

const retry = <T extends FC>(cb: T, retryTime = 3, retryDelay = 500, time = 1) => {
  return async (...args: Parameters<typeof cb>) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await cb.call(null, ...args);
            resolve(0);
          } catch (error) {
            reject(error);
          }
        }, retryDelay);
      });
    } catch (error) {
      if (time === retryTime) return false;
      return retry(cb, retryTime, retryDelay, time + 1);
    }
  };
};

export default retry;
