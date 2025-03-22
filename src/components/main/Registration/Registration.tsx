import { useState } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // Получаем строку 'YYYY-MM-DD'
    setBirthDate(dateValue ? new Date(dateValue) : null); // Преобразуем в Date
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <form>
        <div className="email-input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="password-input">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="phone-input">
          <input
            type="text"
            placeholder="Номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="sex-input">
          <input
            type="text"
            placeholder="Стать"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          />
        </div>

        <label htmlFor="birthDate">Дата народження</label>
        <div className="date-input-container">
          <input
            type="date"
            value={birthDate ? birthDate.toISOString().split("T")[0] : ""}
            onChange={handleBirthDateChange}
            required
          />
        </div>
        <button type="submit">Зареєструватися</button>
        <p>
          Уже зареєстровані? <Link to="/Auth">Увійдіть</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
