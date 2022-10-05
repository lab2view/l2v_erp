<template>
  <router-view :user="user" />
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>
            {{ `${$t('iam.user.privileges')} - ${fullName}` }}
          </h6>
        </div>
        <div
          v-if="$route.name === 'iam.user.form.privileges'"
          class="col-sm-auto align-items-end"
        >
          <BaseButton
            type="button"
            class="btn btn-sm btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedUserPrivileges"
          />
          <router-link
            :to="{
              name: 'iam.user.form.privileges.form',
              params: $route.params,
              query: $route.query,
            }"
            class="btn btn-sm btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive mb-3">
        <table class="table">
          <thead>
            <tr>
              <th :title="$t('common.select_all')">
                <div
                  class="checkbox"
                  :class="
                    partialSelect
                      ? 'checkbox-solid-success'
                      : 'checkbox-primary'
                  "
                >
                  <input
                    id="checkbox-primary-1"
                    v-model="selectAll"
                    type="checkbox"
                  />
                  <label
                    class="m-0 pt-0 pb-0 p-l-5"
                    for="checkbox-primary-1"
                    style="padding-left: 60px"
                  >
                    {{
                      `${$t('iam.privilege.listTitle')} ${countSelected}`
                    }}</label
                  >
                </div>
              </th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ActionLineSelectable
              v-for="(userPrivilege, index) in userPrivileges"
              :key="`usr-p-${index}`"
              :model="userPrivilege"
              :selected-list="selected"
              remove-dispatch-name="user/removeUserPrivileges"
              @deleted="selected = []"
              @selected="selectUserPrivilege(userPrivilege, true)"
              @unselected="selectUserPrivilege(userPrivilege, false)"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div class="row justify-content-end">
        <BaseButton
          :text="$t('common.prev')"
          class="btn btn-secondary col-auto m-r-5"
          type="button"
          @click.prevent="$router.push({ name: 'iam.user.form.desc' })"
        />
        <BaseButton
          :text="$t('common.next')"
          class="btn btn-primary col-auto"
          icon="fa fa-save"
          @click.prevent="
            $router.push({
              name: 'iam.users',
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import ActionLineSelectable from '/@/components/iam/ActionLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'UserFormPrivilegesList',
  components: { ActionLineSelectable, BaseButton },
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    fullName() {
      return [this.user.last_name, this.user.first_name].join(' ');
    },
    haveUser() {
      return !!this.user;
    },
    userPrivileges() {
      return this.haveUser ? this.user.privileges : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.userPrivileges.length
      );
    },
    selectedAllUserPrivileges() {
      if (this.userPrivileges.length)
        return this.selected.length === this.userPrivileges.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllUserPrivileges;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.userPrivileges.forEach((ag) => result.push(ag.id));
          this.selected = result;
        }
      },
    },
    isSelected() {
      return this.selected.length > 0;
    },
    countSelected() {
      return this.isSelected ? `( ${this.selected.length} )` : '';
    },
  },
  methods: {
    selectUserPrivilege(userPrivilege, adding) {
      if (adding) this.selected.push(userPrivilege.id);
      else {
        this.selected = this.selected.filter((id) => id !== userPrivilege.id);
      }
    },
    deleteSelectedUserPrivileges() {
      if (
        this.selected.length &&
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.$t('common.deleted_selection'),
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('user/removeUserPrivileges', this.selected)
          .finally(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>

<style scoped></style>
