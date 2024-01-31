export default class Editor {
  lastCommand = {
    execute: () => { },
    undo: () => { },
  };
  subElements = {};
  commands = {};
  components = {};

  constructor(controlsPanel) {
    this.components.controlsPanel = controlsPanel;
    this.render();
    this.getSubElements();
    this.renderComponents();
    this.initListeners();
  }

  getSelection() {
    const { textareaEl } = this.subElements;

    if (textareaEl) {
      const start = textareaEl.selectionStart;
      const end = textareaEl.selectionEnd;

      return [start, end];
    }
  }
  getSelectedTxt() {
    const { textareaEl } = this.subElements;
    const [start, end] = this.getSelection();
    const selection = textareaEl.value.substring(start, end);

    return selection;
  }

  replaceSelectedTxt(txt = "") {
    const { textareaEl } = this.subElements;
    const [start, end] = this.getSelection();

    textareaEl.value =
      textareaEl.value.substring(0, start) +
      txt +
      textareaEl.value.substring(end);

    // TODO: make snapshot
  }

  restoreTxt(prevState = "") {
    const { textareaEl } = this.subElements;

    textareaEl.value = prevState;
  }

  renderComponents() {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  get template() {
    return `<div class="editor">
      <div data-element="controlsPanel"></div>
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

  makeSnapshot() {
    console.log("snapshot");
  }

  initListeners() {
    const { textareaEl } = this.subElements;

    textareaEl.addEventListener("keyup", (event) => {
      // NOTE: just clear last command after some input
      // console.log("input", event.keyCode);

      if (event.keyCode === 32) {
        this.makeSnapshot();
      }

      this.lastCommand = {
        execute: () => { },
        undo: () => { },
      };
    });
  }
}
