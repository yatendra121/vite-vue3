import main from "@/main";
import router from "@/router/index";
console.log(main.use(router));
//import render from "@/utils/render";

//render("admin-layout", router, main);

router.beforeEach((to, from, next) => {
  //next("/about");
  //alert("ok");
  // if (from && from.query.developer && !to.query.developer) {
  //   to.query.developer = 'yes'
  //   next(to)
  //   return
  // }
  // const user_id = helper.getProp(store.getters, 'authProfile.id')
  // if (!helper.getProp(to, 'meta.isPublic', false) && !user_id) {
  //   if (to.path === '/' || to.path === '/auth') {
  //     next()
  //   } else {
  //     next('/')
  //   }
  // } else {
  //   next()
  // }
});
router.push({ name: "About", params: {} });

// _axios.get("my-profile");
// alert(_axios.get("my-profile"));
