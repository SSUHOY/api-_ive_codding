const host = "https://webdev-hw-api.vercel.app/api/v2/todos"


export function getToDos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {

            if (response.status === 401) {
                // token = prompt('Введите верный пароль!');
                // fetchTodosAndRender();
                throw new Error('Нет авторизации');
            }
            return response.json();
        })

}


export function deleteToDos({ token, id }) {
    return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
}

export function postToDos({ token, text }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
}

// документация: // https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if(response.status === 400){
                throw new Error('неверный логин или пароль');
            }
            return response.json();
        })
}