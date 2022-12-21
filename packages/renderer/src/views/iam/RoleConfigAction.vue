<template>
  <BaseModal :title="action.label" modal-size="lg">
    <div class="card-body p-1">
      <div class="row">
        <div class="col-md-4 p-r-0">
          <div class="card card-absolute p-0">
            <div class="card-header pt-1 pb-2 bg-primary">
              <span class="text-white f-12 f-w-600">{{ action.code }}</span>
            </div>
            <div class="card-body">
              <p>{{ action.description }}</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card p-0">
            <div class="card-header p-2 b-b-info">
              <h6>{{ $t('iam.action.sub_action') }}</h6>
            </div>
            <div class="card-body p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">
                      {{ $t('common.headers.privilege') }}
                    </th>
                    <th scope="col">{{ $t('common.actions') }}</th>
                  </tr>
                </thead>
                <tbody v-if="action.actions.length">
                  <tr
                    v-for="(act, index) in action.actions"
                    :key="`act-${act.id}`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ act.label }}</td>
                    <td></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr class="text-center">
                    <td colspan="3">{{ $t('common.empty_list') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <BaseButton
        type="button"
        class="btn btn-secondary m-r-5"
        :text="$t('common.close')"
        @click.prevent="$router.back()"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoleConfigAction',
  components: { BaseButton, BaseModal },
  computed: {
    ...mapGetters('role', ['action']),
  },
};
</script>

<style scoped></style>
