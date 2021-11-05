import { GetterTree } from "vuex";
import { UserProfile, State } from "@/store/state";

export type Getters = {
  authProfile(state: State): UserProfile;
  permissions(state: State): any;
};

export const getters: GetterTree<State, State> & Getters = {
  authProfile: (state) => (state.profile ? state.profile.profile : null),
  permissions: (state) =>
    state.profile && state.profile.profile && state.profile.profile.permissions
      ? state.profile.profile.permissions
      : [],
};
