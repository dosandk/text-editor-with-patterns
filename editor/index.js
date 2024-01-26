import { SaveCommand, PreviewCommand } from "../commands/index.js";

export default class Editor {
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
    return `<div class="editor">
      <div class="controsl-panel">
        <button data-element="previewBtn">preview</button>
        <button data-element="saveBtn">save</button>
      </div>
      <div class="text-field">
        <textarea class="textarea" data-element="textareaEl"></textarea>
      </div>
    </div>`;
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  restore(text = "") {
    const { textareaEl } = this.subElements;

    textareaEl.value = text;
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
    const { saveBtn, previewBtn, textareaEl } = this.subElements;

    saveBtn.addEventListener("click", () => {
      this.commands.save.execute(textareaEl.value);
    });
    previewBtn.addEventListener("click", () => {
      this.commands.preview.execute(textareaEl.value);
    });
  }
}
