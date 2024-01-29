export default class Editor {
  subElements = {};
  commands = {};
  components = {};

  constructor(controlsPanel) {
    this.components.controlsPanel = controlsPanel;
    this.render();
    this.getSubElements();
    this.renderComponents();
  }

  getSelectedTxt() {
    const { textareaEl } = this.subElements;

    if (textareaEl) {
      const start = textareaEl.selectionStart;
      const end = textareaEl.selectionEnd;

      const selection = textareaEl.value.substring(start, end);

      return selection;
    }
  }

  replaceSelectedTxt(txt = "") {
    const { textareaEl } = this.subElements;

    if (textareaEl) {
      const start = textareaEl.selectionStart;
      const end = textareaEl.selectionEnd;

      textareaEl.value =
        textareaEl.value.substring(0, start) +
        txt +
        textareaEl.value.substring(end);
    }
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
}
