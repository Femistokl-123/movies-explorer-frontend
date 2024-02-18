import { useState } from "react";

function Profile({ user, handleUpdateUser, handleSignout }) {
  const [userInfo, setUserInfo] = useState({ name: user.name, email: user.email });
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    handleUpdateUser(userInfo);
  }

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
            value={userInfo.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label className="profile__label">
          E-mail:
          <input
            name="email"
            type="text"
            className="profile__input"
            value={userInfo.email}
            onChange={handleChange}
            disabled={!isEditing}

          />
        </label>

        {isEditing ? (
            <button type="button" className="profile__edit link text" onClick={handleSubmit}>
                Сохранить
            </button>
        ) : (
            <button type="submit" className="profile__submit link text" onClick={() => setIsEditing(true)}>
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
