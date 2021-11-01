export interface UserProfile {
  id: number;
  email: string;
  name: string;
  [key: string]: any;
}
export type Getters = {
  authProfile(state: UserProfile): UserProfile;
  permissions(state: any): any;
};

const getters: Getters = {
  authProfile: (state: UserProfile) =>
    state.profile ? state.profile.profile : null,
  permissions: (state: any) =>
    state.profile && state.profile.profile && state.profile.profile.permissions
      ? state.profile.profile.permissions
      : [],
};
export default getters;
