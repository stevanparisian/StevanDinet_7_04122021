
   
<template >
  <div>
    <div id="nav">
      <div class="logo-container">
        <img src="../assets/iconb.png" class="logo" />
      </div>
      <div class="logo"></div>
      <div class="nav" v-if="!$store.state.isLoggedIn">
        <router-link to="/SignUp" class="signup"> Créer un compte </router-link>
        <router-link to="/Login"> S'identifier </router-link>
      </div>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <label> Prenom </label>
      <input type="text" required v-model="firstName" />
      <label> Nom </label>
      <input type="text" required v-model="lastName" />
      <label> Email </label>
      <input type="email" required v-model="email" />
      <label> mot de passe </label>
      <input type="password" required v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>

      <div class="submit">
        <button @click="signup">Créer un compte</button>
      </div>
      <router-link to="/Login">
        <div><h4>Vous avez déja un compte ? identifier vous</h4></div></router-link
      >
    </form>
  </div>
</template>

<script>
import AuthentificationService from "../services/AuthentificationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: this.error,
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await AuthentificationService.signup({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          error: this.error,
        });

        const res = response.data.token;
        this.$router.push({ name: "Login" });
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
html {
  /*background-image: url('../assets/icon3.png');*/
  height: 100%;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}
</style>

<style>
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
  border: 2px solid black;
  color: #132644;
}
button {
  background: #122441;
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
  color: crimson;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
a {
  text-decoration: none;
}
.logo {
  
  width: 200px;
}
</style>
