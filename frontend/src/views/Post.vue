<template>
  <div>
    <div class="post">
      <h2 class="text-description">Exprimez vous</h2>

      <form class="form-post" v-on:submit.prevent="onSubmit">
        <input type="text" class="title" v-model="titlePost" required />

        <label for="image">
          <input
            type="file"
            name="image"
            id="image"
            ref="image"
            class="custom-file-input"
            v-on:change="handleFileUpload()"
          />
        </label>

        <button @click="post">Envoyer</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
export default {
  name: "Post",

  data() {
    return {
      error: this.error,
      title: "",
      image: "",
      user_id: this.user_id,
      titlePost: "",
    };
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      console.log(this.$refs.image.files);
    },

    async post() {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;

      const formData = new FormData();

      formData.append("image", this.image);
      formData.append("title", this.titlePost);
      formData.append("user_id", user_id);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        window.location.reload();
      } catch (error) {
        this.error = error.response.data.message;

        console.log(this.error);
      }
    },
  },
};
</script>

<style scoped>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Slectionnez une image";
  display: inline-block;
  border-radius: 10px;
  margin-right: 15px;
  padding: 10px 20px;
  font-weight: bold;
  color: white;
  background-color: #0f63e9;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: #0f63e9;
}

.post {
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
}

.text-description{
  margin-top: 80px;
}

.post-block {
  border: 2px solid white;
  border-radius: 15px;
  width: 50vw;
  margin-top: 30px;
  margin-bottom: 20px;
}

.form-post {
  margin: 30px auto;
  text-align: left;
  border-radius: 10px;
  opacity: 1;
  height: 25vh;
  width: 50vw;
  box-shadow: 0px 3px 10px 0px rgb(0 0 0 / 25%);
  padding: 10px;
}

.content {
  margin-top: 3vh;
  height: 50px;
}

button {
  border-radius: 10px;
  margin-right: 15px;
  font-weight: bold;
  color: white;
  background-color: #0f63e9;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>