import "./App.css";
import { ToastProvider } from "./context/ToastContext.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Fundraising from "./components/main/Fundraisings/Fundraising.tsx";
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
import PersistLogin from "./components/PersistLogin.tsx";

function App() {
  console.log("App");
  return (
    <div className="app">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Fundraising />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/about-us" element={<About />} />

            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/volunteer-projects" element={<VolunteerProjects />} />
            <Route path="/military-groups" element={<MilitaryGroups />} />
            <Route path="/volunteer-funds" element={<VolunteerFunds />} />
            <Route path="/reports" element={<Reports />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[1000]} />}>
                <Route path="/user-profile" element={<UserProfile />} />
              </Route>
            </Route>

            <Route
              path="/confidentiality-policy"
              element={<ConfidentialityPolicy />}
            />
            <Route path="/support" element={<Support />} />

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </ToastProvider>
    </div>
  );
}

export default App;
