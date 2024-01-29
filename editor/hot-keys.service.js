export default class HotKeysService {
  commands = {};

  constructor() {
    this.initListeners();
  }

  addCommand(key = "", callback = () => { }) {
    this.commands[key.toUpperCase()] = callback;
  }

  initListeners() {
    document.addEventListener("keydown", (event) => {
      const { shiftKey, ctrlKey, key } = event;

      if (shiftKey && ctrlKey && Object.keys(this.commands).includes(key)) {
        this.commands[key].execute();
      }
    });
  }
}
