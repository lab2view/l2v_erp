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
            />{{ enterpriseName.toString().toUpperCase() }}
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
        <ul>
          <li>
            <form class="form-inline search-form">
              <div class="search-bg">
                <i class="fa fa-search"></i>
                <input
                  class="form-control-plaintext"
                  placeholder="Search here....."
                />
              </div>
            </form>
            <span class="d-sm-none mobile-search search-bg"
              ><i class="fa fa-search"></i
            ></span>
          </li>
        </ul>
      </div>
      <div class="nav-right col pull-right right-menu p-0">
        <ul class="nav-menus">
          <li v-if="isSaleSession" class="">
            <i>
              <i class="fa fa-user-circle f-16 m-r-5" />
              {{ cashierName }} /
              <span class="f-w-500 f-16">{{
                cashRegisterName.toString().toUpperCase()
              }}</span>
            </i>
          </li>
          <!--          <li class="onhover-dropdown">-->
          <!--            <div class="notification-box">-->
          <!--              <i data-feather="bell"></i><span class="dot-animated"></span>-->
          <!--            </div>-->
          <!--            <ul class="notification-dropdown onhover-show-div">-->
          <!--              <li>-->
          <!--                <p class="f-w-700 mb-0">-->
          <!--                  You have 3 Notifications<span-->
          <!--                    class="pull-right badge badge-primary badge-pill"-->
          <!--                    >4</span-->
          <!--                  >-->
          <!--                </p>-->
          <!--              </li>-->
          <!--              <li class="noti-primary">-->
          <!--                <div class="media">-->
          <!--                  <span class="notification-bg bg-light-primary"-->
          <!--                    ><i data-feather="activity"> </i-->
          <!--                  ></span>-->
          <!--                  <div class="media-body">-->
          <!--                    <p>Delivery processing</p>-->
          <!--                    <span>10 minutes ago</span>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </li>-->
          <!--              <li class="noti-secondary">-->
          <!--                <div class="media">-->
          <!--                  <span class="notification-bg bg-light-secondary"-->
          <!--                    ><i data-feather="check-circle"> </i-->
          <!--                  ></span>-->
          <!--                  <div class="media-body">-->
          <!--                    <p>Order Complete</p>-->
          <!--                    <span>1 hour ago</span>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </li>-->
          <!--              <li class="noti-success">-->
          <!--                <div class="media">-->
          <!--                  <span class="notification-bg bg-light-success"-->
          <!--                    ><i data-feather="file-text"> </i-->
          <!--                  ></span>-->
          <!--                  <div class="media-body">-->
          <!--                    <p>Tickets Generated</p>-->
          <!--                    <span>3 hour ago</span>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </li>-->
          <!--              <li class="noti-danger">-->
          <!--                <div class="media">-->
          <!--                  <span class="notification-bg bg-light-danger"-->
          <!--                    ><i data-feather="user-check"> </i-->
          <!--                  ></span>-->
          <!--                  <div class="media-body">-->
          <!--                    <p>Delivery Complete</p>-->
          <!--                    <span>6 hour ago</span>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </li>-->
          <!--            </ul>-->
          <!--          </li>-->
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
              <a href="#"> <i data-feather="log-out"></i> {{ logoutText }} </a>
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

export default defineComponent({
  mixins: [SaleSessionMixin],
  data() {
    return {
      dark_mode: false,
    };
  },
  computed: {
    ...mapGetters('workspace', ['currentWorkspace']),
    ...mapGetters('auth', ['currentUser']),
    enterpriseName() {
      return this.currentUser.enterprise?.name ?? this.currentWorkspace.name;
    },
    logoutText() {
      return this.isSaleSession ? 'Fermer la session' : 'Deconnexion';
    },
    headerModeIconClass() {
      return this.dark_mode ? 'fa fa-lightbulb-o' : 'fa fa-moon-o';
    },
  },
  methods: {
    setDarkMode() {
      if (this.dark_mode) $('body').removeAttr('class', 'dark-only');
      else $('body').attr('class', 'dark-only');
      this.dark_mode = !this.dark_mode;
    },
    logout() {
      if (confirm('Do you realy want to logout?')) {
        if (this.$route.meta.requireCashierSession)
          this.$store.dispatch('cashier_session/closeSession');
        else this.$store.dispatch('auth/logout');
      }
    },
  },
});
</script>

<style scoped></style>
