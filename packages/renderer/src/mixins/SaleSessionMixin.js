export default {
  computed: {
    isCashierSessionRoute() {
      return RegExp(`^sales.session*`).test(this.$route.name);
    },
    sliderMenuClass() {
      return this.isCashierSessionRoute ? 'close_icon' : '';
    },
  },
};
