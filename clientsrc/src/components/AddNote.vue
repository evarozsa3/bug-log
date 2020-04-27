<template>
  <div>
    <form class @submit.prevent="addNote">
      <input
        class="pl-1 inputNote"
        type="text"
        placeholder="add note..."
        v-model="newNote.content"
        required
      />
    </form>
    <!-- <p>{{newNote.bug}}</p> -->
    <p>NEW NOTE:{{newNote.content}}</p>
  </div>
</template>

<script>
export default {
  name: "addNote",
  data() {
    return {
      newNote: {
        content: "",
        bug: this.$route.params.bugId
      }
    };
  },
  methods: {
    addNote() {
      this.newNote.bugId = this.$route.params.bugId;
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = { content: "", bug: this.$route.params.bugId };
    }
  }
};
</script>

<style>
</style>