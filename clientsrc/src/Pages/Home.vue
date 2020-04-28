<template>
  <div class="home container-fluid">
    <div class="row dragon ml-5 mr-5 mt-5">
      <img class="vuelogo mt-4" alt="Vue logo" src="../assets/logo.png" />
      <!-- <img
        class="dragon"
        alt="Vue logo"
        src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/dragonfly-8955-17765-550x550.png"
      />-->
      <img class="vuelogo2 mt-4" alt="Vue logo" src="../assets/logo.png" />
      <div class="homeTitle text-warning">
        <!-- <p>WELCOME HOME</p> -->
      </div>
    </div>
    <form class="col-12" @submit.prevent="addBug">
      <input
        class="input-front"
        type="text"
        placeholder=" add bug..."
        v-model="newBug.title"
        required
      />
      <input
        class="input-front"
        type="text"
        placeholder=" description..."
        v-model="newBug.description"
      />
      <button class="btn btn-info border-dark" type="submit">+</button>
    </form>
    <div class="row">
      <div class="col-12">
        <bug class="bugList" :bugData="bugInfo" v-for="bugInfo in bugItems" :key="bugInfo.id"></bug>
      </div>
    </div>
  </div>
</template>
// i am here

<script>
import Bug from "../components/Bug.vue";
export default {
  name: "home",
  data() {
    return {
      newBug: {
        title: "",
        description: ""
      }
    };
  },
  components: {
    Bug
  },
  computed: {
    bugItems() {
      console.log("BugItems");
      return this.$store.state.bugs;
    }
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
      // this.$store.dispatch("setActiveBug", this.newBug);
      // debugger;
      // let myBug = this.$route.params.id;
      // this.$router.push("bugs/" + myBug);
    }
  }
};
</script>
<style>
.homeTitle {
  position: relative;
  font-family: monospace;
  font-size: 99px;
  margin-left: 104px;
  /* padding-left: 100px; */
  text-shadow: 2px 2px 15px black;
  z-index: 2;
}
.vuelogo {
  position: relative;
  height: 16vh;
  transform: rotate(-90deg);
  z-index: 1;
}
.vuelogo2 {
  position: relative;
  height: 16vh;

  transform: rotate(90deg);
  z-index: 1;
}
.dragon {
  background-image: url(https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/dragonfly-8955-17765-550x550.png);
  height: 32.2vh;
  background-size: contain;
  position: relative;
}
.bugList {
  background-color: rgba(47, 34, 105, 0.267);
  box-shadow: 0px 0px 5px 2px rgba(248, 248, 248, 0.603);
}
/* .home {
  background-image: url(https://lh3.googleusercontent.com/proxy/EkENFFxRVKAoeWxiItphHV5uwD5SJq96bV7IMsueTlP1ir-lASS_IRX68y4kIYzA5atYbRBTN6OkS_vqO18FY0mCI45gKB51xBhsKD961EXi_zhMcQ);
  background-size: cover;
} */
</style>
