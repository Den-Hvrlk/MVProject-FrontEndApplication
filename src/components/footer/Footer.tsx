import { useAppDispatch } from "../../store/hooks";
import { setPage } from "../../store/pageSlice";
import "./Footer.css";

function Footer() {
  const dispatch = useAppDispatch();
  return (
    <>
      <footer>
        <div className="footer-links">
          <div className="footer-links left">
            <a href="#" onClick={() => dispatch(setPage("Fundraising"))}>
              Збори <br />
              коштів
            </a>
            <a href="#" onClick={() => dispatch(setPage("MilitaryGroups"))}>
              Військові <br />
              угрупування
            </a>
            <a href="#" onClick={() => dispatch(setPage("VolunteerFunds"))}>
              Волонтерські <br />
              фонди
            </a>
          </div>

          <div className="logo-container">
            <img src="/images/Logo2.ico" className="logo" alt="Logo" />
          </div>

          <div className="footer-links right">
            <a href="#" onClick={() => dispatch(setPage("AboutUs"))}>
              Про нас
            </a>
            <a href="#">
              Політика <br />
              конфіденційності
            </a>
            <a href="#">Підтримка</a>
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
