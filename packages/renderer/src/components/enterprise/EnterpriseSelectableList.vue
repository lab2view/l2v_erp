<template>
  <div class="card">
    <EnterpriseSelectableColumn
      v-for="enterprise in sourceEnterprises"
      :key="enterprise.id"
      :enterprise="enterprise"
      :selected-list="selected"
      @selected="selectEnterprise(enterprise, true)"
      @unselected="selectEnterprise(enterprise, false)"
    />
  </div>
</template>

<script>
import EnterpriseSelectableColumn from '/@/components/enterprise/EnterpriseSelectableColumn.vue';

export default {
  components: {
    EnterpriseSelectableColumn,
  },

  props: {
    sourceEnterprises: {
      type: Array,
      default: null,
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      selected: [],
    };
  },
  computed: {
    isSelected() {
      return this.selected.length > 0;
    },
  },
  methods: {
    submitSelectedForm() {
      if (this.selected.length > 0) {
        this.loading = true;
        this.submitStoreAction(this.selected)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    },
    selectEnterprise(enterprise, adding) {
      if (adding) this.selected.push({ id: enterprise.id });
      else this.selected = this.selected.filter((s) => s.id !== enterprise.id);
    },
  },
};
</script>

<style scoped></style>
