import { _axios, CancelToken } from "@/plugins/axios";
import { ref } from "vue";
import store from "@/store";
import router from "@/router";
import { setToken, setRefreshToken, removeToken, removeRefreshToken } from "./useAuthRepository";
import { ActionTypes } from "@/store/modules/profile";
import { AxiosSuccessResponse, AxiosErrorResponse, LoginResponse } from "@/types/response";
import { UserProfile } from "@/store/state";

export default function useAuthUserRepository() {

  let cancel;
  const finished = ref<{
    valueOf: () => Boolean;
  }>(false);
  // const finished = ref<Boolean>(false);

  /**
   * To get my profile data and store in state.
   */
  const myProfile = async (url: string) => {
    return await _axios
      .get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(async (response: AxiosSuccessResponse) => {
        await userProfileStore(response.data.user)

        userProfileAuthStore(response)

        return await new Promise((resolve) => {
          resolve(response.data);
        });
      })
      .catch(async (response: AxiosErrorResponse) => await new Promise((resolve, reject) => {
        reject(response.data);
      }))
      .finally(() => {
        setTimeout(() => {
          finished.value = true;
        }, 100);
      });
  };

  /**
   * To store user profile into state.
   */
  const userProfileStore = async (userProfile:UserProfile) => {
    await store.dispatch(ActionTypes.CHANGE, {
      key: ActionTypes.CHANGE,
      data: userProfile,
    });    
  }

    /**
   * To store auth into cookie.
   */
     const userProfileAuthStore = (response:AxiosSuccessResponse) => {
      setToken(response.token,'test','localhost')
      setRefreshToken(response.token,'test','localhost')
    }

  /**
   * To login user and set data into state.
   */
  const loginUser = async (url: string,requestData: Object) => {
    return await _axios
      .post(url, requestData,  {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      })
      .then(async (response: AxiosSuccessResponse) => {
        await userProfileStore(response.data.user)
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

  return { myProfile, finished, logOutUser,userProfileStore };
}
