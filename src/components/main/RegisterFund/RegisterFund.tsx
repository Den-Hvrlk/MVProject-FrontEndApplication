import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { createRequest } from "../../../api/funds";
import "./RegisterFund.css";
import { useAuth } from "../../../hooks/useAuth";

export type RegisterFundProps = {
  FundName: string;
  CodeUSR: string;
  FundDescription: string;
};

const RegisterFund = () => {
  console.log("RegisterFund");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fundNameRef = useRef<HTMLInputElement>(null);
  const [registerForm, setRegisterForm] = useState<RegisterFundProps>({
    FundName: "",
    CodeUSR: "",
    FundDescription: "",
  });

  useEffect(() => {
    if (fundNameRef.current) {
      fundNameRef.current.focus();
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("registerForm", registerForm);
    try {
      const result = await createRequest(auth.accessToken, registerForm);
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
                    <label htmlFor="fundname">Назва фонду</label>
                    <input
                      ref={fundNameRef}
                      className="register-fund-form-name"
                      type="text"
                      name="fundnameinputname"
                      id="fundname"
                      value={registerForm.FundName}
                      onChange={(e) =>
                        setRegisterForm(() => ({
                          ...registerForm,
                          FundName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="register-fund-code">
                    <label htmlFor="fundcode">Код ЄДРПОУ</label>
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
                    />
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
            <button type="submit">
              Відправити запит на створення волонтерського фонду
            </button>
            {isLoading && (
              <div className="spinner-wrapper">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterFund;
