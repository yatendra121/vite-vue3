import { GetterTree } from "vuex";
import { UserProfile, StateProfile } from "@/store/state";

export type Getters = {
  authProfile(state: StateProfile): UserProfile;
  permissions(state: StateProfile): any;
};

export const getters: GetterTree<StateProfile, StateProfile> & Getters = {
  authProfile: (state) => (state.profile ? state.profile.profile : null),
  permissions: (state) =>
    state.profile && state.profile.profile && state.profile.profile.permissions
      ? state.profile.profile.permissions
      : [],
};
