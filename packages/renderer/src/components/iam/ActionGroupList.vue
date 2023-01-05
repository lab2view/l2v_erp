<template>
  <div class="card m-t-5">
    <div class="card-header">
      <h5 class="mb-0">
        <button
          class="btn btn-link"
          :class="open ? '' : 'collapsed'"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse-${action.id}`"
          :aria-expanded="open"
          aria-controls="collapse11"
        >
          <i class="icofont icofont-briefcase-alt-2"></i>
          {{ action.label }}
        </button>
      </h5>
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
                v-for="act in action.actions"
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

export default {
  name: 'ActionGroupList',
  components: { ActionGroupLine },
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
    name() {
      return this.data;
    },
  },
};
</script>
