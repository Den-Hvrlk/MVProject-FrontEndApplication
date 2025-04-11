import { Link } from "react-router-dom";
import "./Header.css";

const DownHeader: React.FC = () => {
  console.log("DownHeader");
  return (
    <nav>
      <div className="left-section">
        <img
          src="/images/Logo2.ico"
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
          className="logo"
        />
        <ul className="left-links">
          <li>
            <Link to="/Donate">
              <p className="donate-a">ЗАДОНАТИТИ</p>
            </Link>
          </li>
          <li>
            <Link to="/AboutUs">
              <p className="a-link">ПРО НАС</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-section">
        <ul className="right-links">
          <li>
            <Link to="/Fundraising">
              <p className="a-link">ЗБОРИ КОШТІВ</p>
            </Link>
          </li>
          <li>
            <Link to="/VolunteerProjects">
              <p className="a-link">ВОЛОНТЕРСЬКІ ПРОЕКТИ</p>
            </Link>
          </li>
          <li>
            <Link to="/MilitaryGroups">
              <p className="a-link">ВІЙСЬКОВІ УГРУПУВАННЯ</p>
            </Link>
          </li>
          <li>
            <Link to="/VolunteerFunds">
              <p className="a-link">ВОЛОНТЕРСЬКІ ФОНДИ</p>
            </Link>
          </li>
          <li>
            <Link to="/Reports">
              <p className="a-link">ЗВІТИ</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DownHeader;
