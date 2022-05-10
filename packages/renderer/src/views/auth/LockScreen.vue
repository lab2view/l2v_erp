<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form class="theme-form login-form">
                <h4>unlock</h4>
                <div class="form-group">
                  <label class="col-form-label">Enter your Password</label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="icon-email"></i
                    ></span>
                    <input
                      class="form-control"
                      type="password"
                      name="login[password]"
                      required=""
                      placeholder="*********"
                    />
                    <div class="show-hide"><span class="show"> </span></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="checkbox p-0">
                    <input id="checkbox1" type="checkbox" />
                    <label class="text-muted" for="checkbox1"
                      >Remember password</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary btn-block"
                    type="submit"
                    @click.prevent="$router.back()"
                  >
                    Unlock
                  </button>
                </div>
                <p>
                  Already have an account?<a
                    class="ms-2"
                    href="#"
                    @click.prevent="$router.push({ name: 'login' })"
                    >Sign in
                  </a>
                </p>
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
export default {};
</script>

<style scoped></style>
