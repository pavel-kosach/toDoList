"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const headerButton = document.querySelector(".header-button");
const toDoList = document.querySelector(".todo-list");
const toDoComplited = document.querySelector(".todo-completed");

const toDoData = [];

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
      item.complited = !item.complited;
      // меняем свойство на противоположное
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  const newToDo = {
    text: headerInput.value,
    complited: false,
  };
  toDoData.push(newToDo);
  headerInput.value = "";
  render();
});
