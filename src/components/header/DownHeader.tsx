import { useAppDispatch } from "../../store/hooks";
import { setPage } from "../../store/pageSlice";

const DownHeader: React.FC = () => {
  const dispatch = useAppDispatch();
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
            <a
              className="donate-a"
              href="#"
              onClick={() => dispatch(setPage("Donate"))}
            >
              ЗАДОНАТИТИ
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(setPage("AboutUs"))}>
              Про нас
            </a>
          </li>
        </ul>
      </div>
      <div className="right-section">
        <ul className="right-links">
          <li>
            <a href="#" onClick={() => dispatch(setPage("Fundraising"))}>
              ЗБОРИ КОШТІВ
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(setPage("MilitaryGroups"))}>
              ВІЙСЬКОВІ УГРУПУВАННЯ
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(setPage("VolunteerFunds"))}>
              ВОЛОНТЕРСЬКІ ФОНДИ
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(setPage("Reports"))}>
              ЗВІТИ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DownHeader;
