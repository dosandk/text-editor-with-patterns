import { HistoryService } from "./history.service.js";

class HistoryItem {
  subElements = {};

  constructor(options = {}) {
    this.restore = options.restore;
    this.print = options.print;
    this.preview = options.preview;

    this.snapshot = options.snapshot;

    this.render();
    this.getSubElements();
    this.initListeners();
  }

  get template() {
    return `
      <li>
        <span>v${this.snapshot.state.version}</span>
        <span> | </span>
        <span>time: (${this.snapshot.state.date})</span>
        <br>
        <button data-element="previewBtn">preview</button>
        <button data-element="printBtn">print</button>
        <button data-element="restoreBtn">restore</button>
      </li>
    `;
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
    const { restoreBtn, printBtn, previewBtn } = this.subElements;

    restoreBtn.addEventListener("click", () => {
      this.restore(this);
    });

    printBtn.addEventListener("click", () => {
      this.print(this);
    });

    previewBtn.addEventListener("click", () => {
      this.preview(this);
    });
  }
}

export default class History {
  subElements = {};

  restore = (item) => {
    this.element.prepend(item.element);

    document.dispatchEvent(
      new CustomEvent("restore-doc", {
        detail: item.snapshot.state.text,
        bubbles: true,
      }),
    );
  };

  preview = (item) => {
    document.dispatchEvent(
      new CustomEvent("preview-doc", {
        detail: item.snapshot.state.text,
        bubbles: true,
      }),
    );
  };

  print = (item) => {
    console.table(item.snapshot.state);
  };

  constructor() {
    this.service = new HistoryService();
    this.render();
    this.getSubElements();
  }

  get template() {
    return `<ul class="history"></ul>`;
  }

  add(text = "") {
    this.service.add(text);

    this.element.innerHTML = "";

    for (const snapshot of this.service.list) {
      const item = new HistoryItem({
        restore: this.restore,
        print: this.print,
        preview: this.preview,
        snapshot,
      });

      this.element.append(item.element);
    }
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
}
