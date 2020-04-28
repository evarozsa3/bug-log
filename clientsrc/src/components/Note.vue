<template>
  <div class="row">
    <!-- <h2 class="col-10">hello notes</h2> -->
    <p class="col-11 email">By: {{noteData.creatorEmail}}</p>
    <!-- content of undefined? -->
    <button @click="deleteNote(noteData.id)" class="btn col-1 pl-5 email">
      <h4 class="text-danger">X</h4>
    </button>
    <p class="col-8 des">{{noteData.content}}</p>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: ["noteData"],
  data() {
    return {};
  },
  methods: {
    deleteNote(noteId) {
      if (confirm("are you sure?")) {
        this.$store.dispatch("deleteNote", this.noteData);
      }
    }
  }
};
</script>

<style>
</style>