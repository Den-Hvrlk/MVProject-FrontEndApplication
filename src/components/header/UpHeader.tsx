import { Link } from "react-router-dom";
import "./UpHeader.css";

const UpHeader: React.FC = () => {
  const email: string = import.meta.env.VITE_EMAIL;
  const phone: string = import.meta.env.VITE_PHONE;

  console.log("UpHeader");
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
        <div className="log-in-container">
          <Link to="/Auth">
            <p className="log-in">УВІЙТИ</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpHeader;
