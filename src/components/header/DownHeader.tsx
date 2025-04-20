import { Link } from "react-router-dom";
import "./Header.css";

const DownHeader: React.FC = () => {
  console.log("DownHeader");
  return (
    <nav>
      <div className="left-section">
        <img
          src="/images/Logo.ico"
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
          className="logo"
        />
        <ul className="left-links">
          <li>
            <Link to="/donate">
              <p className="donate-a">ЗАДОНАТИТИ</p>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <p className="a-link">ПРО НАС</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-section">
        <ul className="right-links">
          <li>
            <Link to="/fundraisings">
              <p className="a-link">ЗБОРИ КОШТІВ</p>
            </Link>
          </li>
          <li>
            <Link to="/volunteer-projects">
              <p className="a-link">ВОЛОНТЕРСЬКІ ПРОЕКТИ</p>
            </Link>
          </li>
          <li>
            <Link to="/military-groups">
              <p className="a-link">ВІЙСЬКОВІ УГРУПУВАННЯ</p>
            </Link>
          </li>
          <li>
            <Link to="/volunteer-funds">
              <p className="a-link">ВОЛОНТЕРСЬКІ ФОНДИ</p>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <p className="a-link">ЗВІТИ</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DownHeader;
