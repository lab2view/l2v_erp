<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>Liste des conditionnements</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'config.product.package.form' }"
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            Ajouter
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <BaseDatatable :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>Code</th>
          <th>Libelle</th>
          <th>Actions</th>
        </template>
        <tr v-for="pack in packages" :key="pack.id">
          <td>{{ pack.id }}</td>
          <td>{{ pack.code }}</td>
          <td>{{ pack.label }}</td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              title="Modifier"
              @click.prevent="
                $router.push({
                  name: 'config.product.package.form',
                  params: { id: pack.id },
                })
              "
            >
              Modifier
            </button>
            <button
              v-if="!pack.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              title="Supprimer"
              @click.prevent="deletePackage(pack)"
            >
              <i class="fa fa-trash-o" />
            </button>
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../../store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('packageConfig/getPackageList', {
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
    ...mapGetters('packageConfig', ['packages']),
  },
  methods: {
    deletePackage(pack) {
      if (confirm(`Voulez-vous supprimer ${pack.label} ?`))
        this.$store.dispatch('packageConfig/deletePackage', pack.id);
    },
  },
};
</script>

<style scoped></style>
