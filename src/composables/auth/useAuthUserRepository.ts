import { _axios, CancelToken } from "@/plugins/axios";
import { ref } from "vue";
import store from "@/store";
import router from "@/router";
import { removeToken, removeRefreshToken } from "./useAuthRepository";
import { ActionTypes, MutationType } from "@/store/modules/profile";

export default function useAuthUserRepository() {
  let cancel;
  const finished = ref<{
    valueOf: () => Boolean;
  }>(false);
  // const finished = ref<Boolean>(false);
  const myProfile = async (url: string) => {
    return await _axios
      .get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(async (response: any) => {
        console.log(response.data.user);
        await store.dispatch(ActionTypes.CHANGE, {
          key: MutationType.DELETE,
          data: response.data.user,
        });
        return await new Promise((resolve) => {
          resolve(response.data);
        });
      })
      .catch(async (response: any) => {
        return await new Promise((resolve, reject) => {
          reject(response.data);
        });
      })
      .finally(() => {
        setTimeout(() => {
          finished.value = true;
        }, 100);
      });
  };

  /**
   * To logout the user and redirect to login page.
   */
  const logOutUser = (socket_id: string) => {
    return _axios({
      url: "logout",
      method: "POST",
      data: { socket_id },
    }).finally(() => {
      removeToken();
      removeRefreshToken();
      store.dispatch("profile/delete");
      router.push("/");
      return new Promise((resolve) => {
        resolve(true);
      });
    });
  };

  return { myProfile, finished, logOutUser };
}
