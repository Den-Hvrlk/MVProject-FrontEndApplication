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

function App() {
  console.log("App");
  return (
    <div className="app">
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Fundraising />} />
            <Route path="/Fundraising" element={<Fundraising />} />
            <Route path="/Auth" element={<Login />} />
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
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </ToastProvider>
    </div>
  );
}

export default App;
