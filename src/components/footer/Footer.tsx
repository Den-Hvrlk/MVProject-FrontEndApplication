import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-links">
          <div className="footer-links left">
            <Link to="/Fundraising">
              <p className="a-link">
                Збори <br />
                коштів
              </p>
            </Link>
            <Link to="/MilitaryGroups">
              <p className="a-link">
                Військові <br />
                угруповання
              </p>
            </Link>
            <Link to="/VolunteerFunds">
              <p className="a-link">
                Волонтерські <br />
                фонди
              </p>
            </Link>
          </div>

          <div className="logo-container">
            <img src="/images/Logo2.ico" className="logo" alt="Logo" />
          </div>

          <div className="footer-links right">
            <Link to="/AboutUs">
              <p className="a-link">Про нас</p>
            </Link>
            <Link to="/ConfidentialityPolicy">
              <p className="a-link">
                Політика <br />
                конфіденційності
              </p>
            </Link>
            <Link to="/Support">
              <p className="a-link">Підтримка</p>
            </Link>
          </div>
        </div>
        <div className="social-icons">
          <a href="#">
            <img src="/images/telegram.png" className="social-telegram" />
          </a>
          <a href="#">
            <img src="/images/instagram.png" className="social-instagram" />
          </a>
          <a href="#">
            <img src="/images/facebook.png" className="social-facebook" />
          </a>
        </div>
        <p>&copy; 2024 – 2025 Privacy – Terms</p>
      </footer>
    </>
  );
}

export default Footer;
