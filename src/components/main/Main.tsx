import Fundraising from "./Fundraisings/Fundraising";
import Auth from "./Authorisation/Auth";
import Donate from "./Donate/Donate";
import MilitaryGroups from "./MilitaryGroups/MilitaryGroups";
import VolunteerFunds from "./VolunteerFunds/VolunteersFunds";
import About from "./AboutUs/AboutUs";
import Reports from "./Reports/Reports";
import ConfidentialityPolicy from "./ConfidentialityPolicy/ConfidentialityPolicy";
import Support from "./Support/Support";
import { Route, Routes } from "react-router-dom";
import VolunteerProjects from "./VolunteerProjects/VolunteerProjects";
import Registration from "./Registration/Registration";

const Main: React.FC = () => {
  console.log("Main");
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Fundraising />} />
        <Route path="/Fundraising" element={<Fundraising />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/MilitaryGroups" element={<MilitaryGroups />} />
        <Route path="/VolunteerFunds" element={<VolunteerFunds />} />
        <Route path="/VolunteerProjects" element={<VolunteerProjects />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Reports" element={<Reports />} />
        <Route
          path="/ConfidentialityPolicy"
          element={<ConfidentialityPolicy />}
        />
        <Route path="/Support" element={<Support />} />
      </Routes>
    </main>
  );
};

export default Main;
