<template>
  <div id="app">
    <calendar @change="changeDate"></calendar>
  </div>
</template>

<script>
import calendar from "./components/Calendar/index.js";

export default {
  name: "App",
  components: {
    calendar
  },
  methods: {
    changeDate(date) {
      console.log(date);
      
    }
  }
};
</script>

<style>
</style>
