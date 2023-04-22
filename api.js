const host = 'https://webdev-hw-api.vercel.app/api/v2/todos'

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
