<template>
  <div class="container-fluid">
    <div class="row border my-2 mx-2">
      <bug-info></bug-info>
    </div>
    <div class="row ml-3">
      <add-note></add-note>
      <note
        class="col-12 border mt-3"
        v-for="noteInfo in noteItems"
        :noteData="noteInfo"
        :key="noteInfo.id"
      ></note>
    </div>
  </div>
</template>

<script>
import BugInfo from "../components/BugInfo.vue";
import Note from "../components/Note.vue";
import AddNote from "../components/AddNote.vue";
export default {
  name: "BugDetails",
  data() {
    return {};
  },
  computed: {
    bugInfo() {
      return this.$store.state.activebug;
    },
    noteItems() {
      return this.$store.state.notes;
    }
  },
  mounted() {
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  },
  components: {
    BugInfo,
    Note,
    AddNote
  }
};
</script>

<style>
</style>