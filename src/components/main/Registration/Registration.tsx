import { useDeferredValue, useState } from "react";
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
  const deferredFormData = useDeferredValue(formData);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDate = (date: string): boolean => {
    const year = new Date(date).getFullYear();
    return year >= 1800 && year <= 9999;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validateDate(formData.birthDate)) {
        setRequestMessage(
          "Некоректна дата народження. Будь ласка, перевірте введені дані"
        );
        setMessageType("error");
        return;
      }

      const response = await fetch(
        "https://mv-project-back-end-web-application.vercel.app/api/users/CreateUser",
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
          value={deferredFormData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={deferredFormData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Номер телефону"
          value={deferredFormData.phone}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="sex">Стать</label>
        <select
          name="sex"
          value={deferredFormData.sex}
          onChange={handleSelectChange}
          required
        >
          <option value="M">M (Чоловік)</option>
          <option value="F">F (Жінка)</option>
        </select>

        <label htmlFor="birthDate">Дата народження</label>
        <input
          type="date"
          name="birthDate"
          onChange={handleInputChange}
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
    </div>
  );
};

export default Registration;
