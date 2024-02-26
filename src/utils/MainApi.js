import { AUTH_API_URL } from "./constants";

class MainApi  {
    constructor(key){
        this._jwt = key;
        this._baseUrl  = AUTH_API_URL;
    }

    _handleResponse(res) {
        return res.ok ? res.json() : Promise.reject("Ошибка - " + res.message);
    }


    updateUser({ name, email}, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        }).then(this._handleResponse);
    }

    async getSaved() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                Authorization: `${this._jwt}`,
                'Content-Type': 'application/json',
            },
        }).then(this._handleResponse);
    }

    async save(body) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                Authorization: `${this._jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(this._handleResponse);
    }

    async delete(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${this._jwt}`,
                'Content-Type': 'application/json',
            },
        }).then(this._handleResponse);
    }

    async register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then(this._handleResponse);
    }

    //метод для авторизации в системе
    async authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password}),
        })
            .then(this._handleResponse)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                    return data;
                }
            });
    }

    //метод проверки валидности токена
    async checkToken(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${jwt}`,
            },
        })
            .then(this._handleResponse);
    }
}

export default MainApi;
