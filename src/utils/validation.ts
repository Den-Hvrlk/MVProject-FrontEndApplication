export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,24}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+380\d{9}$/;
export const BIRTHDATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const SEX_VALUES = ["M", "F", "None"];

export const validateUserName = (value: string): boolean =>
  USERNAME_REGEX.test(value);
export const validatePassword = (value: string): boolean =>
  PASSWORD_REGEX.test(value);
export const validateEmail = (value: string): boolean =>
  EMAIL_REGEX.test(value);
export const validatePhoneNumber = (value: string): boolean =>
  PHONE_REGEX.test(value);
export const validateBirthDate = (value: string): boolean =>
  BIRTHDATE_REGEX.test(value);
export const validateSex = (value: string): boolean =>
  SEX_VALUES.includes(value);

export const validateForm = (
  username: string,
  password: string,
  email: string
) => {
  return (
    validateUserName(username) &&
    validatePassword(password) &&
    validateEmail(email)
  );
};
