function numberToWords(number) {
  const units = [
    "",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
  ];

  const tens = [
    "",
    "Tenth",
    "Twentieth",
    "Thirtieth",
    "Fortieth",
    "Fiftieth",
    "Sixtieth",
    "Seventieth",
    "Eightieth",
    "Ninetieth",
  ];

  const specialCases = {
    11: "Eleventh",
    12: "Twelfth",
    13: "Thirteenth",
    14: "Fourteenth",
    15: "Fifteenth",
    16: "Sixteenth",
    17: "Seventeenth",
    18: "Eighteenth",
    19: "Nineteenth",
  };

  if (number in specialCases) {
    return specialCases[number];
  }

  const digitArr = String(number).split("").map(Number);
  const length = digitArr.length;

  if (length === 1) {
    return units[number];
  }

  if (length === 2 && number % 10 === 0) {
    return tens[digitArr[0]];
  }

  return tens[digitArr[0]].replace("ieth", "y") + "-" + units[digitArr[1]];
}

export const getOption = (index) => {
  return `${numberToWords(index)} Option`;
};
