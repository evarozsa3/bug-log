import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug
    },
    setNotes(state, notes) {
      (state.notes = notes)
    }

  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },


    async getBugs({ commit, dispatch }) {
      console.log("im in the bugs")
      api.get('bugs')
        .then(res => {
          commit('setBugs', res.data)
        })
    },
    async getActiveBug({ commit, dispatch }, bugId) {
      console.log("im bug details")
      api.get('bugs/' + bugId)
        .then(res => {
          commit('setActiveBug', res.data)
        })
    },

    async addBug({ commit, dispatch }, bugData) {
      console.log("added bug")
      api.post('bugs/', bugData)
        .then(serverBoard => {
          dispatch('getBugs', bugData.bugId)
          console.log("added Bug 2")
        })
    },
    deleteBug({ commit, dispatch }, bugId) {
      api.delete('bugs/' + bugId)
        .then(serverBoard => {
          dispatch('getBugs')
        })
    },
    toggleBug({ commit, dispatch }, activeBug) {
      api.put('bugs/' + activeBug.id, activeBug)
        .then(serverBoard => {
          commit('setActiveBug', activeBug)
          commit('setBugs', activeBug)
          console.log('made it to toggle bug')
        })
    },

    async getNotes({ commit, dispatch }, bugId) {
      console.log("Getting notes")
      api.get('bugs/' + bugId + '/notes')
        .then(res => {
          commit('setNotes', res.data)
          console.log("i maybe an here")
        })

    },
    async addNote({ commit, dispatch }, noteData) {
      console.log(noteData)
      api.post('bugs/' + noteData.bugId + '/notes', noteData)
        .then(serverBoard => {
          dispatch('getNotes', noteData.bugId)
          console.log("Notes Data too")
        })
    },
    deleteNote({ commit, dispatch }, noteData, bugId) {
      api.delete('bugs/' + 'bugId/' + 'notes/' + noteData.id)
        .then(serverBoard => {
          dispatch('getNotes', noteData.bugId)
          console.log("deleteNote")
        })
    },
    // deleteComment({ commit, dispatch }, commentData) {
    //   api.delete('comments/' + commentData.id)
    //     .then(serverBoard => {
    //       dispatch('getComments', commentData.taskId)
    //     })
    // },

  }
});
