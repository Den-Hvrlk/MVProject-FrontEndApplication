import { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="auth-container">
      <h2>Вхід</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
