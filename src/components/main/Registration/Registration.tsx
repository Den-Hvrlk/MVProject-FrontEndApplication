import "./Registration.css";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useToast } from "../../../hooks/useToast";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registration: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [requestedEmail, setRequestedEmail] = useState<string>("");
  const [isAnotherTryRequest, setIsAnotherTryRequest] =
    useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errMessage, setErrorMessage] = useState<string>("");

  const { showToast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    if (email != requestedEmail && EMAIL_REGEX.test(email)) {
      setValidEmail(true);
    } else if (email === requestedEmail && isAnotherTryRequest) {
      setValidEmail(false);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  });

  useEffect(() => {
    setErrorMessage("");
  }, [user, password, matchPassword]);

  const hadleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");

    const v1 = USER_REGEX.test(user);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMessage("Invalid Entry");
      return;
    }
    setRequestedEmail(email);

    try {
      const response = await axios.post(
        "/users/CreateUser",
        JSON.stringify({
          email: email,
          username: user,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            WithCredentials: "true",
          },
        }
      );

      showToast("Реєстрація успішна", "success");
      navigate("/Auth");

      console.log(response.data);
      console.log(response.data.accessToken);
    } catch (err: any) {
      setIsAnotherTryRequest(true);

      let message = "Registration Failed";
      if (!err.response) {
        message = "No Server Response";
      } else if (err.response?.status === 400) {
        setValidEmail(false);
        message = err.response.data;
      }

      setErrorMessage(message);
      showToast(message, "error");

      errRef.current?.focus();
    }
  };

  return (
    <section className="reg-container">
      <p
        ref={errRef}
        className={errMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMessage}
      </p>

      <h2>Створити аккаунт</h2>

      <form onSubmit={hadleSubmit}>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="username">
            Ім'я користувача:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
          />
          <div
            id="uidnote"
            className={!validName && user ? "instructions" : "offscreen"}
            style={{
              textAlign: "center",
              gap: "4px",
              margin: "4px",
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Ім'я користувача повинен складатися:
            <ul style={{ textAlign: "left", gap: "4px" }}>
              <li>Із 4 до 24 символів</li>
              <li>Повинен починатись з букви</li>
              <li>Допускаються літери, цифри, підкреслення, дефіси</li>
            </ul>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="password">
            Пароль:
            <span className={validPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              style={{ paddingRight: "40px" }} // место под глазик
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
          <div
            id="passwordnote"
            className={
              !validPassword && password ? "instructions" : "offscreen"
            }
            style={{
              textAlign: "center",
              gap: "4px",
              margin: "4px",
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Пароль повинен складатися: <br />
            <ul style={{ textAlign: "left", gap: "4px" }}>
              <li>Із 8 до 24 символів</li>
              <li>
                Хоча б одна цифра, одна мала і одна велика літера, а також один
                спецсимвол
              </li>
              <li>Дозволені: ! @ # $ % _</li>
            </ul>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="confirm_password">
            Підтвердження пароля:
            <span className={validMatch && matchPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>

          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.1rem",
                color: showConfirmPassword ? "#007bff" : "#888",
                transition: "color 0.2s ease",
                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "transparent",
              }}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>

          <p
            id="confirmnote"
            className={
              !validMatch && matchPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Має збігатися з першим полем введення пароля.
          </p>
        </div>

        <button
          disabled={!validEmail || !validName || !validPassword || !validMatch}
        >
          Створити аккаунт
        </button>
      </form>

      <p>
        Вже маєте аккаунт?{" "}
        <span className="line">
          <Link to="/Auth">Увійти</Link>
        </span>
      </p>
    </section>
  );
};

export default Registration;
