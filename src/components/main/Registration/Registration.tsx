import "./Registration.css";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { useToast } from "../../../ToastContext";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
  const [userfocus, setUserFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMessage, setErrorMessage] = useState<string>("");

  const { showToast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    if (email != requestedEmail) {
      setValidEmail(true);
    } else if (email === requestedEmail && isAnotherTryRequest) {
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
    <div className="auth-container">
      <section>
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
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userfocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
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
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="passwordnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
          </div>

          <div className="input-container">
            <label htmlFor="confirm_password">
              Підтвердження пароля:
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </div>

          <button
            disabled={
              !validEmail || !validName || !validPassword || !validMatch
            }
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
    </div>
  );
};

export default Registration;
