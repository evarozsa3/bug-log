<template>
  <div class="col-12">
    <div class="row">
      <h1 class="col-11">{{activeBug.title}}</h1>
      <div class="col-1 mt-2">
        <div v-show="!activeBug.closed">
          <button class="btn btn-info" @click="closeBug">Status</button>
        </div>
        <!-- <div v-on:click="activeBug.closed = !activeBug.closed">open/close</div> -->
        <div class="close" v-show="activeBug.closed">•CLOSED</div>
        <div class="open" v-show="!activeBug.closed">•OPEN</div>
      </div>
      <div class="col-12" v-show="!activeBug.closed">
        <form @submit.prevent="editBug()">
          <input class type="text" placeholder="edit bug" v-model="activeBug.description" required />
          <button type="submit">save</button>
        </form>
      </div>
      <p class="col-12 des">{{activeBug.description}}</p>
      <p class="col-12 text-right email">{{activeBug.creatorEmail}}</p>
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
.close {
  color: rgb(255, 6, 6);
  text-shadow: 2px 2px 10px rgb(158, 167, 185);
}
.des {
  font-size: 20px;
  font-family: monospace;
}
.email {
  font-size: 15px;
  font-weight: bolder;
  font-family: serif;
}
</style>