exports.maskTel = (str) => {
  if (str.length === 10) {
    return `(${str.substring(0, 2)}) ${str.substring(2, 6)}-${str.substring(
      6,
    )}`;
  } else if (str.length === 11) {
    return `(${str.substring(0, 2)}) ${str.substring(2, 3)} ${str.substring(
      3,
      7,
    )}-${str.substring(7)}`;
  } else {
    return str;
  }
};

exports.maskCpf = (str) => {
  return `${str.substring(0, 3)}.${str.substring(3, 6)}.${str.substring(
    6,
    9,
  )}-${str.substring(9, 11)}`;
};

exports.maskPrice = (str) => {
  return `${str.substring(0, 2)},${str.substring(2, 4)}`;
};

exports.maskCnpj = (str) => {
  return `${str.substring(0, 2)}.${str.substring(2, 5)}.${str.substring(
    5,
    8,
  )}/${str.substring(8, 12)}-${str.substring(12)}`;
};

exports.validateEmail = (str) => {
  const r = /\S+@\S+\.\S+/;
  return r.test(str);
};

exports.validateTelephone = (str) => {
  str = str.replace(/\D/g, '');
  return str.length === 10 || str.length === 11;
};

exports.formatName = (str) => {
  const last = str.charAt(str.length - 1);
  const aux =
    last === str.charAt(str.length - 2)
      ? str.substring(0, str.length - 1)
      : str;
  return aux
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s]/gi, '')
    .toUpperCase();
};
