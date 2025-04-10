export type ValidationResult = {
  valid: boolean;
  message: string;
};

export const validateSex = (value: string): ValidationResult => {
  return {
    valid: value !== "",
    message: "Стать не може бути пустою!",
  };
};

export const validateBirthDate = (value: string): ValidationResult => {
  const year = new Date(value).getFullYear();
  return {
    valid: year >= 1000 && year <= 9999,
    message: "Некоректна дата народження! Будь ласка, перевірте введені дані.",
  };
};

export const validatePassword = (value: string): ValidationResult => {
  return {
    valid: value.length >= 5,
    message: "Пароль повинен містити не менше 5 символів",
  };
};

export const validateUserName = (value: string): ValidationResult => {
  return {
    valid: value !== null && value.length >= 3,
    message: "Ім'я користувача повинно бути більше 3 символів",
  };
};

export const validateForm = (
  formData: { [key: string]: string },
  validations: { [key: string]: (value: string) => ValidationResult }
): string | null => {
  for (const key in validations) {
    const result = validations[key](formData[key]);
    if (!result.valid) {
      return result.message;
    }
  }
  return null;
};
