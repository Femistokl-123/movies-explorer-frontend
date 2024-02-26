import {forwardRef} from "react";
import photo from "../../images/profile.jpg";

const AboutMe = forwardRef((props, ref) => {
    return (
        <section className="about" ref={ref}>
            <h2 className="about__header subtitle">Студент</h2>
            <div className="about__info">
                <div className="about__info-description">
                    <h3 className="about__info-title text-title">Игорь</h3>
                    <p className="about__info-subtitle">Фронтенд-разработчик, 23 года</p>
                    <p className="about__info-description">
                        В данный момент состою на государственной службе в Хабаровском крае. Увлекаюсь
                        иностранными языками, в частности владею английским языком и в данный момент изучаю японский
                        язык. С прошлого года стал студентом образовательной платформы Яндекс Практикум по направлению
                        Web-разработчик.
                    </p>
                    <ul className="about__links">
                        <li>
                            <a href="https://github.com/Femistokl-123" className="link" target="_blank"
                               rel="noreferrer">
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
                <img className="about__info-image" src={photo} alt="Фотография студента"/>
            </div>
        </section>
    );
});

export default AboutMe;
