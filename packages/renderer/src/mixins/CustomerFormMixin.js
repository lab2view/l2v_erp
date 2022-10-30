import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      errors: [],
      loading: false,
      customerForm: {
        id: null,
        customer_type_id: null,
        customer_type: null,
        localization_id: null,
        localization: null,
        country_id: null,
        country: null,
        first_name: null,
        name: null,
        phone: null,
        email: null,
        reference: null,
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('localization', ['localizations']),
    ...mapGetters('customer', ['customer']),
    ...mapGetters('customer_type', ['customerTypes']),
    ...mapGetters('country', { countries: 'activeCountries' }),
  },
  created() {
    if (this.customer) {
      this.customerForm = { ...this.customer };
    } else this.customerForm.country_id = this.currentUser.country_id;
  },
  methods: {
    submitCustomerForm() {
      if (this.loading) return;

      this.loading = true;
      this.errors = [];
      if (this.customer) {
        this.$store
          .dispatch('customer/updateCustomer', this.customerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      } else {
        this.$store
          .dispatch('customer/addCustomer', this.customerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
