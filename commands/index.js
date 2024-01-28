import logger from "../logger/index.js";

export class SaveCommand {
  execute(data) {
    // TODO: add message broker
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
    // TODO: add message broker
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
    logger.table(data);
  }
}

export class RestoreCommand {
  execute(data) {
    // TODO: add message broker
    document.dispatchEvent(
      new CustomEvent("restore-doc", {
        detail: data,
        bubbles: true,
      }),
    );
  }
}
