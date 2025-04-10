import { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DateField from "./DateField";
import RadioGroup from "./RadioGroup";
import InputField from "./InputField";
import {
  validateBirthDate,
  validateForm,
  validatePassword,
  validateSex,
  validateUserName,
} from "./Validation.ts";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    sex: "",
    birthDate: "",
  });

  const [requestMessage, setRequestMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const setMessage = (message: string, type: "success" | "error") => {
    setRequestMessage(message);
    setMessageType(type);

    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateForm(formData, {
      username: validateUserName,
      sex: validateSex,
      birthDate: validateBirthDate,
      password: validatePassword,
    });

    if (validationResult) {
      setMessage(validationResult, "error");
      return;
    }

    console.log(formData);

    try {
      const response = await fetch(
        "https://mvproject-backendwebapplication.onrender.com/api/users/CreateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.text();
      setMessage(data, response.ok ? "success" : "error");
    } catch (error) {
      setMessage("Помилка реєстрації", "error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="username"
          placeholder="Ім'я користувача"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="sex">Стать:</label>
        <RadioGroup
          name="sex"
          options={[
            { label: "Чоловік", value: "M" },
            { label: "Жінка", value: "F" },
          ]}
          selectedValue={formData.sex}
          onChange={handleChange}
        />
        <br />
        <DateField
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Зареєструватися</button>
        <p>
          Уже зареєстровані? <Link to="/Auth">Увійдіть</Link>
        </p>
        {requestMessage && (
          <div
            style={{
              color: messageType === "success" ? "green" : "red",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {requestMessage}
          </div>
        )}
      </form>
      <ToastContainer closeButton={false} autoClose={5000} />
    </div>
  );
};

export default Registration;
