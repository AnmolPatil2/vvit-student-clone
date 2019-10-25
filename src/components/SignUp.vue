<template>
  <div class="signup container">
    <form @submit.prevent="signUp()" class="card-panel">
      <h2 class="center deep-purple-text">Sign Up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="uname">
        <p class="red-text">{{feedback}}</p>
      </div>
      <div class="center field">
        <button class="btn deep-purple">Sign Up</button>
      </div>
    </form>
  </div>
</template>
<script>
import slugify from "slugify";
import { fb, db } from "../firebase";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      password: null,
      uname: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signUp() {
      if (this.uname) {
        this.slug = slugify(this.uname, {
          replacement: "-",
          remove: /[!@#$%^&*()]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This name is already taken";
          } else {
            fb.auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  name: this.uname,
                  geolocation: null,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: "home" });
              })
              .catch(error => {
                // Handle Errors here.
                this.feedback = null;
                this.feedback = error.message;
                // ...
              });
            console.log(this.slug);
          }
        });
      } else {
        this.feedback = "Enter a Name";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
h2 {
  font-size: 2em;
}
.field {
  margin-bottom: 30px;
}
</style>
