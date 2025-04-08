import { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    sex: "",
    birthDate: "",
  });

  const [requestMessage, setRequestMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  async function setMessageAfterRegistration(
    response: Response
  ): Promise<void> {
    const data = await response.text();

    if (response.ok) {
      setMessageType("success");
    } else {
      setMessageType("error");
    }

    setRequestMessage(data);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDate = (date: string): boolean => {
    const year = new Date(date).getFullYear();
    return year >= 1000 && year <= 9999;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    try {
      if (!formData.sex) {
        setRequestMessage("Стать не може бути пустою");
        setMessageType("error");
        return;
      }

      if (!validateDate(formData.birthDate)) {
        setRequestMessage(
          "Некоректна дата народження. Будь ласка, перевірте введені дані"
        );
        setMessageType("error");
        return;
      }

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

      setMessageAfterRegistration(response);
    } catch (error) {
      setRequestMessage("Помилка реєстрації");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="sex">Стать</label>
        <div className="sex-options">
          <label>
            <input
              type="radio"
              name="sex"
              value="M"
              checked={formData.sex === "M"}
              onChange={handleChange}
            />
            Чоловік
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="F"
              checked={formData.sex === "F"}
              onChange={handleChange}
            />
            Жінка
          </label>
        </div>
        <br />
        <label htmlFor="birthDate">Дата народження</label>
        <input type="date" name="birthDate" onChange={handleChange} required />

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
    </div>
  );
};

export default Registration;
