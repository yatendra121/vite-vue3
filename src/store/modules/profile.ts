import { UserProfile, StateProfile } from "@/store/state";
import { ActionContext, ActionTree, MutationTree } from "vuex";

const state: StateProfile = {
  profile: null,
};

export enum ActionTypes {
  CHANGE = "CHANGE",
  UPDATE = "UPDATE",
  MIX = "MIX",
  DELETE = "DELETE",
}

type ActionAugments = Omit<
  ActionContext<StateProfile, StateProfile>,
  "commit"
> & {
  commit<K extends keyof Mutations>(
    key: K,
    data: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.CHANGE](context: ActionAugments, data: UserProfile): void;
  // [ActionTypes.UPDATE](context: ActionAugments): void;
  [ActionTypes.MIX](context: ActionAugments, data: UserProfile): void;
  [ActionTypes.DELETE](context: ActionAugments): void;
};

export const actions: ActionTree<StateProfile, StateProfile> & Actions = {
  async [ActionTypes.CHANGE]({ commit }, { data }) {
    commit(MutationType.CHANGE, data);
  },

  async [ActionTypes.MIX]({ commit }, { data }) {
    commit(MutationType.MIX, data.data);
  },

  async [ActionTypes.DELETE]({ commit }) {
    commit(MutationType.DELETE, null);
  },
};

export enum MutationType {
  CHANGE = "CHANGE",
  UPDATE = "UPDATE",
  MIX = "MIX",
  DELETE = "DELETE",
}

export type Mutations = {
  [MutationType.CHANGE](state: StateProfile, data: UserProfile): void;
  [MutationType.UPDATE](state: StateProfile, data: UserProfile[]): void;
  [MutationType.MIX](
    state: StateProfile,
    data: Partial<UserProfile> & { id: number }
  ): void;
  [MutationType.DELETE](state: StateProfile, data: null): void;
};

export const mutations: MutationTree<StateProfile> & Mutations = {
  [MutationType.CHANGE](state, data) {
    state.profile = data;
  },
  [MutationType.UPDATE](state, data) {
    //state.profile = data;
  },
  [MutationType.MIX](state, newItem) {
    //state.profile = { ...state.data[item], ...newItem };
  },
  [MutationType.DELETE](state, data) {
    state.profile = data;
  },
};

export default {
  state,
  mutations,
  actions,
};
function data(CHANGE: MutationType, data: any) {
  throw new Error("Function not implemented.");
}
