<template>
<!--  <div class="card mb-0">-->
<!--    <form class="theme-form" @submit.prevent="submitEnterpriseIAMForm">-->
<!--      <div class="card-header pb-0">-->
<!--        <h5>{{ $t('enterprise.enterprise.iamTitle') }}</h5>-->
<!--        <span>-->
<!--          Using the <a href="#">card</a> component, you can extend the default-->
<!--          collapse behavior to create an accordion.-->
<!--        </span>-->
<!--      </div>-->
<!--      <div class="card-body">-->
<!--        <p>Just wait for IAM module</p>-->
<!--      </div>-->
<!--      <div class="card-footer">-->
<!--        <div class="row justify-content-end">-->
<!--          <BaseButton-->
<!--            :text="$t('common.cancel')"-->
<!--            class="btn btn-secondary col-auto m-r-5"-->
<!--            type="button"-->
<!--            @click.prevent="$router.push({ name: 'enterprise.form.setting' })"-->
<!--          />-->

<!--        </div>-->
<!--      </div>-->
<!--    </form>-->
<!--  </div>-->
<!--  <div class="card-header pb-0">-->
<!--    <h5>{{ $t('enterprise.enterprise.iamTitle') }}</h5>-->
<!--    <span>-->
<!--          Using the <a href="#">card</a> component, you can extend the default-->
<!--          collapse behavior to create an accordion.-->
<!--        </span>-->
<!--  </div>-->
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
              <BaseButton
                :text="$t('common.update')"
                class="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'iam.user.form.desc',
                    params: { id: user.id },
                  })
                "
              />
              <BaseButton
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                @click.prevent="deleteUser(user)"
                icon="fa fa-trash-o"
              />
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
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
export default {
  components: { BaseButton ,BaseContainer,BaseDatatable},
  beforeRouteEnter(routeTo, routeFrom, next) {
    next();
  },
  data() {
    return {
      errors: [],
    };
  },

  created() {
    if (this.user) this.$store.commit('user/SET_CURRENT_USER', null);
  },

  computed: {
    ...mapGetters('enterprise', ['enterprise']),
    ...mapGetters('user', ['users', 'user']),

    enterpriseContext() {
      return `enterprises/${this.enterprise.id}`;
    },
  },
  mounted() {
    // if (this.enterprise) {}
  },
  methods: {
    submitEnterpriseIAMForm() {
      this.$router.push({ name: 'enterprises' });
    },
    deleteUser(user) {
      if (confirm(this.$t('messages.confirmDelete', { label: user.name })))
        this.$store.dispatch('user/deleteUser', user.id);
    },
  },
};
</script>

<style scoped></style>
