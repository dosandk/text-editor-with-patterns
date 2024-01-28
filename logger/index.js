const logger = {
  isProdMode: false,

  guard() {
    if (this.isProdMode) return;
  },

  log(...props) {
    this.guard();
    console.log(...props);
  },

  error(...props) {
    this.guard();
    console.error(...props);
  },

  table(...props) {
    this.guard();
    console.table(...props);
  },
};

export default logger;
