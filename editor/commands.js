export class BoldCommand {
  name = "bold";
  prevState = "";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    const selectedTxt = this.editor.getSelectedTxt();

    this.prevState = selectedTxt;

    const wrappedTxt = `**${selectedTxt}**`;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    this.editor.replaceSelectedTxt(this.prevState);
  }
}

export class ItalicCommand {
  name = "italic";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    const selectedTxt = this.editor.getSelectedTxt();

    this.prevState = selectedTxt;

    const wrappedTxt = `*${selectedTxt}*`;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    this.editor.replaceSelectedTxt(this.prevState);
  }
}

export class StrikeCommand {
  name = "strike";

  constructor(editor = {}) {
    this.editor = editor;
  }

  execute() {
    const selectedTxt = this.editor.getSelectedTxt();

    this.prevState = selectedTxt;

    const wrappedTxt = `~~${selectedTxt}~~`;

    this.editor.replaceSelectedTxt(wrappedTxt);
  }

  undo() {
    this.editor.replaceSelectedTxt(this.prevState);
  }
}
