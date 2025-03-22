import UpHeader from "./UpHeader.tsx";
import DownHeader from "./DownHeader.tsx";
import "./Header.css";

export default function Header() {
  console.log("HeaderComponent");
  return (
    <>
      <header>
        <UpHeader />
        <DownHeader />
      </header>
    </>
  );
}
