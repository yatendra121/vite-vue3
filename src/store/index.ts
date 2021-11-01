import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import profile from "./modules/profile";
import getters from "./getters";

// define your typings for the store state
export interface State {
  count: number;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

// store.ts
const store = createStore<State>({
  state: {
    count: 0,
  },
  mutations: {},
  actions: {},
  modules: { profile },
  getters,
});

export default store;
