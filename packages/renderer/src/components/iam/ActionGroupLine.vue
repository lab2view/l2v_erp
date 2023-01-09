<template>
  <tr>
    <td>{{ action.label }}</td>
    <td class="text-center p-b-0 p-t-5" style="width: 130px">
      <BaseSwitchInput v-model="activated" :with-change-style="true" />
    </td>
    <td style="width: 150px">
      <code :class="stateClass">{{ stateText }}</code>
    </td>
  </tr>
</template>
<script>
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ActionGroupLine',
  components: { BaseSwitchInput },
  props: {
    action: {
      type: Object,
      required: true,
    },
    parentCode: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters('role', ['isGrantedAction', 'getPrivilegeByCode', 'role']),
    privilege() {
      return this.getPrivilegeByCode(this.action.code);
    },
    activated: {
      get() {
        return this.isGrantedAction(this.privilege, this.parentCode);
      },
      set(value) {
        const privilege = this.privilege ?? {
          id: null,
          role_id: this.role.id,
          action_id: this.action.id,
          action: this.action,
        };
        if (value) {
          this.$store.commit('role/TEMP_ADD_ROLE_PRIVILEGE', privilege);
        } else {
          this.$store.commit('role/TEMP_REMOVE_ROLE_PRIVILEGE', privilege);
        }
      },
    },
    stateClass() {
      return this.activated ? '' : 'text-danger';
    },
    stateText() {
      return this.activated
        ? this.$t('iam.privilege.granted')
        : this.$t('iam.privilege.denied');
    },
  },
};
</script>
