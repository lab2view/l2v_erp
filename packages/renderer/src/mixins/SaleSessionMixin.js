import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('cashier_session', ['currentSession']),
    isCashierSessionRoute() {
      return RegExp(`^sales.session*`).test(this.$route.name);
    },
    isProfileRoute() {
      return RegExp(`^iam.profile*`).test(this.$route.name);
    },
    isSaleSession() {
      return (
        this.isCashierSessionRoute ||
        (this.currentSession && this.isProfileRoute)
      );
    },
    sliderMenuClass() {
      return this.isCashierSessionRoute ? 'close_icon' : '';
    },
    cashierName() {
      return (
        this.currentSession.cashier.name ?? this.currentSession.cashier.code
      );
    },
    cashRegisterName() {
      return this.currentSession.cash_register.label;
    },
  },
};
