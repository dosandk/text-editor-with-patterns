import Editor from "./editor/index.js";
import ControlsPanel from "./editor/controls-panel.js";
import HotKeysService from "./editor/hot-keys.service.js";
import {
  BoldCommand,
  ItalicCommand,
  StrikeCommand,
  UndoCommand,
} from "./editor/commands.js";

class Page {
  components = {};
  subElements = {};

  constructor() {
    const hotKeysService = new HotKeysService();
    const controlsPanel = new ControlsPanel();

    this.components.editor = new Editor(controlsPanel);

    const boldCommand = new BoldCommand(this.components.editor);
    const italicCommand = new ItalicCommand(this.components.editor);
    const strikeCommand = new StrikeCommand(this.components.editor);
    const undoCommand = new UndoCommand(this.components.editor);

    controlsPanel.addCommand(boldCommand);
    controlsPanel.addCommand(italicCommand);
    controlsPanel.addCommand(strikeCommand);
    controlsPanel.addCommand(undoCommand);

    hotKeysService.addCommand("B", boldCommand);
    hotKeysService.addCommand("I", italicCommand);
    hotKeysService.addCommand("S", strikeCommand);

    this.render();
    this.getSubElements();
    this.renderComponents();
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
}

const root = document.getElementById("root");
const page = new Page();

root.append(page.element);
