
<template>
  <div>
    <div id="nav">
      <div class="logo-container">
        <img src="../assets/iconb.png" class="logo" />
      </div>

      <div class="nav" v-if="!$store.state.isLoggedIn">
        <router-link to="/SignUp" class="signup"> Créer un compte </router-link>
        <router-link to="/Login"> S'identifier</router-link>
      </div>
    </div>

    <div class="test">
      <form class="form" @submit.prevent="handleSubmit">
        <label> Email </label>
        <input type="email" required v-model="email" />
        <label> Mot de passe </label>
        <input type="password" required v-model="password" />
        <div v-if="error" class="error">{{ error }}</div>

        <div class="submit">
          <button @click="login">S'identifier</button>
        </div>
        <router-link to="/SignUp">
          <div><h4>Pas encore de compte? Inscrivez-vous</h4></div></router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import AuthentificationService from "../services/AuthentificationService";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: this.error,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthentificationService.login({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          email: this.email,
          password: this.password,
          error: this.error,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        const token = this.$store.state.token;
        const user = this.$store.state.user;

        const res = response.data.token;
        this.$router.push({ name: "Home" });
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
        // console.log(res)
      } catch (error) {
        this.error = error.response.data.message;
        console.log(error.response.data.message);
      }
    },
  },
};
</script>

<style>
html {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

.form {
  color: black;

  max-width: 420px;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  border: 2px solid black;
  opacity: 1;
  background-image: url("../assets/icon.png");
}
label {
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #122441;
  color: #122441;
}

button {
  background: #0f63e9;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.submit {
  text-align: center;
}

h4,
h2 {
  text-align: center;
  color: black;
}
h4:hover {
  color: crimson;
}
.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
a {
  text-decoration: none;
}

</style>