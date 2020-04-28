<template>
  <div class="col-12">
    <div class="row">
      <h1 class="col-11">{{activeBug.title}}</h1>
      <div class="col-1 mt-2">
        <div v-show="!activeBug.closed">
          <button class="btn btn-info" @click="closeBug">Status</button>
        </div>
        <!-- <div v-on:click="activeBug.closed = !activeBug.closed">open/close</div> -->
        <div v-show="activeBug.closed">•CLOSED</div>
        <div v-show="!activeBug.closed">•OPEN</div>
      </div>
      <h5 class="col-4">{{activeBug.creatorEmail}}</h5>
      <div v-show="!activeBug.closed">
        <form @submit.prevent="editBug()">
          <input class type="text" placeholder="edit bug" v-model="activeBug.description" required />
          <button type="submit">save</button>
        </form>
      </div>
      <h3 class="col-12">{{activeBug.description}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "BugInfo",
  data() {
    return {};
  },

  computed: {
    activeBug() {
      return this.$store.state.activeBug;
    }
  },
  methods: {
    closeBug() {
      if (
        confirm(
          "Once a Bug is closed it can not reopen. are you sure you want to close?"
        )
      ) {
        let activeBug = this.activeBug;
        activeBug.closed = !activeBug.closed;
        this.$store.dispatch("toggleBug", activeBug);
      }
    },
    editBug() {
      this.$store.dispatch("editBug", this.activeBug);
    }
  }
};
</script>

<style>
</style>