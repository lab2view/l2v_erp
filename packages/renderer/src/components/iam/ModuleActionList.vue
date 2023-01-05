<template>
  <div
    v-if="actions.length"
    :id="`v-pills-${module.id}`"
    class="tab-pane fade"
    :class="open ? 'active show' : ''"
    role="tabpanel"
    :aria-labelledby="`v-pills-${module.id}-tab`"
  >
    <div id="accordionoc" class="default-according style-1">
      <ActionGroupList
        v-for="(action, index) in actions"
        :key="`act-grp-${action.id}`"
        :action="action"
        :open="index === (actions.length - 1)"
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
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('role', ['searchActionsByCriteria']),
    actions() {
      return this.searchActionsByCriteria({ module_id: this.module.id });
    }
  },
};
</script>
