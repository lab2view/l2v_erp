<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitUserForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
        >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
    </form>
  </div>
</template>

<script>
// import BaseButton from '/@/components/common/BaseButton.vue';
// import BaseSelect from '/@/components/common/BaseSelect.vue';
// import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
    store
      .dispatch('role/getRolesList', {
        page: 1,
        field: {},
      }),
    store
      .dispatch('role/getActionsList', {
        page: 1,
        field: {},
      })
    ])
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      errors: [],
      is_edited: true,
      formLoading: false,
      userForm: {
      },
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('role', ['roles', 'actions']),
    formTitle() {
      return this.user && this.user.id
        ? this.$t('iam.user.formUpdateTitle')
        : this.$t('iam.user.formCreateTitle');
    },
  },
  watch: {
    userForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.user && this.user.id) {
      this.userForm = this.user;
      this.is_edited = false;
    }
  },
  beforeUnmount() {
    this.setLoading();
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitUserForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.user && this.user.id) {
        if (this.is_edited) {
          this.$store.dispatch(
            'user/updateUser',
            this.userForm,
          )
            .then((user) =>
              this.$router.push({
                name: 'iam.user.form.privileges',
                params: { id: user.id },
              })
            )
            .catch((error) => {
              this.errors = error.response.data.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        } else
          this.$router.push({
            name: 'iam.user.form.privileges',
            params: { id: this.user.id },
          });
      } else {
        this.$store
          .dispatch(
            'user/addUser',
            this.userForm,
          )
          .then((user) => {
            this.setLoading();
            this.$router.push({
              name: 'iam.user.form.privileges',
              params: {id: user.id},
            });
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
            this.setLoading();
          });
      }
    },
  },
};
</script>

<style scoped></style>
