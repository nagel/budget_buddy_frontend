<template>
  <div class="login">
    <div class="container">
      <div class="card card-login mx-auto mt-5">
        <div class="card-header">Budget Buddy</div>
        <div class="card-body">
          <form v-on:submit.prevent="submit();">
            <h1>Login</h1>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <!-- Email -->
            <!-- ----------------------------------------------- -->
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                placeholder="Email address"
                required="required"
                autofocus="autofocus"
                v-model="email"
              />
            </div>
            <!-- ----------------------------------------------- -->

            <!-- Password -->
            <!-- ----------------------------------------------- -->
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required="required"
                v-model="password"
              />
            </div>
            <!-- ----------------------------------------------- -->
            <div class="form-group">
              <div class="checkbox">
                <label> <input type="checkbox" value="remember-me" /> Remember Password </label>
              </div>
            </div>
            <input type="submit" class="btn btn-primary btn-block" value="Submit" />
            <div class="text-center">
              <a class="d-block small mt-3" href="/#/signup">Register an Account</a>
              <a class="d-block small" href="forgot-password.html">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:3000/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
