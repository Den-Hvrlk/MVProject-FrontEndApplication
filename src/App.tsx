import Footer from "./components/footer/Footer.tsx";
import HeaderComponent from "./components/header/HeaderComponent.tsx";
import Main from "./components/main/Main.tsx";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  console.log("App");
  return (
    <div className="app">
      <Router>
        <HeaderComponent />
        <Main />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
