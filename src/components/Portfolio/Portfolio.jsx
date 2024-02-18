import arrow from "../../images/arrow.svg";

const links = {
  staticSite: "https://github.com/Femistokl-123/how-to-learn",
  adaptiveSite: "https://github.com/Femistokl-123/russian-travel",
  spa: "https://github.com/Femistokl-123/react-mesto-api-full-gha",
}

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title text color-text">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href={links.staticSite}
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item underline-portfolio">
          <a
            className="portfolio__link link"
            href={links.adaptiveSite}
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href={links.spa}
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img src={arrow} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
