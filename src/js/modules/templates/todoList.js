export default `
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
  </header>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
    </ul>
  </section>
  <footer class="footer">
    <span class="todo-count"><strong id="todo-count">1</strong> items left</span>
    <ul class="filters">
      <li>
        <a href="#/" data-filter="all" class="filter selected">All</a>
      </li>
      <li>
        <a href="#/active" data-filter="active" class="filter">Active</a>
      </li>
      <li>
        <a href="#/completed" data-filter="completed" class="filter">Completed</a>
      </li>
    </ul>
    <button class="clear-completed">Clear completed</button>
  </footer>
</section>
<footer class="info">
  <p>Double-click to edit a todo</p>
  <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a></p>
  <p>Refactored by <a href="https://github.com/cburgmer">Christoph Burgmer</a></p>
  <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
`;
