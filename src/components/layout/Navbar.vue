<!--<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Projects</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

     
      <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-1.png">
          </v-avatar>
          <p class="white--text subheading mt-1">The Net Ninja</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>-->


<template>
  <div class="navbar">
    <nav>
      <v-container>
        <v-toolbar color="deep-purple 4" flat app>
          <v-toolbar-title class="text-uppercase">
            <router-link to="/" class="logo left">
              <span class="font-weight-light">Geo</span>
              <span>App</span>
            </router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <div class="nav-content">
              <ul>
                <div class="right">
                  <li>
                    <router-link :to="{name:'SignUp'}" v-if="!user">Sighup</router-link>
                  </li>
                  <li>
                    <router-link :to="{name:'login'}" v-if="!user">Login</router-link>
                  </li>
                  <li>
                    <a v-if="user">{{user.email}}</a>
                  </li>
                  <li>
                    <a @click="logout()" v-if="user">Log Out</a>
                  </li>
                </div>
              </ul>
            </div>
          </v-toolbar-items>
          <v-menu class="hidden-md-and-up" offset-y>
            <v-btn flat slot="activator" color="grey">
              <v-icon left>expand_more</v-icon>
              <span>Menu</span>
            </v-btn>
            <v-list>
              <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-tile-title v-if="user">{{ link.text }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-container>
    </nav>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      links: [
        {
          users: this.user,
          text: "SignUp",
          route: "/signUp"
        },
        { users: this.user, text: "Login", route: "/login" },
        { users: !this.user, text: "Signout", route: "/team" }
      ]
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>


<style>
.logo {
  font-size: 2em;
  left: 0;
  margin: auto 50px;
}
</style>
