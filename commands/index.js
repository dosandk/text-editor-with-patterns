export class SaveCommand {
  execute(data) {
    document.dispatchEvent(
      new CustomEvent("save-doc", {
        detail: data,
        bubbles: true,
      }),
    );
  }
}

export class PreviewCommand {
  execute(data) {
    document.dispatchEvent(
      new CustomEvent("preview-doc", {
        detail: data,
        bubbles: true,
      }),
    );
  }
}

export class PrintCommand {
  execute(data) {
    console.table(data);
  }
}

export class RestoreCommand {
  execute(data) {
    document.dispatchEvent(
      new CustomEvent("restore-doc", {
        detail: data,
        bubbles: true,
      }),
    );
  }
}
