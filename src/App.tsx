import Footer from "./components/footer/Footer.tsx";
import HeaderComponent from "./components/header/HeaderComponent.tsx";
import Main from "./components/main/Main.tsx";
import "./App.css";

function App() {
  console.log("App");
  return (
    <div className="app">
      <HeaderComponent />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
