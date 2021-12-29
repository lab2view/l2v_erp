<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form
                class="theme-form login-form was-validated"
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
                      class="form-control"
                      type="text"
                      placeholder="domain"
                      required
                    />
                    <span class="input-group-text">.kitbussiness.com</span>
                  </div>
                  <span v-if="domainError" class="invalid-feedback">
                    {{ domainError }}
                  </span>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">
                    Rechercher
                  </button>
                </div>
                <p>Choisir un espace existant ?</p>
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
import { string, object } from "yup";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const validationSchema = object({
      domain: string().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema,
    });
    const { value: domain, errorMessage: domainError } = useField("domain");

    const handleFindWorkspace = handleSubmit((values) => {
      store
        .dispatch(
          "workspace/findWorkspaceByDomain",
          `${values.domain}.${store.state.landlordDomain}`
        )
        .then(() => {
          router.push({ name: "login" });
        });
    });

    return {
      handleFindWorkspace,
      domain: domain,
      domainError: domainError,
    };
  },
};
</script>

<style scoped></style>
