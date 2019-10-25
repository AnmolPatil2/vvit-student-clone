<template>
  <div class="login container">
    <div class="card-panel">
      <form @submit.prevent="login">
        <h2 class="center deep-purple-text">login</h2>
        <div class="field">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email">
        </div>

        <div class="field">
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password">
          <p class="feedback red-text" v-if="feedback">{{feedback}}</p>
        </div>

        <div class="center field">
          <button class="btn deep-purple">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            this.feedback = err.message;
            console.log(err.message);
          });
      } else {
        this.feedback = "Enter Email";
      }
    }
  }
};
</script>
<style>
.login {
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
