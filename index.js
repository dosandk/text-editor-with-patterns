import Editor from "./editor/index.js";
import History from "./history/index.js";
import Preview from "./preview/index.js";

class Page {
  components = {};
  subElements = {};

  constructor() {
    this.components.editor = new Editor();
    this.components.history = new History();
    this.components.preview = new Preview();

    this.render();
    this.getSubElements();
    this.renderComponents();

    // TODO: create message service
    this.initListeners();
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <div class="page">
        <h1>Page</h1>
        <div class="content">
          <div class="editor-wrapper" data-element="editor">
            <h2>Editor</h2>
          </div>
          <div class="history-wrapper" data-element="history">
            <h2>History</h2>
          </div>
          <div class="preview-wrapper" data-element="preview">
            <h2>Preview</h2>
          </div>
        </div>
      </div>
    `;

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

  renderComponents() {
    Object.keys(this.components).forEach((component) => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  initListeners() {
    document.addEventListener("save-doc", (event) => {
      const text = event.detail;

      this.components.history.add(text);
    });
    document.addEventListener("restore-doc", (event) => {
      const text = event.detail;

      this.components.editor.restore(text);
    });
    document.addEventListener("preview-doc", (event) => {
      const text = event.detail;

      this.components.preview.update(text);
    });
  }
}

const root = document.getElementById("root");
const page = new Page();

root.append(page.element);
