export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,24}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUsername = (value: string): boolean =>
  USER_REGEX.test(value);
export const validatePassword = (value: string): boolean =>
  PASSWORD_REGEX.test(value);
export const validateEmail = (value: string): boolean =>
  EMAIL_REGEX.test(value);

export const validateForm = (
  username: string,
  password: string,
  email: string
) => {
  return (
    validateUsername(username) &&
    validatePassword(password) &&
    validateEmail(email)
  );
};
