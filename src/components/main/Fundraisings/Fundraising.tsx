import { Link } from "react-router-dom";
import "./Fundraising.css";

const Fundraising: React.FC = function () {
  console.log("Fundraising");
  return (
    <>
      <h1>АКТИВНІ ЗБОРИ КОШТІВ</h1>
      <div className="fundraising-filter">
        <input
          id="fundraising-filter"
          type="text"
          placeholder="Пошук зборів коштів"
        ></input>
        <p>
          Хочете створити збір коштів?{" "}
          <Link to="/register-fund">Зареєструйте свій фонд</Link>
        </p>
      </div>

      <section id="fundraising-list">
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
        <div>Дані</div>
      </section>
    </>
  );
};

export default Fundraising;
