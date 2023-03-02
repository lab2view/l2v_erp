<template>
  <BaseContainer :module="$t('menu.modules.customers')" :title="pageTitle">
    <div class="card">
      <div class="card-body">
        <div class="row list-persons">
          <div class="col-md-6">
            <div id="v-pills-tabContent" class="tab-content">
              <div
                id="v-pills-user"
                class="tab-pane contact-tab-0 tab-content-child fade show active"
                role="tabpanel"
                aria-labelledby="v-pills-user-tab"
              >
                <div class="profile-mail pt-0">
                  <div class="media align-items-center">
                    <div class="media">
                      <img
                        class="img-100 img-fluid m-r-20 rounded-circle update_img_6"
                        src="../../assets/images/user/user.png"
                        alt=""
                      />
                      <input
                        class="updateimg"
                        type="file"
                        name="img"
                        onchange="readURL(this,6)"
                      />
                      <div class="media-body mt-0">
                        <h5>
                          <span class="first_name_6">{{
                            customer.first_name
                          }}</span>
                          <span class="last_name_6">{{ customer.name }}</span>
                        </h5>
                        <p class="email_add_6">
                          {{
                            `${customer.phone ?? ''} | ${customer.email ?? ''}`
                          }}
                        </p>
                        <ul>
                          <li>
                            <router-link
                              :to="{
                                name: 'customer.form',
                                params: { id: customer.id },
                              }"
                            >
                              {{ $t('common.update') }}
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="email-general">
                    <h6 class="mb-3">{{ customer.customer_type.label }}</h6>
                    <ul>
                      <li>
                        {{ $t('common.attributes.reference') }}
                        <span class="font-primary first_name_0">{{
                          customer.reference
                        }}</span>
                      </li>
                      <li>
                        {{ $t('common.attributes.country') }}
                        <span class="font-primary">
                          {{ customer.country.name }}
                        </span>
                      </li>
                      <li>
                        {{ $t('common.attributes.city') }}
                        <span class="font-primary city_0">
                          {{ customer.localization?.city ?? '--' }}
                        </span>
                      </li>
                      <li>
                        {{ $t('common.attributes.address') }}
                        <span class="font-primary">
                          {{ customer.localization?.address ?? '--' }}
                        </span>
                      </li>
                      <li>
                        {{ $t('common.attributes.created_at') }}
                        <span class="font-primary">
                          {{ $d(customer.created_at, 'short') }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md m-1 p-1 box-col-3 des-xl-25 rate-sec">
                <div class="card income-card card-primary font-primary">
                  <div class="card-body text-center">
                    <h5>
                      {{
                        `${(
                          customer.total_sub_price ?? 0
                        ).toFixed()} ${currency}`
                      }}
                    </h5>
                    <p>{{ $t('common.attributes.total_amount_buying') }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md m-1 p-1 box-col-3 des-xl-25 rate-sec">
                <div class="card income-card card-secondary font-secondary">
                  <div class="card-body text-center">
                    <h5>
                      {{
                        `${(
                          customer.total_discount ?? 0
                        ).toFixed()} ${currency}`
                      }}
                    </h5>
                    <p>{{ $t('common.attributes.discount') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <CustomerBuyingStats />
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import CustomerBuyingStats from '/@/components/customers/CustomerBuyingStats.vue';

export default {
  name: 'CustomerDetails',
  components: {
    CustomerBuyingStats,
    BaseContainer,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('workspace', ['currency']),
    ...mapGetters('customer', ['customer']),
    pageTitle() {
      return `${this.$t('customers.details', {
        customer: this.customer.reference,
      })}`;
    },
  },
  beforeUnmount() {
    this.$store.commit('customer/SET_CURRENT_CUSTOMER', null);
  },
  methods: {},
};
</script>

<style scoped></style>
