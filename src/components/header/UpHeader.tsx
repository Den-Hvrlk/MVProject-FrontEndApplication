import { useAppDispatch } from "../../store/hooks.ts";
import { setPage } from "../../store/pageSlice.ts";

const UpHeader: React.FC = () => {
  const dispatch = useAppDispatch();
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
        <button onClick={() => dispatch(setPage("Auth"))}>Log In</button>
      </div>
    </div>
  );
};

export default UpHeader;
