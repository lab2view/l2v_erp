<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form
                class="theme-form login-form"
                :class="domainError ? 'was-validated' : ''"
                @submit.prevent="handleFindWorkspace"
              >
                <h4>Rechercher l'espace de travail</h4>
                <div class="form-group mt-3">
                  <label class="col-form-label text-capitalize"
                    >Entrer le nom de l'entreprise</label
                  >
                  <div class="input-group is-invalid">
                    <input
                      v-model="domain"
                      class="form-control invalid"
                      type="text"
                      required
                      placeholder="domain"
                    />
                    <span class="input-group-text">.kitbussiness.com</span>
                  </div>
                  <span v-if="domainError" class="invalid-feedback">
                    {{ domainError }}
                  </span>
                </div>
                <div class="form-group">
                  <BaseButton
                    :loading="loading"
                    :text="$t('common.find')"
                    class="btn btn-primary btn-block"
                    icon="fa fa-search"
                  />
                </div>
                <div v-if="canShowWorkspaces" class="login-social-title">
                  <h5>Choisir un espace existant</h5>
                </div>
                <div v-if="canShowWorkspaces" class="form-group">
                  <ul class="">
                    <li v-for="workspace in workspaces" :key="workspace.id">
                      <div class="card shadow-sm">
                        <div class="job-search">
                          <div class="card-body p-2">
                            <div class="media">
                              <a
                                class="img-60"
                                href="#"
                                @click.prevent="
                                  $store.dispatch(
                                    'workspace/findWorkspaceById',
                                    workspace.id
                                  )
                                "
                              >
                                <img
                                  class="img-40 img-fluid m-r-20"
                                  :src="workspace.logo_url"
                                  alt=""
                                />
                              </a>
                              <div class="media-body">
                                <a
                                  href="#"
                                  @click.prevent="
                                    $store.dispatch(
                                      'workspace/findWorkspaceById',
                                      workspace.id
                                    )
                                  "
                                >
                                  <h6 class="f-w-600">
                                    {{ workspace.name
                                    }}<span
                                      class="badge badge-secondary pull-right"
                                      >Open</span
                                    >
                                  </h6>
                                  <p>{{ workspace.domain }}</p>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- page-wrapper end-->
</template>

<script>
import { string, object } from 'yup';
import { useStore, mapGetters } from 'vuex';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'Workspace',
  components: { BaseButton },
  setup() {
    const store = useStore();
    const loading = ref(false);

    const validationSchema = object({
      domain: string().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema,
    });
    const { value: domain, errorMessage: domainError } = useField('domain');

    const handleFindWorkspace = handleSubmit((values) => {
      loading.value = true;
      store
        .dispatch(
          'workspace/findWorkspaceByDomain',
          `${values.domain}.${store.state.landlordDomain}`
        )
        .catch((error) => {
          console.log(error);
          loading.value = false;
        });
    });

    return {
      handleFindWorkspace,
      domain: domain,
      domainError: domainError,
      loading,
    };
  },

  computed: {
    ...mapGetters('workspace', ['workspaces']),
    canShowWorkspaces() {
      return this.workspaces.length > 0;
    },
  },
};
</script>

<style scoped></style>
