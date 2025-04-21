import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import useLogout from "../../hooks/useLogout";

const UpHeader: React.FC = React.memo(() => {
  console.log("UpHeader");

  const email: string = import.meta.env.VITE_EMAIL;
  const phone: string = import.meta.env.VITE_PHONE;

  const { auth } = useAuth();
  const logout = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);

  const signOut = async () => {
    await logout();
    localStorage.removeItem("persist");
  };

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpenRef.current) setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="contact-info">
        <span>Email: {email}</span>
        <span>Phone: {phone}</span>
      </div>
      {auth.roles.includes(1001) && (
        <div>
          <Link to="/admin-panel">Адмін панель</Link>
        </div>
      )}
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
          {!auth.userName ? (
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
                {auth.userName}
              </p>
              {isOpen && (
                <div className="dropdown-menu" onClick={() => setIsOpen(false)}>
                  <Link to="/user-profile" className="dropdown-item">
                    Профіль
                  </Link>
                  <button className="dropdown-item logout" onClick={signOut}>
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
});

export default UpHeader;
