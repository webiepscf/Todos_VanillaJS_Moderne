import todoTemplate from './templates/todo';

export default class Todo {
  constructor (data) {
    this.parent    = data.parent;
    this.el;
    this.id        = data.todo.id;
    this.content   = data.todo.content;
    this.completed = data.todo.completed;
    this.template  = todoTemplate;
  }

  _replaceInTemplate() {
    // Je remplace des données statiques par les données du Todo
    for (let propriete in this) {
      this.template = this.template.replace('{{'+propriete+'}}', this[propriete]);
    }
    // Si c'est completed
    this.template = this.template.replace('{{isCompletedClass}}', (this.completed)?'completed':'');
    this.template = this.template.replace('{{isCompletedChecked}}', (this.completed)?'checked="checked"':'');
  }

  render () {
    this._replaceInTemplate();
    this.el = document.createElement('div');
    this.el.innerHTML = this.template;
    this.parent.listEl.appendChild(this.el);

    // Activation des éléments interactifs du Todo
    this._activerBtns();
  }

/**
 * Toggle completed du Todo
 * @return {[type]} [description]
 */
  toggleCompleted () {
    this.completed = !this.completed;
    if (this.completed) {
      this.el.querySelector('.toggle').checked = true;
    }
    else {
      this.el.querySelector('.toggle').removeAttribute('checked');
    }
    this.el.querySelector('li').classList.toggle('completed');
    this.parent.setNotCompletedNumber();
  }

/**
 * Suppression du Todo
 * @return {[type]} [description]
 */
  _destroy () {
    this.el.remove();
    this.parent.removeOneById(this.id);
  }

/**
 * Edition du Todo
 * @return {[type]} [description]
 */
  _edit () {
    this.el.querySelector('.editable').innerHTML = `
      <input type="text" class="validate" value="${this.content}" />
    `;
    this._activerBtns();
  }

/**
 * Validation de la modification du Todo
 * @return {[type]} [description]
 */
  _validate () {
    this.content = this.el.querySelector('.validate').value;
    this.el.querySelector('.editable').innerHTML = this.content;
    this._activerBtns();
  }

/**
 * Activation des éléments interactifs du Todo
 * @return {[type]} [description]
 */
  _activerBtns () {
    // Activation des .toggle
      this.el.querySelector('.toggle').onclick = () => {
        this.toggleCompleted();
      }

    // Activation des .destroy
    this.el.querySelector('.destroy').onclick = () => {
      this._destroy();
    }

    // Activation des .editable
    this.el.querySelector('.editable').ondblclick = () => {
      this._edit();
    }

    // Activation des .validate
    if (this.el.querySelector('.validate')) {
      this.el.querySelector('.validate').onkeyup = (e) => {
        if (e.keyCode === 13) {
          this._validate();
        }
      }
    }

  }
}
