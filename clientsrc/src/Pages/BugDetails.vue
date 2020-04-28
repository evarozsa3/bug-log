<template>
  <div class="container-fluid">
    <div class="row border bugDetes my-5 mx-2">
      <bug-info></bug-info>
    </div>
    <div class="row ml-3">
      <add-note></add-note>
      <note
        class="col-12 border noteList mt-3"
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
.bugDetes {
  background-color: rgba(34, 35, 105, 0.267);
  box-shadow: 0px 0px 5px 2px rgba(248, 248, 248, 0.603);
}
.noteList {
  background-color: rgba(62, 177, 129, 0.397);
  font-family: monospace;
  font-size: 15px;
}
</style>