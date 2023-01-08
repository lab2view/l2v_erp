<template>
  <div class="card m-t-5">
    <div class="card-header">
      <div class="row align-content-center">
        <div class="col-auto">
          <BaseSwitchInput
            v-model="handleActionGroup"
            :icon-state="!actionState.partial_granted"
            :with-change-style="!actionState.partial_granted"
          />
        </div>
        <div class="col">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              :class="open ? '' : 'collapsed'"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${action.id}`"
              :aria-expanded="open"
              aria-controls="collapse11"
            >
              {{ action.label }}
            </button>
          </h5>
        </div>
      </div>
    </div>
    <div
      :id="`collapse-${action.id}`"
      class="collapse"
      :class="open ? 'show' : ''"
      :aria-labelledby="`collapse-${action.id}`"
      data-bs-parent="#accordionoc"
      style=""
    >
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-bordered">
            <tbody>
              <ActionGroupLine
                v-for="act in exec_actions"
                :key="`act-lne-${act.id}`"
                :action="act"
                :parent-code="action.code"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActionGroupLine from '/@/components/iam/ActionGroupLine.vue';
import { privilegeExtension } from '/@/helpers/codes';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ActionGroupList',
  components: { BaseSwitchInput, ActionGroupLine },
  props: {
    action: {
      type: Object,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('role', ['role', 'actionGroupState', 'getPrivilegeByCode']),
    name() {
      return this.data;
    },
    exec_actions() {
      return this.action.actions.filter(
        (act) =>
          !act.code.includes(privilegeExtension.forceDelete) &&
          !act.code.includes(privilegeExtension.restore)
      );
    },
    actionState() {
      return this.actionGroupState(this.action);
    },
    privilege() {
      return this.getPrivilegeByCode(this.action.code);
    },
    handleActionGroup: {
      get() {
        return this.actionState.granted;
      },
      set(value) {
        const privilege = this.privilege ?? {
          id: null,
          role_id: this.role.id,
          action_id: this.action.id,
          action: this.action,
        };
        if (value)
          this.$store.commit('role/TEMP_ADD_ROLE_PRIVILEGE', privilege);
        else this.$store.commit('role/TEMP_REMOVE_ROLE_PRIVILEGE', privilege);
      },
    },
  },
};
</script>
