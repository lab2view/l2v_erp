<template>
  <router-view/>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitForm">
      <div class="card-body">
        List
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'sales.discount.form.desc' })"
          />
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary col-auto"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseButton },
  data() {
    return {
      errors: [],
      formLoading: false,
      discount_articles: [],
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
  },
  created() {
    // if (this.discount && this.discount.id) {
    // }
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
    submitForm(selected) {
      console.log('selected');
      console.log(selected);
      // if (this.formLoading) {
      //   return;
      // }

      // this.setLoading(true);
    },
  },
};
</script>

<style scoped></style>
