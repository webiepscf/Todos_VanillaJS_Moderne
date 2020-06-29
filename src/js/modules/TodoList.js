import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
    this.template = todoListTemplate;

    // Je stocke les données de data.js en localStorage
      this._loadTodos(data.todos);
      this.render(this.todos);
  }

/**
 * Stockage des todos en localStorage
 * @param  {[Array]} todos
 * @return {[type]}       [description]
 */
  _loadTodos (todos) {
    if (!window.localStorage.todos) {
      window.localStorage.todos = JSON.stringify(todos);
    }
  }

/**
 * Setter de this.todos: Modifie les données en localStorage
 * @param  {[Array]} todos
 * @return {[type]}       [description]
 */
  set todos (todos) {
    if (!window.localStorage.todos || window.localStorage.todos != JSON.stringify(todos)) {
      window.localStorage.todos = JSON.stringify(todos);
    }
  }

/**
 * Getter de this.todos : récupère les données du localStorage
 * @return {[Array]} [description]
 */
  get todos () {
    return JSON.parse(localStorage.todos);
  }


/**
 * Rendu de la TodoList
 * @return {[Array]} [description]
 */
  render (todos) {
    this.el.innerHTML = this.template;
    // LE DOM de la liste existe pour le navigateur
      this.listEl = this.el.querySelector('.todo-list');
    // Rendu des todos
      for (let todo of todos) {
        const newTodo = new Todo({parent: this, todo});
        newTodo.render();
      }

    // Affichage du nombre de todos not completed
      this.setNotCompletedNumber();
    // Activation des éléments interactifs
      this._activerBtns();
  }

/**
 * Affichage du nombre de todos not completed
 */
  setNotCompletedNumber () {
    this.notCompletedNumber = this.todos.filter(function(todo) {
      return todo.completed === false;
    }).length;
    this.el.querySelector('#todo-count').innerText = this.notCompletedNumber;
  }

/**
 * Ajout d'un todo
 */
  addTodo () {
    // Je récupères les infos pour construire le nouveau Todo
    const content = this.el.querySelector('.new-todo').value;
    const id = this.todos[this.todos.length - 1].id + 1;
    const todo = {id, content, completed: false};

    // J'envoie en localStorage
    let test = this.todos;
    test.push(todo);
    this.todos = test;
    console.table(this.todos);

    // Je fais le render du nouveau Todo
    const newTodo = new Todo({parent: this, todo: {id, content, completed: false}});
    newTodo.render();
    this.el.querySelector('.new-todo').value = '';
    this.setNotCompletedNumber();
  }

/**
 * Suppression d'une Todo par son id
 * @param  {[int]} id [description]
 * @return {[Array]}  [description]
 */
  removeOneById (id) {
    this.todos = this.todos.filter(function(todo){
      return todo.id !== id;
    });
    this.setNotCompletedNumber();
  }

/**
 * Suppression de tous les todos.completed
 * @return {[type]} [description]
 */
  _removeAllCompleted () {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    this.render(this.todos);
  }

/**
 * Complete all todos notCompleted
 * @return {[Array]} [description]
 */
  _completeAll () {
    const notCompleted = this.todos.filter(function (todo) {
      return !todo.completed;
    });
    for (let todo of notCompleted) {
      todo.toggleCompleted();
    }
  }

/**
 * Affichage des todos correspondants au filtre choisi
 * @param  {[string]} filter [description]
 * @return {[Array]}        [description]
 */
  _filter (filter) {
    switch (filter) {
      case 'active':
        this.render(this.todos.filter(function (todo) {
          return !todo.completed;
        }));
        break;
      case 'completed':
        this.render(this.todos.filter(function (todo) {
          return todo.completed;
        }));
        break;
      default:
      this.render(this.todos);
    }
  }

/**
 * Activation des éléments interactifs de la TodoList
 * @return {[type]} [description]
 */
  _activerBtns () {
    // Activation de l'input .new-todo
      this.el.querySelector('.new-todo').onkeyup = (e) => {
        if (e.keyCode === 13 && this.el.querySelector('.new-todo').value != '') {
          this.addTodo();
        }
      };

    // Activation des .filter
      const filterBtns = this.el.querySelectorAll('.filter');
      for (let filterBtn of filterBtns) {
        filterBtn.onclick = () => {
          this._filter(filterBtn.dataset.filter);
        }
      }

    // Activation du .clear-completed
      this.el.querySelector('.clear-completed').onclick = () => {
        this._removeAllCompleted();
      };

    // Activation du .toogle-all
      this.el.querySelector('.toggle-all').onclick = () => {
        this._completeAll();
      };
  }
}
