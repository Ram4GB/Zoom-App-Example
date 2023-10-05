const delay = (time: number) => {
  return new Promise((resolve) => {
    let i = 0;

    const t = setInterval(() => {
      console.log(i, " s");
      i++;
    }, 1000);

    setTimeout(() => {
      clearInterval(t);
      resolve(true);
    }, time);
  });
};

export default delay;
