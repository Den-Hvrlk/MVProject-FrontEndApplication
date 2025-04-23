import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Login from "./components/main/Login/Login.tsx";
import Donate from "./components/main/Donate/Donate.tsx";
import MilitaryGroups from "./components/main/MilitaryGroups/MilitaryGroups.tsx";
import VolunteerFunds from "./components/main/VolunteerFunds/VolunteersFunds.tsx";
import VolunteerProjects from "./components/main/VolunteerProjects/VolunteerProjects.tsx";
import About from "./components/main/AboutUs/AboutUs.tsx";
import Reports from "./components/main/Reports/Reports.tsx";
import ConfidentialityPolicy from "./components/main/ConfidentialityPolicy/ConfidentialityPolicy.tsx";
import Support from "./components/main/Support/Support.tsx";
import Registration from "./components/main/Registration/Registration.tsx";
import Missing from "./components/Missing.tsx";
import UserProfile from "./components/main/UserProfile/UserProfile.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Footer from "./components/footer/Footer.tsx";
import HeaderComponent from "./components/header/HeaderComponent.tsx";
import RegisterFund from "./components/main/RegisterFund/RegisterFund.tsx";
import AdminPanel from "./components/main/AdminPanel/AdminPanel.tsx";
import Fundraisings from "./components/main/Fundraisings/Fundraising.tsx";

function App() {
  console.log("App");
  return (
    <div className="app">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Fundraisings />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about-us" element={<About />} />

          <Route path="/fundraisings" element={<Fundraisings />} />
          <Route path="/volunteer-projects" element={<VolunteerProjects />} />
          <Route path="/military-groups" element={<MilitaryGroups />} />
          <Route path="/volunteer-funds" element={<VolunteerFunds />} />
          <Route path="/reports" element={<Reports />} />

          <Route element={<RequireAuth allowedRoles={[1000]} />}>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/register-fund" element={<RegisterFund />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[1000, 1001]} />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>

          <Route
            path="/confidentiality-policy"
            element={<ConfidentialityPolicy />}
          />
          <Route path="/support" element={<Support />} />

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
