<template>
  <div class="col-12">
    <div class="row">
      <h1 class="col-11">{{activeBug.title}}</h1>
      <div class="col-1 mt-2">
        <button class="btn btn-info" @click="closeBug">Status</button>
        <!-- <div v-on:click="activeBug.closed = !activeBug.closed">open/close</div> -->
        <div v-show="activeBug.closed">•CLOSED</div>
        <div v-show="!activeBug.closed">•OPEN</div>
      </div>
      <h5 class="col-4">{{activeBug.creatorEmail}}</h5>
      <form>
        <input class type="text" placeholder="add note..." v-model="activeBug.description" required />
      </form>
      <h3 class="col-12">{{activeBug.description}}</h3>
      <h3 class="col-12 text-right">{{activeBug.closed}}</h3>
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
      let activeBug = this.activeBug;
      activeBug.closed = !activeBug.closed;
      this.$store.dispatch("toggleBug", activeBug);
    }
  }
};
</script>

<style>
</style>