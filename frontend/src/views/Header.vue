<template>
  <div class="headero">
    <div class="logo-container">
      <img src="../assets/iconb.png" class="logo" alt="Logo de l'entreprise Groupomania"/>
    </div>
    <h3 class="profile" @click="Profile">{{ firstName }} {{ lastName }}</h3>

    <h3 class="home"><div @click="Home">Home</div></h3>

    <h3><div @click="logout" class="logout">Deconnexion</div></h3>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Header",

  data() {
    return {
      firstName: this.firstname,
      lastName: this.lastName,
      picture: this.picture,
      isAdmin: this.isAdmin,
    };
  },
  beforeMount() {
    this.getId();
  },

  methods: {
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      //this.$store.state.token;
      const id = VueJwtDecode.decode(token).userId;
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();

        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.id = user.id;
        this.isAdmin = user.isAdmin;
        this.picture = user.picture;
      } catch (error) {
        console.log(error);
      }
    },
    Profile() {
      this.$router.push({ name: "Profile" });
    },
    Home() {
      this.$router.push({ name: "Home" });
    },

    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({ name: "Login" });
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
h3 {
  color: #122441;
}

.headero {
  display: flex;
  justify-content: space-around;
  height: 10vh;
  background-color: #f8f9fa;
  z-index: 999;
  width: 75%;
  margin: auto;
}

.logout {
  display: flex;
  flex-direction: column;
  align-self: center;
}
.logout:hover {
  cursor: pointer;
}


.logo {
  height: 190px;
  width: 200px;
}
.logo-index {
  height: 130px;
  width: 150px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-self: center;
}


.profile,.home:hover {
cursor: pointer;
  }

@media (max-width: 800px) {
  .logo {
    display: none;
  }

  
  h3 {
    font-size: 10px;
    color: #122441;
  }
  
}
</style>