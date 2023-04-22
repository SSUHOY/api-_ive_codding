// План
// 1. Реализизовать форму логина в приложении
// *Перенести всю разметку в рендер функцию
// *Сделать форму входа динамической (+)
// *Отрефакторить приложение на модули 
// 2. Релизовать форму регистрации

import { getToDos } from "./api.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");


let tasks = [];

const host = 'https://webdev-hw-api.vercel.app/api/v2/todos'


let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'

token = null;

const fetchTodosAndRender = () => {
    return getToDos({ token }).then((responseData) => {
        tasks = responseData.todos;
        renderApp();
    });
};


// Рендер разметки

const renderApp = () => {
    const appEl = document.getElementById('app');
    if (!token) {
        const appHtml = `
                <h1>Список задач</h1>
                <div class="form">
                <h3 class="form-title">Форма входа</h3>
                <div class="form-row">
                    Логин
                    <input type="text" id="login-input" class="input" />
                    <br />
                    Пароль
                    <input type="text" id="login-input" class="input" />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
                </div>
            `;

        appEl.innerHTML = appHtml;

        document.getElementById('login-button').addEventListener('click', () => {
            token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k'
            fetchTodosAndRender();
        });

        return;
    }
    const tasksHtml = tasks
        .map((task) => {
            return `
          <li class="task">
            <p class="task-text">
              ${task.text}
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");

    const appHtml = `
                <h1>Список задач</h1>
         
                <ul class="tasks" id="list">
                <!-- Список рендерится из JS -->
                ${tasksHtml}
                </ul>
                <br />
                <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                    Что нужно сделать:
                    <input
                    type="text"
                    id="text-input"
                    class="input"
                    placeholder="Выпить кофе"
                    />
                </div>
                <br />
                <button class="button" id="add-button">Добавить</button>
                </div>`;

    appEl.innerHTML = appHtml;

    //   Переменные
    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            // подписываемся на успешное завершение запроса с помощью then
            fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    // получили данные и рендерим их в приложении
                    tasks = responseData.todos;
                    renderApp();
                });
        });
    }
    // кнопка добавления
    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляеятся...";

        // подписываемся на успешное завершение запроса с помощью then
        fetch(host, {
            method: "POST",
            body: JSON.stringify({
                text: textInputElement.value,
            }),
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                // TODO: кинуть исключение
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.error(error);
                alert("Кажется у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });
    });
};

// fetchTodosAndRender();
renderApp();