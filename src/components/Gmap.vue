<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
import { fb, db } from "../firebase";
import firebase from "firebase";
export default {
  name: "Gmap",
  data() {
    return { lat: 12.9716, lng: 77.5946 };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 13,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
      db.collection("users")
        .get()
        .then(user => {
          user.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map: map
              });
              marker.addListener("click", () => {
                this.$router.push({ name: "profile", params: { id: doc.id } });
              });
            }
          });
        });
    }
  },
  mounted() {
    //getting user
    let user = firebase.auth().currentUser;

    //Get User Geo Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 6000, timeout: 10000 }
      );
    } else {
      //position center default
      this.renderMap();
    }
  }
};
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>
