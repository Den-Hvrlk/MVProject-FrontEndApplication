import "./Login.css";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faEyeSlash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../../api/users";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: React.FC = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { showToast } = useToast();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    errRef.current?.focus();
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.token;
      const roles = response?.roles;
      setAuth({ email, password, roles, accessToken });

      showToast(
        "Ви успішно авторизувались!\nВітаю, " + response?.userName + "!",
        "success"
      );
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      let message = "Login Failed";
      if (!err?.response) {
        message = "No Server Response";
      } else if (err.response?.status === 400) {
        message = "Missing Email or Password";
      } else if (err.response?.status === 401) {
        message = "Не авторизовано!\n" + err.response?.data;
      }

      setErrorMessage(message);
      showToast(message, "error");

      errRef.current?.focus();
    }
  };

  return (
    <section className="auth-container">
      <p
        ref={errRef}
        className={errorMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1>Вхід</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">
            Email
            <span className={validEmail && email ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="email"
            name="email"
            ref={userRef}
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Пароль</label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.1rem",
                color: showPassword ? "#007bff" : "#888",
                transition: "color 0.2s ease",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "transparent",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        <button type="submit" disabled={!validEmail || !password}>
          Увійти
        </button>
      </form>
      <p>
        Немає аккаунту?{" "}
        <Link to="/Registration">
          <span>Реєстрація</span>
        </Link>
      </p>
    </section>
  );
};

export default Login;
