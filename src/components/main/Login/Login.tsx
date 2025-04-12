import "./Login.css";
import axios from "../../../api/axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../../ToastContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: React.FC = () => {
  const { setAuth } = useContext(AuthContext)!;
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { showToast } = useToast();

  const navigate = useNavigate();

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
      const response = await axios.post(
        "/users/LoginUser",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            WithCredentials: "true",
          },
        }
      );

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("roles", roles);

      showToast(
        "Ви успішно авторизувались!\nВітаю, " + response?.data?.username + "!",
        "success"
      );
      navigate("/Fundraising");

      setEmail("");
      setPassword("");
    } catch (err: any) {
      let message = "Login Failed";
      if (!err?.response) {
        message = "No Server Response";
      } else if (err.response?.status === 400) {
        message = "Missing Email or Password";
      } else if (err.response?.status === 401) {
        message = "Unauthorized";
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
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
