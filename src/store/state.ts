// define your typings for the store state
export type UserProfile = {
  id: number;
  email: string;
  name: string;
  [key: string]: any;
};

export type StateProfile = {
  profile: UserProfile | null;
};

export const state: StateProfile = {
  profile: null,
};
