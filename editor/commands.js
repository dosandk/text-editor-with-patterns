export class BoldCommand {
  name = "bold";
  prevState = "";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    this.editor.lastCommand = this;

    const selectedTxt = this.editor.getSelectedTxt();
    const wrappedTxt = `**${selectedTxt}**`;

    this.prevState = this.editor.subElements.textareaEl.value;
    // this.prevState = selectedTxt;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    // this.editor.lastCommand = this;
    this.editor.restoreTxt(this.prevState);
  }
}

export class ItalicCommand {
  name = "italic";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    this.editor.lastCommand = this;

    const selectedTxt = this.editor.getSelectedTxt();

    this.prevState = this.editor.subElements.textareaEl.value;
    // this.prevState = selectedTxt;

    const wrappedTxt = `*${selectedTxt}*`;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    this.editor.restoreTxt(this.prevState);
  }
}

export class StrikeCommand {
  name = "strike";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    this.editor.lastCommand = this;

    const selectedTxt = this.editor.getSelectedTxt();

    this.prevState = this.editor.subElements.textareaEl.value;
    // this.prevState = selectedTxt;

    const wrappedTxt = `~~${selectedTxt}~~`;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    this.editor.restoreTxt(this.prevState);
  }
}

export class UndoCommand {
  name = "undo";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    if (this.editor.lastCommand) {
      this.editor.lastCommand.undo();
    }
  }
}
