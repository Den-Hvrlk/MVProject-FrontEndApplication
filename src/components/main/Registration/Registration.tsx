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
  const deferredFormData = useDeferredValue(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={deferredFormData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={deferredFormData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Номер телефону"
          value={deferredFormData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sex"
          placeholder="Стать"
          value={deferredFormData.sex}
          onChange={handleChange}
          required
        />

        <label htmlFor="birthDate">Дата народження</label>
        <input type="date" name="birthDate" onChange={handleChange} required />

        <button type="submit">Зареєструватися</button>
        <p>
          Уже зареєстровані? <Link to="/Auth">Увійдіть</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
