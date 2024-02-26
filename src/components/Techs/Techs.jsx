import { forwardRef } from "react";

const skills = [
    "HTML",
    "CSS",
    "JS",
    "React",
    "Git",
    "Express",
    "mongoDB",
]

const Techs = forwardRef((props, ref) => {
  return (
    <section className="techs" ref={ref}>
      <h2 className="techs__header subtitle">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__title text-title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__list text">
          {skills.map(el => <li className="techs__list-item" key={el}>{el}</li>)}
      </ul>
    </section>
  );
});

export default Techs;
