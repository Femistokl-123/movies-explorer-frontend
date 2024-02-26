import {useEffect, useState} from "react";
import {useCurrentUser} from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

function Profile({  handleUpdateUser, handleSignout }) {
    const currentUser = useCurrentUser();
    const user = currentUser;

    const { enteredValues, handleChange, isFormValid, resetForm, errors } = useForm();

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotChanged = (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email);
        if (isNotChanged ) {
            setIsEditing(false);
            return;
        };

        setIsEditing(false);
        handleUpdateUser({
            name: enteredValues.name,
            email: enteredValues.email,
        });
    };

    useEffect(() => {
        currentUser ? resetForm(currentUser) : resetForm();
    }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <h1 className="profile__title text-medium">Привет, {user.name}!</h1>
      <form  className="profile__form text">
        <label className="profile__label underline-profile">
         Имя:
          <input
            name="name"
            type="text"
            className="profile__input"
            value={enteredValues.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
          {errors.name && <div className={" text profile__error"}>
              {errors.name || ""}
          </div>}
        <label className="profile__label">
          E-mail:
          <input
            name="email"
            type="email"
            className="profile__input"
            value={enteredValues.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            minLength={6}
            maxLength={30}
            required
          />
        </label>
          {errors.email && <div className={" text profile__error"}>
              {errors.email || ""}
          </div>}

        {isEditing ? (
            <button type="button" className="profile__edit link text" onClick={handleSubmit} disabled={!isFormValid}>
                Сохранить
            </button>
        ) : (
            <button type="submit" className="profile__submit link text" onClick={(e) => {
                e.preventDefault();
                setIsEditing(true)}}>
                Редактировать
            </button>
        )}

      </form>
      <button onClick={handleSignout} className="profile__logout link text">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
