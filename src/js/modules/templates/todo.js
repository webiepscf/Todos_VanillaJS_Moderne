export default `
  <li data-id="{{id}}" class="{{isCompletedClass}} listItem">
    <input class="toggle" type="checkbox" {{isCompletedCheched}}/>
    <label>{{content}}</label>
    <button class="destroy"></button>
  </li>
`;
