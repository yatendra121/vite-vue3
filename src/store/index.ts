import { InjectionKey } from "vue";
import {
  createStore,
  createLogger,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import profile from "./modules/profile";
import { Mutations, Actions } from "./modules/profile";
import { getters, Getters } from "./getters";
import { StateProfile, state } from "@/store/state";

// define your typings for the store state
export interface State {
  count: number;
}

// store.ts
export const store = createStore<StateProfile>({
  plugins: [createLogger()],
  //state: state,
  // mutations: {},
  // actions: {},
  modules: { profile },
  getters,
});

export function useStore() {
  return store as Store;
}

export type Store = Omit<
  VuexStore<StateProfile>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export default store;
