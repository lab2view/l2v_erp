<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <form class="search-form">
        <div class="form-group m-0">
          <label class="sr-only">Email</label>
        </div>
        <div class="form-group mb-0">
          <div class="input-group">
            <span class="input-group-text"><i class="icon-search"></i></span>
            <input
              class="form-control-plaintext"
              type="search"
              placeholder="Search.."
            />
          </div>
        </div>
      </form>
    </div>
    <div class="card-body">
      <ul id="top-tab" class="nav nav-tabs search-list" role="tablist">
        <li class="nav-item">
          <a
            id="all-link"
            class="nav-link active"
            data-bs-toggle="tab"
            href="#all-links"
            role="tab"
            aria-selected="true"
            ><i class="icon-target"></i>All</a
          >
          <div class="material-border"></div>
        </li>
        <li class="nav-item">
          <a
            id="map-link"
            class="nav-link"
            data-bs-toggle="tab"
            href="#map-links"
            role="tab"
            aria-selected="false"
            ><i class="icon-map-alt"></i>Maps</a
          >
          <div class="material-border"></div>
        </li>
        <li class="nav-item">
          <a
            id="setting-link"
            class="nav-link"
            data-bs-toggle="tab"
            href="#setting-links"
            role="tab"
            aria-selected="false"
            ><i class="icon-settings"></i>Settings</a
          >
          <div class="material-border"></div>
        </li>
      </ul>
      <div id="top-tabContent" class="tab-content">
        <div
          id="all-links"
          class="search-links tab-pane fade active show"
          role="tabpanel"
          aria-labelledby="all-link"
        >
          <div class="row">
            <div class="col-md-auto">
              <p class="pb-4">About 6,000 results (0.60 seconds)</p>
              <div class="info-block">
                <h6>
                  Lorem Ipsum is simply dummy text of the printing industry
                </h6>
                <a href="#">vihoeducation.info/</a>
                <p>
                  viho introduces a IELTS Coaching, TOEFL Coaching, GRE
                  Coaching, GMAT Coaching, SAT Coaching in Surat.
                </p>
                <div class="star-ratings">
                  <ul class="search-info">
                    <li>2.5 stars</li>
                    <li>590 votes</li>
                    <li>Music</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
