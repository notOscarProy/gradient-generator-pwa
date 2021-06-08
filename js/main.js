const app = Vue.createApp({
  data: () => ({
    title: "Generador de degradados",
    color1: "#40ef12",
    color2: "#318687",
    orientation: 1,
  }),
  computed: {
    setColor() {
      return `background: linear-gradient(to ${
        this.orientation == 1
          ? "right"
          : this.orientation == 2
          ? "left"
          : this.orientation == 3
          ? "top"
          : this.orientation == 4
          ? "bottom"
          : 1
      }, ${this.color1},${this.color2});`;
    },
  },
});
