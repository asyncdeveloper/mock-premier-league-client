<template>
  <div>
    <b-container class="bv-example-row mt-5">
      <b-row>
        <b-col>
          <router-link  to="/fixtures">
            <b-button pill variant="primary" >Show Fixtures</b-button>
          </router-link>
        </b-col>
        <b-col>
          <router-link  to="/teams">
            <b-button pill variant="primary" >Show Teams</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {}
</script>
