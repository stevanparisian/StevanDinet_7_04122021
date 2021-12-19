<template>
<div>
<div class="comment"> 

  <form v-on:submit.prevent="onSubmit">

  <input type="text" class="comment-input" v-model="content" required >
  
  <button @click="createComment(title.id)"> Envoyer </button>
</form>
  <h3 @click="show">Afficher les commentaires</h3>
  <div v-show="ok">  

<div 
 v-for="(comment) in comments" :key="comment" :firstName ="comment.User.firstName" class="comment_bloc"
>
<div v-if="comment.post_id == title.id">

<div class="comment_user_area"> 

  
<div>{{comment.User.firstName}} {{comment.User.lastName}},  le {{datePost(title.createdAt)}}</div> <br> 


</div>

<div> <h3 class="comment-area"> {{comment.content}} <br></h3></div>

<button v-if="id == comment.user_id || isAdmin==1" class="button_bloc" @click="deleteComment(comment.id)">Supprimer</button>

</div>
 </div>

</div>

   </div>
</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
name: "Comment",

 data() {
     
    return {
       
      ok : false,
        email:'',
        password:'',
        error:'',
        //id:this.id,
        posts:this.posts,
        comments : this.comments,
        title:"",
        content:"",
        image:"",
        user_id:this.user_id,
        contentPost:'',
        titlePost:'',
        id:"",
        isAdmin:"",
        post_id:this.post_id,
         userId : this.userId,
        user: {
      firstName:"",
      id:"",
      postFirstName : this.postFirstName,
      commentFirstName : this.commentFirstName
    }}
    
 },
beforeMount(){

this.getComments();
},  methods : {


   async createComment(postId) {

 
             const token = JSON.parse(localStorage.getItem('res'));
             const user_id = VueJwtDecode.decode(token).userId;
            const post_id =  postId


  const formData = new FormData();

  try {
    
      formData.append("content", this.content);
    formData.append("user_id",user_id);
    formData.append("post_id",post_id);



 const response = await axios.post('http://localhost:3000/api/comment', formData,
{
headers: {
      Authorization: `Bearer ${token}`
    }
})
         // window.location.reload();

         console.log(response)

      } catch (err) {
        console.log(err);
     }},

   async getComments() {

  const token = JSON.parse(localStorage.getItem('res'));
           
  
try {
      const p = await fetch(`http://localhost:3000/api/comment/`) ;
  
     const comments = await p.json();
     this.comments = comments;

      comments.forEach(comment => {
        this.content = comment.content;

         this.commentFirstName =  comment.User.firstName;
         this.commentLastName = comment.User.lastName;
      });
  

} catch(error) {
  console.log(error)

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
      return event.toLocaleDateString("fr-FR", options);
    },


        },
 }
</script>

<style scoped>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Slectionnez une image';
  display: inline-block;
  border-radius: 10px;
  margin-right:15px ;
  padding: 10px 20px;
  font-weight: bold;
  color: white;
  background-color: crimson;
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
  background: crimson;
}

.main-wrapper {
display: flex;
justify-self: center;


}
.main {
  display: flex;
  flex-direction: column;

   height: 100vh;
  width: 75vw;
/*background-color: rgb(32, 28, 28);*/
    background-color:rgb(4, 4, 37);}
.wrapper {
    display: flex;
justify-content: space-between;
  height: 100%;
  width: 100%;
   background-color:rgb(4, 4, 37);

}

.logo {
  height:190px;
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

.post {
  display: flex;
    justify-content: center;
    margin-bottom: 70px;

}

.container-post_block {
   margin-left: auto;
      margin-right: auto;

}

.post-block {


  border: 2px solid white;
  background-color: rgb(10, 10, 22);
  border-radius: 15px;
  width: 50vw;
  margin-top: 30px;
  margin-bottom: 20px;
}


.form-post {
    margin:30px auto;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    opacity: 1;
    height: 25vh;
      width: 50vw;
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

button {
  border-radius: 10px;
  margin-right:15px ;
  font-weight: bold;
  color: white;
  background-color: crimson;

}
.test {
  display: flex;
  flex-direction: column;
}
.user_bloc {
  display: flex;
}
.user_bloc h1 {
  margin-left: 15px ;
  margin-right: 25px;
}
.image_post {
  height: 350px;
  width: 95%;
}
.bloc_img {
  display: flex;
  flex-direction: column;
}
.button_bloc {
  width: 100px;
  margin-bottom: 15px;
}
.bloc_btn {
  display: flex;
  justify-content: flex-end;
}

</style>