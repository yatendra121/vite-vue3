import { _axios, CancelToken } from "@/plugins/axios";
import { ref } from "vue";
import store from "@/store";
import router from "@/router";
import { removeToken, removeRefreshToken } from "./useAuthRepository";

export default function useAuthUserRepository() {
  let cancel;
  const finished = ref(false);
  const myProfile = async (url: string) => {
    return await _axios
      .get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(async (response: any) => {
        await store.dispatch("profile/set", { data: response.data.user });
        return new Promise((resolve) => {
          resolve(response.data);
        });
      })
      .catch((response: any) => {
        return new Promise((resolve, reject) => {
          reject(response.data);
        });
      })
      .finally(() => {
        finished.value = true;
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
