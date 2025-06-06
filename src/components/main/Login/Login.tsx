import "./Login.css";
import React, { useRef, useEffect, useState } from "react";
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
  console.log("Login");
  const { auth, setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { showToast } = useToast();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

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
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);

      const id = response?.id;
      const accessToken = response?.accessToken;
      const roles = response?.roles;
      const userName = response?.userName;
      const userFunds = response?.userFunds;
      const userGroups = response?.userGroups;
      setAuth({
        id,
        email,
        roles,
        accessToken,
        userName,
        userFunds,
        userGroups,
      });

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
        message = err.response?.data;
      }

      setErrorMessage(message);
      showToast(message, "error");

      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
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
            id="email"
            ref={userRef}
            value={email}
            maxLength={255}
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

        <button type="submit" disabled={!validEmail || !password || isLoading}>
          {isLoading ? (
            <div
              className="spinner"
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                border: "2px solid #f3f3f3",
                borderTop: "2px solid #007bff",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            ></div>
          ) : (
            "Увійти"
          )}
        </button>
        <div className="persist-check">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Довіряти цьому пристрою</label>
        </div>
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
