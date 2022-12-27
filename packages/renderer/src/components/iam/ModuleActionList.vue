<template>
  <div
    :id="`v-pills-${module.id}`"
    class="tab-pane fade"
    role="tabpanel"
    :aria-labelledby="`v-pills-${module.id}-tab`"
  >
    <div id="accordionoc" class="default-according style-1">
      <ActionGroupList
        v-for="action in actions"
        :key="`act-grp-${action.id}`"
        :action="action"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import ActionGroupList from '/@/components/iam/ActionGroupList.vue';

export default {
  name: 'ModuleActionList',
  components: { ActionGroupList },
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('role', ['searchActionsByCriteria']),
    actions() {
      return this.searchActionsByCriteria({ module_id: this.module.id });
    }
  },
};
</script>
