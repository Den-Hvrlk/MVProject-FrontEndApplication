import "./Fundraising.css";

function Fundraising() {
  console.log("Fundraising");
  return (
    <>
      <h1>АКТИВНІ ЗБОРИ КОШТІВ</h1>
      <div className="fundraising-filter">
        <input type="text" placeholder="Пошук зборів коштів"></input>
        <p>
          Хочете створити збір коштів?{" "}
          <a href="https://google.com">Зареєструйте свій фонд</a>
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
}

export default Fundraising;
