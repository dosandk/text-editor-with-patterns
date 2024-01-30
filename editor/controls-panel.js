export default class ControlsPanel {
  commands = {};

  constructor() {
    this.render();
    this.initListeners();
  }

  addCommand(command = {}) {
    this.commands[command.name] = command;
  }

  get template() {
    return `<ul class="control-btns">
      <li class="control-btns-item">
        <button data-element="bold" title="bold"><b>B</b></button>
      </li>
      <li class="control-btns-item">
        <button data-element="italic" title="italic"><i>I</i></button>
      </li>
      <li class="control-btns-item">
        <button data-element="strike" title="strikethrough"><s>S</s></button>
      </li>
      <li class="control-btns-item">
        <button data-element="undo" title="undo">Undo</button>
      </li>
    </ul>`;
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  initListeners() {
    this.element.addEventListener("click", (event) => {
      const { target } = event;

      const btnElement = target.closest("button[data-element]");

      if (btnElement) {
        const name = btnElement.dataset.element;

        if (this.commands[name]) {
          this.commands[name].execute();
        } else {
          console.error(`There is no command with name: "${name}"`);
        }
      }
    });
  }
}
