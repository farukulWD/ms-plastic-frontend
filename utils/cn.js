const clsx = require("clsx");
const { twMerge } = require("tailwind-merge");

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export default cn;
