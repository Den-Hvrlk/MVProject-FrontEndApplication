import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  console.log("Footer");
  return (
    <>
      <footer>
        <div className="footer-links">
          <div className="footer-row row-1">
            <div className="footer-item">
              <Link to="/fundraisings">
                <p className="a-link">
                  Збори
                  <br />
                  коштів
                </p>
              </Link>
            </div>
            <div className="footer-item">
              <Link to="/military-groups">
                <p className="a-link">
                  Військові
                  <br />
                  угруповання
                </p>
              </Link>
            </div>
            <div className="footer-item">
              <Link to="/volunteer-funds">
                <p className="a-link">
                  Волонтерські
                  <br />
                  фонди
                </p>
              </Link>
            </div>
          </div>

          <div className="footer-row row-2 logo-container">
            <img src="/images/Logo.ico" className="logo" alt="Logo" />
          </div>

          <div className="footer-row row-3">
            <div className="footer-item">
              <Link to="/about-us">
                <p className="a-link">Про нас</p>
              </Link>
            </div>
            <div className="footer-item">
              <Link to="/confidentiality-policy">
                <p className="a-link">
                  Політика <br /> конфіденційності
                </p>
              </Link>
            </div>
            <div className="footer-item">
              <Link to="/support">
                <p className="a-link">Підтримка</p>
              </Link>
            </div>
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
