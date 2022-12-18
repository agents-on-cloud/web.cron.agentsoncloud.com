<template>
  <v-app>
    <CronTabsVue />
  </v-app>
</template>

<script>
import CronTabsVue from "../components/CronTabs.vue";
export default {
  name: "cron",
  components: { CronTabsVue },
};
</script>

<style lang="scss" scoped></style>
