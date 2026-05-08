const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const emptyState = document.getElementById('empty-state');

const TODOS_STORAGE_KEY = 'todoAppTodos';
let todos = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY) || '[]');

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    if (todo.completed) listItem.classList.add('completed');

    const label = document.createElement('label');
    label.htmlFor = `todo-${todo.id}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `todo-${todo.id}`;
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const text = document.createElement('span');
    text.textContent = todo.text;

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeTodo(todo.id));

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

function addTodo(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return;

  todos.push({
    id: Date.now().toString(),
    text: trimmedText,
    completed: false,
  });

  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

renderTodos();
