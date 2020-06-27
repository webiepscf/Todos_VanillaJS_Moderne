import Todo from './Todo';
import todoListTemplate from './templates/todoList';

export default class TodoList {
  constructor (data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
    this.todos = [];
    this._loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render();
  }

/**
 * Chargement des todos sous forme d'objets de type Todo dans this.todos
 * @param  {[type]} todos [description]
 * @return {[type]}       [description]
 */
  _loadTodos (todos) {
    for (let todo of todos) {
      this.todos.push(new Todo({parent: this, todo}));
    }
  }

/**
 * Rendu de la TodoList
 * @return {[type]} [description]
 */
  render () {
    this.el.innerHTML = this.template;
    // LE DOM de la liste existe pour le navigateur
      this.listEl = this.el.querySelector('.todo-list');
    // Rendu des todos
      for (let todo of this.todos) {
        todo.render();
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
    const content = this.el.querySelector('.new-todo').value;
    const id = this.todos[this.todos.length - 1].id + 1;
    const newTodo = new Todo({parent: this, todo: {id, content, completed: false}})
    this.todos.push(newTodo);
    newTodo.render();
    this.el.querySelector('.new-todo').value = '';
    this.setNotCompletedNumber();
  }

/**
 * Suppression d'une Todo par son id
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
  removeOneById (id) {
    this.todos = this.todos.filter(function(todo){
      return todo.id !== id;
    });
    this.setNotCompletedNumber();
  }

/**
 * Activation des éléments interactifs de la TodoList
 * @return {[type]} [description]
 */
  _activerBtns () {
    // Activation de l'input .new-todo
      this.el.querySelector('.new-todo').onkeyup = (e) => {
        if (e.keyCode === 13) {
          this.addTodo();
        }
      };
  }

}
