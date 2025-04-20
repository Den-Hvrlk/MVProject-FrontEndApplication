import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { registerFund } from "../../../api/funds";
import "./RegisterFund.css";

export type RegisterFundProps = {
  name: string;
  desctiption: string;
};

const RegisterFund = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fundNameRef = useRef<HTMLInputElement>(null);
  const [registerForm, setRegisterForm] = useState<RegisterFundProps>({
    name: "",
    desctiption: "",
  });

  useEffect(() => {
    if (fundNameRef.current) {
      fundNameRef.current.focus();
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerFund(registerForm);
      showToast("Фонд успішно створений", "success");
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
                <label htmlFor="fundname">Назва фонду</label>
                <input
                  ref={fundNameRef}
                  className="register-fund-form-name"
                  type="text"
                  name="fundnamelabelname"
                  id="fundname"
                  value={registerForm.name}
                  onChange={(e) =>
                    setRegisterForm(() => ({
                      ...registerForm,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="register-fund-form-field">
                <label htmlFor="funddescription">Опис фонду</label>
                <textarea
                  name="funddescriptionlabelname"
                  id="funddescription"
                  value={registerForm.desctiption}
                  className="register-fund-form-description"
                  onChange={(e) =>
                    setRegisterForm(() => ({
                      ...registerForm,
                      desctiption: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="register-fund-form-button">
            <button type="submit">Створити волонтерський фонд</button>
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
