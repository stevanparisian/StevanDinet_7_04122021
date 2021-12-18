<template>
  <div>
    <Header />

    <div class="wrapper">
      <form class="form_profile" v-on:submit.prevent="onSubmit">
        <div class="info">
          <div class="wrapper-photo">
            <div class="photo"></div>
          </div>
          <div v-if="error" class="error">{{ error }}</div>

          <h3>Modifier le prénom</h3>
          <input
            type="text"
            v-model="firstName"
            :placeholder="this.firstName"
          />

          <h3>Modifier le nom</h3>
          <input type="text" v-model="lastName" :placeholder="this.lastName" />

          <h3>Modifier l'email</h3>
          <input type="email" v-model="email" :placeholder="this.email" />

          
        </div>

        <div class="submit" v-on:submit.prevent="onSubmit">
          <button @click="update(user.id)">
            Sauvegarder les modifications
          </button>
        </div>

        <button class="delete" @click="deleteAccount">
          Supprimer le compte
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import Header from "./Header.vue";
import AuthentificationService from "../services/AuthentificationService";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "Profile",
  components: { Header },
  data() {
    return {
      error: this.error,
      user: this.user,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      picture: this.picture,
      password: this.password,
    };
  },

  beforeMount() {
    this.check();
    this.getId();
  },

  methods: {
    check() {
      const token = JSON.parse(localStorage.getItem("res"));
      if (!token) {
        this.$router.push({ name: "Login" });
      } else {
        const id = VueJwtDecode.decode(token).userId;

        this.id = id;
      }
    },
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.user = user;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
      } catch {
        error;
      }
    },

    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
    async update() {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;

      const formData = new FormData();
      formData.append("firstname", this.firstName);
      formData.append("lastName", this.lastName);
      formData.append("email", this.firstName);

      try {
        const response = await axios.put(
          `http://localhost:3000/api/user/${user_id}`,

          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            error: this.error,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        window.location.reload();
        console.log(response);
      } catch (error) {
        this.error = error.response.data.message;

        console.log(this.error);
      }

    },

    async deleteAccount() {
      const token = JSON.parse(localStorage.getItem("res"));

      const id = VueJwtDecode.decode(token).userId;

      try {
        await axios.delete(`http://localhost:3000/api/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        window.location.reload();
        this.$router.push({ name: "Login" });
        localStorage.clear();
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>

<style scoped>
html {
  padding: 0;
  margin: 0;
  color: white;
}

.info,
.form {
  width: 50vw;
}
.form_profile {
  max-width: 50vw;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  opacity: 1;
  border: 2px solid black;
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

button:hover {
  cursor: pointer;
}

.custom-file-input {
  border: none;
}

.delete {
  color: white;
}
.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

h3 {
  color: black;
}
</style>