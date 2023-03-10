"use strict";

const todoControl = document.querySelector(".todo-control"); // Форма с вводом задачи
const headerInput = document.querySelector(".header-input"); // Поле для ввода задачи
const headerButton = document.querySelector(".header-button"); // Кнопка с плюсом для отправки задачи
const toDoList = document.querySelector(".todo-list"); // Список задач для выполнения
const toDoComplited = document.querySelector(".todo-completed"); // Список выполненных задач
const toDoData = []; // объект для хранения задач

const render = function () {
  toDoList.innerHTML = "";
  toDoComplited.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.complited) {
      toDoComplited.append(li);
    } else {
      toDoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.complited = !item.complited; // меняем свойство на противоположное
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      li.remove();
    });
  });

  headerInput.style.border = "none";
};

// Проверяем localStorage
if (localStorage.getItem("locaToDoList")) {
  console.log("localStorage содержит сохраненные задачи");

  toDoData.push(JSON.parse(localStorage.getItem("locaToDoList")));
  console.log(toDoData);
  render();
}

// отслеживаем клик по кнопке отправки задания
todoControl.addEventListener("submit", function (event) {
  // проверяем, содержит ли поле ввода символы
  if (headerInput.value !== "" && headerInput.value !== null) {
    // если содержит, то продолжаем работу
    event.preventDefault();
    // Создаем объект, в который записываем задание
    const newToDo = {
      text: headerInput.value,
      complited: false,
    };
    // записываем знаичение объекта в объект для хранения задач
    toDoData.push(newToDo);
    // console.log(toDoData);

    headerInput.value = ""; // очищаем поле для ввода
    render();
  } else {
    // если поле для ввода не содержит символы, то перекрашиваем обводку в красный цвет
    event.preventDefault();
    headerInput.style.border = "1px solid red";
  }
});
