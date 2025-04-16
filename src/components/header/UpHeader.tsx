import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../api/users";
import { useToast } from "../../hooks/useToast";

const UpHeader: React.FC = () => {
  console.log("UpHeader");

  const email: string = import.meta.env.VITE_EMAIL;
  const phone: string = import.meta.env.VITE_PHONE;

  const { auth, setAuth, persist } = useAuth();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isCacheReady, setIsCacheReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      localStorage.removeItem("persist");
      setAuth({
        id: 0,
        email: "",
        roles: [],
        accessToken: "",
        userName: "",
      });

      localStorage.removeItem("cachedUserName");

      showToast(response.message, "success");

      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  useEffect(() => {
    if (
      !persist &&
      !auth.accessToken &&
      localStorage.getItem("cachedUserName")
    ) {
      localStorage.removeItem("cachedUserName");
    }

    setIsCacheReady(true);
  }, [persist, auth.accessToken]);

  let userName: string;
  if (!auth?.accessToken) {
    userName = localStorage.getItem("cachedUserName")!;
  } else {
    userName = auth.userName;
  }

  if (!isCacheReady) return null;

  return (
    <div className="top-bar">
      <div className="contact-info">
        <span>Email: {email}</span>
        <span>Phone: {phone}</span>
      </div>
      <div className="social-container">
        <div className="social-links">
          <a href="#">
            <img src="/images/telegram.png" alt="Telegram" />
          </a>
          <a href="#">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
        </div>
        <div className="log-in-container" ref={dropdownRef}>
          {!userName ? (
            <Link to="/login">
              <p className="log-in">УВІЙТИ</p>
            </Link>
          ) : (
            <div className="user-dropdown">
              <p
                className="user-name"
                onClick={() => setIsOpen((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {userName}
              </p>
              {isOpen && (
                <div className="dropdown-menu" onClick={() => setIsOpen(false)}>
                  <Link to="/user-profile" className="dropdown-item">
                    Профіль
                  </Link>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Вийти
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UpHeader);
