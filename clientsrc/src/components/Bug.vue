<template>
  <div class="row m-1 border">
    <!-- <h1>I am A bug</h1> -->
    <!-- <h3 class="col-3">{{bugData.title}}:</h3> -->
    <router-link
      class="col-3 link text-dark"
      :to="{name: 'BugDetails', params: {bugId: bugData.id}}"
    >{{bugData.title}}:</router-link>
    <!-- <h5 class="col-10">{{bugData.creatorEmail}}</h5> -->
    <p class="col-8 pt-2 why">{{bugData.description}}</p>
    <div class="col-1 pl-5">
      <button class="btn" @click="deleteBug(bugData.id)">
        <h4 class="text-danger">X</h4>
      </button>
    </div>
    <h5 class="col-9">{{bugData.closed}}</h5>
    <p class="col-9">Closed date: {{bugData.closedDateAt}}</p>
    <p class="col-9 pt-1">Last Update: {{bugData.updatedAt}}</p>

    <!-- <div class="col-2 align-right text-right">
      <button class="btn btn-info" @click="deleteBug(bug.id)">
        <h4 class="text-success">X</h4>
      </button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "Bug",
  props: ["bugData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteBug(bugId) {
      if (confirm("are you sure?")) {
        this.$store.dispatch("deleteBug", bugId);
      }
    }
  }
};
</script>

<style>
.link {
  font-size: 30px;
}
.why {
  font-size: 20px;
}
</style>