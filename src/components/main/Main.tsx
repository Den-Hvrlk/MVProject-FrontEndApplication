import Fundraising from "./Fundraisings/Fundraising";
import Auth from "./Authorisation/Auth";
import Donate from "./Donate/Donate";
import MilitaryGroups from "./MilitaryGroups/MilitaryGroups";
import VolunteerFunds from "./VolunteerFunds/VolunteersFunds";
import About from "./AboutUs/AboutUs";
import Reports from "./Reports/Reports";
import { useAppSelector } from "../../store/hooks";

const Main: React.FC = () => {
  const currentPage = useAppSelector((state) => state.page.currentPage);
  console.log("Main");
  return (
    <>
      {currentPage === "Fundraising" && <Fundraising />}
      {currentPage === "Auth" && <Auth />}
      {currentPage === "Donate" && <Donate />}
      {currentPage === "MilitaryGroups" && <MilitaryGroups />}
      {currentPage === "VolunteerFunds" && <VolunteerFunds />}
      {currentPage === "AboutUs" && <About />}
      {currentPage === "Reports" && <Reports />}
    </>
  );
};

export default Main;
