import "./VolunteersFunds.css";

const VolunteerFunds: React.FC = () => {
  return (
    <>
      <h1>ВОЛОНТЕРСЬКІ ФОНДИ</h1>
      <div className="volunteer-funds-filter">
        <input
          id="volunteer-funds-filter"
          type="text"
          placeholder="Пошук влонтерських проектів"
        ></input>
        <p>
          <a href="https://google.com">Зареєструвати волонтерський фонд</a>
        </p>
      </div>

      <section id="volunteer-funds-list">
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

export default VolunteerFunds;
