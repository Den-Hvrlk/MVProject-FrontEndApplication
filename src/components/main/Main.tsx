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

const Main: React.FC = () => {
  console.log("Main");
  return (
    <>
      <Routes>
        <Route path="/Fundraising" element={<Fundraising />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/MilitaryGroups" element={<MilitaryGroups />} />
        <Route path="/VolunteerFunds" element={<VolunteerFunds />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Reports" element={<Reports />} />
        <Route
          path="/ConfidentialityPolicy"
          element={<ConfidentialityPolicy />}
        />
        <Route path="/Support" element={<Support />} />
      </Routes>
    </>
  );
};

export default Main;
