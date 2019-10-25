<template>
  <div class="profile container">
    <div class="card Cardl" v-if="profiles">
      <h2 class="deep-purple-text center">{{profiles.name}}</h2>

      <ul class="comments collection">
        <li v-for="(comment,index) in comments" :key="index">
          <div class="deep-purple-text">{{comment.from}}</div>
          <div class="grey-text text-darken-2">{{comment.content}}</div>
        </li>
      </ul>
      <ul>
        <form @submit.prevent="addcomment">
          <label for="coment">Add a comment</label>
          <input type="text" name="comment" v-model="comment">
          <p v-if="feedback" class="red-text center">{{feedback}}</p>
          <a href="https://chat-here-87206.web.app/" target="_blank">Chat Here</a>
        </form>
      </ul>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import firebase from "firebase";
export default {
  name: "Profile",
  props: {},
  data() {
    return {
      profiles: null,
      comment: "",
      feedback: "",
      user: [],
      comments: []
    };
  },
  methods: {
    addcomment() {
      if (this.comment) {
        this.feedback = null;
        db.collection("comment")
          .add({
            to: this.$route.params.id,
            from: this.user.name,
            content: this.comment,
            time: Date.now()
          })
          .then(() => {
            this.comment = null;
          });
      } else {
        this.feedback = "add a comment";
      }
    }
  },
  created() {
    let ref = db.collection("users");
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
          (this.user = user.data()), (this.user.id = user.id);
        });
      });
    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profiles = user.data();
      });
    //coments
    db.collection("comment")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      });
  }
};
</script>

<style>
.Cardl {
  margin-top: 60px;

  padding: 20px;
}
h2 {
  font-size: 2em;
  margin-top: 0px;
}
.profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>


