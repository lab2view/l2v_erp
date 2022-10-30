<template>
  <div class="page-main-header" :class="sliderMenuClass">
    <div class="main-header-right row m-0">
      <div class="main-header-left">
        <div class="logo-wrapper">
          <a href="/" class="text-dark f-16 f-w-500"
            ><img
              alt=""
              width="30"
              height="90"
              class="img-fluid m-r-5"
              src="../../assets/images/logo/logo.jpg"
            />
            {{ enterpriseName.toString().toUpperCase() }}
          </a>
        </div>
        <div class="dark-logo-wrapper">
          <a href="/" class="text-light f-16 f-w-500"
            ><img
              alt=""
              width="30"
              height="90"
              class="img-fluid"
              src="../../assets/images/logo/dark-logo.jpg"
            />
            {{ enterpriseName.toString().toUpperCase() }}
          </a>
        </div>
        <div class="toggle-sidebar">
          <i
            id="sidebar-toggle"
            class="status_toggle middle"
            data-feather="align-center"
          ></i>
        </div>
      </div>
      <div class="left-menu-header col">
        <ul class="row">
          <li class="col">
            <form
              class="form-inline search-form"
              @submit.prevent="searchArticles"
            >
              <div class="search-bg">
                <i class="fa fa-search"></i>
                <BaseInput
                  v-model="searchKeyword"
                  type="text"
                  placeholder="Chercher ici ..."
                  @keydown.enter="searchArticles"
                />
              </div>
            </form>
            <span class="d-sm-none mobile-search search-bg"
              ><i class="fa fa-search"></i
            ></span>
          </li>
          <li v-if="isSaleSession" class="col-auto d-none d-sm-block">
            <a href="#" class="f-w-500" @click.prevent="openWebStore">
              <i class="fa fa-external-link m-r-5" />
              {{ $t('common.open_store') }}
            </a>
          </li>
        </ul>
      </div>
      <div class="nav-right col pull-right right-menu p-0">
        <ul class="nav-menus">
          <li
            v-if="isSaleSession"
            :title="`${cashierName} - ${cashRegisterName}`"
            class="m-0"
          >
            <i>
              <i class="fa fa-user-circle f-16 m-r-5" />
              {{ truncate(cashierName, 5) }} /
              <span class="f-w-500 f-16">
                {{ truncate(cashRegisterName.toString().toUpperCase(), 10) }}
              </span>
            </i>
          </li>
          <li
            v-if="isSaleSession"
            :title="$t('sales.session.report')"
            class="font-primary m-0 border border-primary"
            @click.prevent="
              $router.push({
                name: 'sales.session.reports',
                params: $route.params,
                query: $route.query,
              })
            "
          >
            <div class="mode">
              <i class="fa fa-table"></i>
            </div>
          </li>
          <li @click.prevent="setDarkMode">
            <div class="mode">
              <i :class="headerModeIconClass"></i>
            </div>
          </li>
          <li class="onhover-dropdown p-0">
            <button
              class="btn btn-primary-light"
              type="button"
              @click.prevent="logout"
            >
              <a href="#">
                <i data-feather="log-out"></i>
                {{ logoutText }}
                <i v-if="loading" class="fa m-l-5 fa-spin fa-spinner" />
              </a>
            </button>
          </li>
        </ul>
      </div>
      <div class="d-lg-none mobile-toggle pull-right w-auto">
        <i data-feather="more-horizontal"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SaleSessionMixin from '/@/mixins/SaleSessionMixin';
import BaseInput from '/@/components/common/BaseInput.vue';
import FilterMixin from '/@/mixins/FilterMixin.js';

export default defineComponent({
  name: 'Header',
  components: { BaseInput },
  mixins: [SaleSessionMixin, FilterMixin],
  data() {
    return {
      dark_mode: false,
      loading: false,
      searchKeyword: null,
    };
  },
  computed: {
    ...mapGetters('workspace', [
      'currentWorkspace',
      'workspaceExternalShopLink',
    ]),
    ...mapGetters('auth', ['currentUser']),
    enterpriseName() {
      return this.currentUser?.enterprise?.name ?? this.currentWorkspace.name;
    },
    logoutText() {
      return this.isSaleSession ? 'Fermer la session' : 'Deconnexion';
    },
    headerModeIconClass() {
      return this.dark_mode ? 'fa fa-lightbulb-o' : 'fa fa-moon-o';
    },
  },
  mounted() {
    setTimeout(() => window.feather?.replace(), 1000);
  },
  methods: {
    setDarkMode() {
      if (this.dark_mode) $('body').removeAttr('class', 'dark-only');
      else $('body').attr('class', 'dark-only');
      this.dark_mode = !this.dark_mode;
    },
    logout() {
      if (confirm('Do you realy want to logout?')) {
        this.loading = true;
        if (this.$route.meta.requireCashierSession)
          this.$store.dispatch('cashier_session/closeSession');
        else this.$store.dispatch('auth/logout');
      }
    },
    searchArticles() {
      if (this.$route.meta.requireCashierSession) {
        if (this.searchKeyword)
          this.$router.push({
            name: 'sales.session.finder',
            query: { keyword: this.searchKeyword },
          });
      }
    },
    openWebStore() {
      window.ipcRenderer.send('open-navigator', {
        external_link: this.workspaceExternalShopLink,
      });
    },
  },
});
</script>

<style scoped></style>
