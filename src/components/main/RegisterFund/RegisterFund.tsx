import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { createRequest } from "../../../api/funds";
import "./RegisterFund.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { validateCodeUSR, validateFundName } from "../../../utils/validation";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export type RegisterFundProps = {
  FundName: string;
  CodeUSR: string;
  FundDescription: string;
};

const RegisterFund = () => {
  console.log("RegisterFund");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const fundNameRef = useRef<HTMLInputElement>(null);
  const [registerForm, setRegisterForm] = useState<RegisterFundProps>({
    FundName: "",
    CodeUSR: "",
    FundDescription: "",
  });

  const [validFundName, setValidFundName] = useState<boolean>(false);
  const [validCodeUSR, setValidCodeUSR] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (fundNameRef.current) {
      fundNameRef.current.focus();
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    setValidFundName(validateFundName(registerForm.FundName));
  }, [registerForm.FundName]);

  useEffect(() => {
    setValidCodeUSR(validateCodeUSR(registerForm.CodeUSR));
  }, [registerForm.CodeUSR]);

  useEffect(() => {
    setErrorMessage("");
  }, [registerForm.FundName, registerForm.CodeUSR]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("registerForm", registerForm);
    try {
      const result = await createRequest(axiosPrivate, registerForm);
      showToast(result, "success");
      navigate("/volunteer-funds");
    } catch (err: any) {
      console.error(err);
      showToast("Створення фонду не вдалося", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="register-fund-page">
      <h1>Створення волонтерського фонду</h1>
      <div className="register-fund-container">
        <p
          ref={errRef}
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="register-fund-form">
            <div className="register-fund-form-avatar">
              <div className="avatar-image">
                <img src="/images/default-fund-avatar.svg" alt="Avatar" />
              </div>
              <div className="avatar-upload-button">
                <button type="button">Завантажити свій аватар</button>
              </div>
            </div>
            <div className="register-fund-form-info">
              <div className="register-fund-form-field">
                <div className="register-fund-inputs-row">
                  <div className="register-fund-name">
                    <label htmlFor="fundname">
                      Назва фонду
                      <span className={validFundName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validFundName || !registerForm.FundName
                            ? "hide"
                            : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      ref={fundNameRef}
                      className="register-fund-form-name"
                      type="text"
                      name="fundnameinputname"
                      id="fundname"
                      value={registerForm.FundName}
                      maxLength={255}
                      onChange={(e) =>
                        setRegisterForm(() => ({
                          ...registerForm,
                          FundName: e.target.value,
                        }))
                      }
                      aria-invalid={validFundName ? "false" : "true"}
                      aria-describedby="fundnamenote"
                    />
                    <div
                      id="fundnamenote"
                      className={
                        !validFundName && registerForm.FundName
                          ? "instructions"
                          : "offscreen"
                      }
                      style={{
                        textAlign: "center",
                        gap: "4px",
                        margin: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Назва фонду повинна складатися:
                      <ul style={{ textAlign: "left", gap: "4px" }}>
                        <li>Від 4 до 24 символів</li>
                        <li>Повинен починатись з букви</li>
                        <li>
                          Допускаються англійські літери, кирилиця, цифри,
                          підкреслення, дефіси
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="register-fund-code">
                    <label htmlFor="fundcode">
                      Код ЄДРПОУ
                      <span className={validCodeUSR ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          validCodeUSR || !registerForm.CodeUSR
                            ? "hide"
                            : "invalid"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      className="register-fund-form-name"
                      type="text"
                      name="fundnameinputcode"
                      id="fundcode"
                      value={registerForm.CodeUSR}
                      onChange={(e) =>
                        setRegisterForm(() => ({
                          ...registerForm,
                          CodeUSR: e.target.value,
                        }))
                      }
                      aria-invalid={validCodeUSR ? "false" : "true"}
                      aria-describedby="fundcodenote"
                    />
                    <div
                      id="fundcodenote"
                      className={
                        !validCodeUSR && registerForm.CodeUSR
                          ? "instructions"
                          : "offscreen"
                      }
                      style={{
                        textAlign: "center",
                        gap: "4px",
                        margin: "4px",
                      }}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Код ЄДРПОУ повинен складатися строго з 8 цифр
                    </div>
                  </div>
                </div>
              </div>
              <div className="register-fund-form-field">
                <label htmlFor="funddescription">Опис фонду</label>
                <textarea
                  name="funddescriptionlabelname"
                  id="funddescription"
                  value={registerForm.FundDescription}
                  className="register-fund-form-description"
                  onChange={(e) =>
                    setRegisterForm(() => ({
                      ...registerForm,
                      FundDescription: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="register-fund-form-button">
            <button
              className="register-fund-form-button-submit"
              type="submit"
              disabled={!validFundName || !validCodeUSR || isLoading}
            >
              Відправити запит на створення волонтерського фонду
            </button>
          </div>
        </form>
        {isLoading && (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegisterFund;
