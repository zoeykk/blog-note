function decimalToExponent(num) {
  const sup = Number(num).toExponential().split(/[+-]/)[1];
  let isNegative = false;
  if (Number(num) < 1) {
    isNegative = true;
  }
  return {
    isNegative,
    sup,
  };
}

console.log(decimalToExponent(0.01));
