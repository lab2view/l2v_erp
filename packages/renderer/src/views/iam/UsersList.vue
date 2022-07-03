<template>
  <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('iam.user.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'iam.user.form.desc' }"
              class="btn btn-primary"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="users.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.structure') }}</th>
            <th>{{ $t('common.attributes.role') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.enterprise?.name ?? 'Principale' }}</td>
            <td>{{ user.role.label }}</td>
            <td>{{ `${user.first_name ?? ''} ${user.last_name ?? ''}` }}</td>
            <td>
              <b>{{ user.email }}</b>
            </td>
            <td>{{ user.phone }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'iam.user.form.desc',
                    params: { id: user.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deleteUser(user)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
          </tr>
        </BaseDatatable>
        <br />
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('user/getUsersList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('user', ['users', 'user']),
  },
  created() {
    if (this.user) this.$store.commit('user/SET_CURRENT_USER', null);
  },
  methods: {
    deleteUser(user) {
      if (confirm(this.$t('messages.confirmDelete', { label: user.name })))
        this.$store.dispatch('user/deleteUser', user.id);
    },
  },
};
</script>

<style scoped></style>
