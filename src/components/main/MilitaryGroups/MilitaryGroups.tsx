import "./MilitaryGroups.css";

const MilitaryGroups: React.FC = () => {
  return (
    <>
      <h1>ВІЙСЬКОВІ УГРУПОВАННЯ</h1>
      <div className="military-group-filter">
        <input type="text" placeholder="Пошук військових угруповань"></input>
        <p>
          <a href="https://google.com">Зареєструвати військове угруповання</a>
        </p>
      </div>

      <section id="military-group-list">
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
        <div>Данные</div>
      </section>
    </>
  );
};

export default MilitaryGroups;
