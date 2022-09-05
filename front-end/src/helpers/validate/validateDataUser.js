const validateDataUser = ({ name = '', email, password }, validateName = false) => {
  const THREE = 3;
  const SIX = 6;
  const TWELVE = 12;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email);
  const validPassword = password.length >= SIX;
  const validName = name.length >= TWELVE;
  let isValid = true;

  if (validateName) {
    if (validEmail + validPassword + validName !== THREE) isValid = false;
  } else if (validEmail + validPassword !== 2) isValid = false;
  return isValid;
};

export default validateDataUser;
