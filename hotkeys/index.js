import { SaveCommand, PreviewCommand } from "../commands/index.js";

export default class HotKeys {
  subElements = {};
  commands = {};

  constructor() {
    this.commands.save = new SaveCommand();
    this.commands.preview = new PreviewCommand();

    this.render();
    this.getSubElements();
    this.initListeners();
  }

  get template() {
    return `<div class="hotkeys">
      <h3>Editor</h3>
      <ul>
        <li>
          <span>Ctrl + Shift +
          <input type="text" value="S" maxlength="1" readonly disabled></input>
          <select>
            <option value="save">Save</option>
            <!--<option value="previw">Preview</option>-->
          </select>
          <button disabled>apply</button>
        </li>
        <li>
          <span>Ctrl + Shift +
          <input type="text" value="P" maxlength="1" readonly disabled>></input>
          <select>
            <option value="previw">Preview</option>
            <!--<option value="save">Save</option>-->
          </select>
          <button disabled>apply</button>
        </li>
      </ul>

      <!--
      <h3>History</h3>

      <ul>

      </ul>
      -->
    </div>`;
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    this.subElements = result;
  }

  initListeners() {
    document.addEventListener("keydown", (event) => {
      const { shiftKey, ctrlKey, key } = event;

      if (shiftKey && ctrlKey && key === "S") {
        const textarea = event.target.closest("textarea");

        if (textarea) {
          this.commands.save.execute(textarea.value);
        }
      }
    });
    document.addEventListener("keydown", (event) => {
      const { shiftKey, ctrlKey, key } = event;

      if (shiftKey && ctrlKey && key === "P") {
        const textarea = event.target.closest("textarea");

        if (textarea) {
          this.commands.preview.execute(textarea.value);
        }
      }
    });
  }
}
