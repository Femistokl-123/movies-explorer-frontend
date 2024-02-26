import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "./Input";
import useForm from "../../hooks/useForm";

function Register({ onRegister, isAuth }) {
    const { enteredValues, handleChange, isFormValid, resetForm, errors } = useForm();

    const navigate = useNavigate();


    if (isAuth) {
        navigate(-1)
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(enteredValues);
    };

  return (
    <section className="auth">
      <Link to="/">
        <img className="auth__logo link" src={logo} alt="Логотип"/>
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            name="name"
            title="Имя"
            onChange={handleChange}
            error={errors.name}
            placeholder="Ваше имя"
            required />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={errors.email}
            placeholder="Ваш email"
            minLength={6}
            maxLenght={30}
            required />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={errors.password}
            placeholder="Придумайте пароль"
            minLength={6}
            maxLenght={30}
            required />
        </div>
        <button type="submit" className="auth__submit-register link" disabled={!isFormValid}>Зарегистрироваться</button>
      </form>
      <div className="auth__link-container">
        <p className="color-text">Уже зарегестрированны?</p>
        <Link to="/signin" className="auth__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
