import {useEffect, useState} from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import Wrapper from "../Wrapper/Wrapper";
import MainApi from "../../utils/MainApi";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const [infoToolTip, setInfoTooltip] = useState({
        message: "",
        isOpen: false,
        success: false,
    });

    const navigate = useNavigate();

    const mainApi = new MainApi(`Bearer ${localStorage.getItem("jwt")}`);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setLoading(true);
            mainApi
                .checkToken(jwt)
                .then((res) => {
                    setIsAuth(true);
                    console.log(window.location.pathname)
                    navigate(window.location.pathname);
                })
                .catch((err) => {
                    console.log(`${err}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);


    function onClosePopup() {
        setInfoTooltip({...infoToolTip, isOpen: false});
    }

    function handleUpdateUser(body) {
        const jwt = localStorage.getItem("jwt");
        mainApi
            .updateUser(body, jwt)
            .then(() => {
                setUser({
                    ...user,
                    name: body.name,
                    email: body.email,
                });
                setInfoTooltip({
                    message: "Профиль успешно обновлен!",
                    isOpen: true,
                    success: true,
                });
            })
            .catch((error) => {
                setInfoTooltip({
                    message: "Что-то пошло не так! Попробуйте ещё раз.",
                    isOpen: true,
                    success: false,
                })
            })
    }

    function onLogin(data) {
        mainApi
            .authorize(data.email, data.password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("jwt", res.token);
                    setIsAuth(true);
                    navigate("/movies", {replace: true});

                    setInfoTooltip({
                        message: "Вы успешно вошли в аккаунт!",
                        isOpen: true,
                        success: true,
                    });
                }
            })
            .catch((error) => {
                setInfoTooltip({
                    message: "Что-то пошло не так! Попробуйте ещё раз.",
                    isOpen: true,
                    success: false,
                });
            });
    }

    function onRegister(data) {
        mainApi
            .register(data.name, data.email, data.password)
            .then((res) => {
                if (res._id) {
                    onLogin(data);
                }
            })
            .catch((error) => {
                setInfoTooltip({
                    message: "Что-то пошло не так! Попробуйте ещё раз.",
                    isOpen: true,
                    success: false,
                });
            });
    }

    function onSignout() {
        setIsAuth(false);
        localStorage.clear();
        navigate("/", {replace: true});
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && isAuth) {
            mainApi
                .checkToken(jwt)
                .then((res) => {
                    setUser(res);
                })
                .catch((err) => {
                    console.error(`Ошибка: ${err}`);
                });
        }
    }, [isAuth]);


    return (
        <div className="page">
            <CurrentUserContext.Provider value={user}>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Wrapper isAuth={isAuth}>
                                <Main/>
                            </Wrapper>
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute isAuth={isAuth} loading={loading}>
                                <Wrapper isAuth={isAuth}>
                                    <Movies />
                                </Wrapper>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute isAuth={isAuth} loading={loading}>
                                <Wrapper isAuth={isAuth}>
                                    <SavedMovies />
                                </Wrapper>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isAuth={isAuth} loading={loading}>
                                <Wrapper isAuth={isAuth} footer={false}>
                                    <Profile handleSignout={onSignout} user={user} handleUpdateUser={handleUpdateUser}/>
                                </Wrapper>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/signin"
                        element={<Login isAuth={isAuth} onLogin={onLogin} />}
                    />
                    <Route
                        path="/signup"
                        element={<Register isAuth={isAuth} onRegister={onRegister} />}
                    />
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
                <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
