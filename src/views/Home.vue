
<template>
  <div class="home">
    <Gmap/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Gmap from "@/components/Gmap.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    Gmap
  }
};
</script>