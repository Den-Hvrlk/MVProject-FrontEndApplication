import { useDeferredValue, useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const deferredFormData = useDeferredValue(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-container">
      <h2>Вхід</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
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
        <button type="submit">Увійти</button>
        <p>
          <Link to="/Registration">Зареєструватися</Link>
        </p>
      </form>
    </div>
  );
};

export default Auth;
