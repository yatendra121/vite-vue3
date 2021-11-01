import { _axios, CancelToken } from "@/plugins/axios";
import { ref } from "vue";
import store from "@/store";
export default function useDatatableAxiosRepository() {
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

  return { myProfile, finished };
}
