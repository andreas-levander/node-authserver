const parseArgNumber = (arg: string | undefined): number | undefined => {
  if (!arg) return undefined;
  const number = Number(arg);
  if (isNaN(number))
    throw new Error(`Environment variable ${arg} is not a number`);

  return number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// const parseString = (str: unknown, parameter: string): string => {
//   if (!str || !isString(str)) {
//     throw new Error(`Incorrect or missing ${parameter}: ` + str);
//   }
//   return str;
// };

const parseURIString = (arg: string | undefined, variable: string): string => {
  if (!arg) throw new Error(`Missing environment variable ${variable}`);
  if (!isString(arg)) {
    throw new Error(`Environment variable ${arg} is not a string`);
  }
  return arg;
};

const parseArray = (arr: unknown, name: string): any[] => {
  if (!Array.isArray(arr)) {
    throw new Error(`${name} is not an array`);
  }

  return arr;
};

export { parseArgNumber, parseURIString, parseArray };
