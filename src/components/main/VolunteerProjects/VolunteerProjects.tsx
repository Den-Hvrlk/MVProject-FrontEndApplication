import { Link } from "react-router-dom";
import "./VolunteerProjects.css";

const VolunteerProjects: React.FC = () => {
  return (
    <>
      <h1>ВОЛОНТЕРСЬКІ ПРОЕКТИ</h1>
      <div className="volunteer-projects-filter">
        <input
          id="volunteer-projects-filter"
          type="text"
          placeholder="Пошук влонтерських проектів"
        ></input>
        <p>
          Хочете опублікувати волонтерський проект?{" "}
          <Link to="/register-fund">Зареєструйте свій фонд</Link>
        </p>
      </div>

      <section id="volunteer-projects-list">
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

export default VolunteerProjects;
