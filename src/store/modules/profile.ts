// define your typings for the store state
export interface UserProfile {
  id: number;
  email: string;
  name: string;
  [key: string]: any;
}

export interface StateProfile {
  profile: UserProfile | null;
}

const state: StateProfile = {
  profile: null,
};

const actions = {
  set({ commit }, { data }) {
    commit("change", { data });
  },
  update({ commit }, { key, value }) {
    commit("update", { key, value });
  },
  mix({ commit }, { value }) {
    commit("mix", { value });
  },
  delete({ commit }) {
    commit("delete");
  },
};

const mutations = {
  change(state: StateProfile, { data }) {
    state.profile = data;
  },
  update(state: StateProfile, { key, value }) {
    helper.setProp(state.profile, key, value, true);
  },
  mix(state: StateProfile, { value }) {
    state.profile = { ...state.profile, ...value };
  },
  delete(state: StateProfile) {
    state.profile = null;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
