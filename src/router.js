import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Category from "./views/Category.vue";
import Transactions from "./views/Transactions.vue";
import Accounts from "./views/Accounts.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/category/:id", name: "category", component: Category },
    { path: "/transactions", name: "transactions", component: Transactions },
    { path: "/accounts", name: "accounts", component: Accounts }
  ]
});
