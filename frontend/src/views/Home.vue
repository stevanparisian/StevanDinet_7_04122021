<template>
  <div>
    <Header />

    <div class="wrapper">
      <div class="main-wrapper">
        <div class="main">
          

          <Post />
          <h1>Publications</h1>

          <div></div>
          <div class="container-post_block">
            <div v-for="title in posts" :key="title" class="post-block" :id="title.id" @click="getOnePost(title.id)">
              <div class="user_bloc">
                
                <h2>{{ title.User.firstName }}</h2>
                <h2>{{ title.User.lastName }}</h2>
              </div>
              <h4>Le {{ datePost(title.createdAt) }}</h4>
              <div v-if="title.updatedAt !== title.createdAt">
                <h4>Modifié le {{ datePost(title.updatedAt) }}</h4>
              </div>

              <h2 class="message_area">{{ title.title }}</h2>
              <p class="text-modif" v-if="id == title.user_id" @click="show">Modifier votre message</p>
              <div v-show="ok" v-if="id == title.user_id && title.id == this.post_id">
                <form class="form-post-update" v-on:submit.prevent="onSubmit">
                  <input type="text" class="title" v-model="titlePost" />
                  <button
                    @click="updatePost(title.id)"
                    v-on:submit.prevent="onSubmit"
                  >
                    Modifier
                  </button>
                </form>
              </div>

              <div class="bloc_img">
                <div v-if="title.image !== null">
                  <span> <img :src="title.image" class="image_post" /></span>
                </div>
                <div class="bloc_btn">
                  <i
                    class="fas fa-trash button_bloc"
                    v-if="id == title.user_id || isAdmin == 1"
                    @click="deletePost(title.id)"
                  ></i>
                </div>
              </div>
              <div class="comment">
                <p class="text-comment"  @click="showComments">Poster un commentaire</p>
                <div v-show="comment" v-if="title.id == this.post_id">

                <form v-on:submit.prevent="onSubmit">
                  <input
                    type="text"
                    class="comment-input"
                    v-model="contentComment"
                    required
                  />
                  <div v-if="error" class="error">{{ error }}</div>

                  <button @click="createComment(title.id)">Envoyer</button>
                </form>
                </div>
                                      <h3>Commentaires</h3>

                <div
                  v-for="comment in comments"
                  :key="comment"
                  class="comment_bloc"
                >
                  <div v-if="comment.post_id == title.id">
                    <div class="comment_user_area">
                      
                      <div>
                        {{ comment.User.firstName }}
                        {{ comment.User.lastName }}, le
                        {{ datePost(title.createdAt) }}
                      </div>
                      <br />
                    </div>

                    <div>
                      <h3 class="comment-area">{{ comment.content }} <br /></h3>
                    </div>

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import Header from "./Header.vue";
import Post from "./Post.vue";

export default {
  name: "Home",
  components: { Header, Post },

  data() {
    return {
      ok: false,
      picture: false,
      comment: false,
      email: "",
      password: "",
      error: "",
      posts: this.posts,
      comments: this.comments,
      contentComment: "",
      title: "",
      content: "",
      image: "",
      user_id: this.user_id,
      contentPost: "",
      titlePost: this.titlePost,
      id: "",
      isAdmin: "",
      post_id: this.post_id,
      userId: this.userId,
      user: {
        firstName: "",
        id: "",
        postFirstName: this.postFirstName,
        commentFirstName: this.commentFirstName,
      },
    };
  },

  beforeMount() {
    this.check();
    this.getId();
    this.getPosts();
    this.getComments();
    this.getIdPostUser();
  },

  methods: {
    check() {
      const token = JSON.parse(localStorage.getItem("res"));
      if (!token) {
        this.$router.push({ name: "Login" });
      } else {
        const id = VueJwtDecode.decode(token).userId;
      }
    },

    show() {
      this.ok = !this.ok;
    },

    getOnePost(postId){
        this.post_id = postId

    },
    showComments() {
      this.comment = !this.comment;
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

        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.id = user.id;
        this.isAdmin = user.isAdmin;
      } catch (error) {
        console.log(error);
      }
    },

    async getPosts() {
      const token = JSON.parse(localStorage.getItem("res"));

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(`http://localhost:3000/api/post/`, {
          headers,
        });

        const posts = await response.json();
        this.posts = posts;

        posts.forEach((post) => {
          this.title = post.title;
          this.post_id = post.id;
          this.imageUpdate = post.image;
          this.postFirstName = post.User.firstName;
          post.User.lastName;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      const token = JSON.parse(localStorage.getItem("res"));

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(`http://localhost:3000/api/comment/`, {
          headers,
        });

        const comments = await response.json();
        this.comments = comments;
        comments.forEach((comment) => {
          this.content = comment.content;
          this.commentFirstName = comment.User.firstName;
          this.commentLastName = comment.User.lastName;

        });
      } catch (error) {
        console.log(error);
      }
    },

    async createComment(postId) {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;

      this.user_id = user_id;
      this.post_id = postId;
      const formData = new FormData();

      try {
        const user_id = VueJwtDecode.decode(token).userId;

        const response = await axios.post(
          `http://localhost:3000/api/comment/`,
          {
            user_id: this.user_id,
            post_id: this.post_id,
            error: this.error,
            content: this.contentComment,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        window.location.reload();
      } catch (error) {
        this.error = error.response.data.message;

        console.log(this.error);
      }
    },

    datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },

    handleFile(postId) {
      const wa = postId;
      this.imageUpdate = this.$refs.imageUpdate.files[0];
      console.log(this.imageUpdate);
    },
    updatePicture(post_id) {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;
      const formData = new FormData();
      formData.append("image", this.imageUpdate);

      axios
        .put(`http://localhost:3000/api/post/picture/${post_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          formData,
        })
        .then((res) => {
          if (res) {
            console.log(this.imageUpdate);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updatePost(post_id) {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;

      const formData = new FormData();

      formData.append("title", this.titlePost);

      try {
        await axios.put(`http://localhost:3000/api/post/${post_id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

      } catch (error) {
        this.error = error.response.data.error;
        console.log(error.response.data.message);
      }
    window.location.reload();
    },

    deletePost(postId) {
      const token = JSON.parse(localStorage.getItem("res"));

      axios
        .delete("http://localhost:3000/api/post/" + postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
         
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
        });
    },

    deleteComment(commentId) {
      const token = JSON.parse(localStorage.getItem("res"));

      axios
        .delete("http://localhost:3000/api/comment/" + commentId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
        });
    },

    async getIdPostUser() {
      const token = JSON.parse(localStorage.getItem("res"));

      const id = VueJwtDecode.decode(token).userId;

      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();

        this.users = users;

      } catch (error) {
        console.log(error);
      }

      
      try {
        const res = await fetch(`http://localhost:3000/api/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();

        this.users = users;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
  /*background-image: url('../assets/background.png');*/

}

.main-wrapper {
  display: flex;
  justify-self: center;
  padding: 0;
  margin: 0;
}
.main {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100vw;
  /*background-color: rgb(32, 28, 28);*/
}
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}


.logo-index {
  height: 130px;
  width: 150px;
}

.post {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 70px;
}

.button-img {
  display: flex;
  flex-direction: column;
  align-self: baseline;
  padding: 0;
}

.container-post_block {
  margin-left: auto;
  margin-right: auto;
}

.post-block {
 box-shadow: 0px 3px 10px 0px rgb(0 0 0 / 25%);
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
}
.form-post-update {
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  opacity: 1;
  height: 5vh;
  width: 80%;
}

.content {
  margin-top: 3vh;
  height: 50px;
}

.logout {
  display: flex;
  flex-direction: column;
  align-self: center;
}
.logout:hover {
  cursor: pointer;
}

.picture-update {
  display: flex;
  margin: auto;
  align-items: baseline;
}
button {
  background: #0f63e9;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
}
.custom-file-input {
  border: none;
}

.user_bloc {
  display: flex;
  font-size: 12px;
}
.user_bloc h2 {
  margin-left: 10px;
}
.image_post {
  max-height: 350px;
  max-width: 95%;
  object-fit: scale-down;
  border-radius: 15px;
}
.bloc_img {
  display: flex;
  flex-direction: column;
  padding: 10px
}
.button_bloc {
  width: 100px;
  margin-bottom: 15px;
}
.bloc_btn {
  display: flex;
  justify-content: flex-end;
}

.comment-input {
  width: 80%;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

.comment-area {
  border: 1px solid black;
  border-radius: 5px;
  width: 15vw;
  margin: auto;
  padding: 5px
}

.message_area {
  border: 1px solid rgb(221, 46, 46);
  border-radius: 5px;
  width: 20vw;
  margin: auto;
  padding: 10px
}

.fa-trash {
    font-size: 30px;

  color: red;
}
.text-modif {
  font-size: 20px;
  color: #0f63e9;
}


.text-modif:hover {
  cursor: pointer;
}

.text-comment {
  font-size: 20px;
  color: #0f63e9;
}

.text-comment:hover {
  cursor: pointer;
}

.comment_bloc {
  margin-top: 15px;
  margin-bottom: 15px;
}

.picture_comment {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.comment_user_area {
  display: flex;
  justify-content: center;
}
.picture_post {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin: 15px;
}
@media (max-width: 800px) {
  html,
  body {
    width: 100%;
  }

  .container-post_block {
    width: 95%;
  }
  .post-block {
    width: 100%;
  }

  .form-post {
    width: 90%;
    padding: 0;
    margin: auto auto 25px auto;
    padding-bottom: 15px;
    box-shadow: 0px 0px 19px 5px #000000;
  }
  input {
    width: 100%;
  }
  .comment-input {
    width: 90%;
    border-radius: 15px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .image_post {
    height: 250px;
    width: 95%;
    border-radius: 15px;
  }
  .picture_comment {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .user_bloc {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    word-wrap: break-word;
  }
}
</style>