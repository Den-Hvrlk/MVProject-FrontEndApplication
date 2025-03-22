import { Link } from "react-router-dom";

const UpHeader: React.FC = () => {
  const email = "megassv10122003@gmail.com";
  const phone = "+380685080882";
  console.log("UpHeader");
  return (
    <div className="top-bar">
      <div className="contact-info">
        <span>Email: {email}</span>
        <span>Phone: {phone}</span>
      </div>
      <div className="social-links">
        <a href="#">
          <img
            src="/images/telegram.png"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            className="social-telegram"
          />
        </a>
        <a href="#">
          <img
            src="/images/instagram.png"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            className="social-instagram"
          />
        </a>
        <a href="#">
          <img
            src="/images/facebook.png"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            className="social-facebook"
          />
        </a>
        <Link to="/Auth">
          <p className="log-in">Log In</p>
        </Link>
      </div>
    </div>
  );
};

export default UpHeader;
