<template>
  <div class="main">
    <CronFilterVue />
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      @click:row="showCronHistory"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
          </template>
          <Ellipsis :selected="item" :type="handleType(item)"></Ellipsis>
        </v-menu> </template
    ></v-data-table>

    <div v-if="showHistoryDialog">
      <CronHistroy
        :crn_mt_scheduled_job_id="crn_mt_scheduled_job_id"
        :showHistory="showHistoryDialog"
      />
    </div>
  </div>
</template>

<script>
import CronFilterVue from "./CronFilter.vue";
import CronHistroy from "./CronHistory.vue";
import { getScheduledCronRecords } from "../static/services/scheduledJobs";
import Ellipsis from "./Ellipsis.vue";
import { mapGetters } from "vuex";

export default {
  name: "CronFilter",
  data() {
    return {
      headers: [
        {
          text: "Job Name",
          align: "start",
          sortable: false,
          value: "name.en",
          class: "blue1 white--text headers",
        },
        {
          text: "Feature",
          value: `feature.name.en`,
          class: "blue1 white--text subtitle",
        },
        {
          text: "Description",
          value: `description.name.en`,
          class: "blue1 white--text subtitle",
        },
        {
          text: "Date",
          value: "createdAt",
          class: "blue1 white--text subtitle",
        },
        {
          text: "Created By",
          value: "createdBy.user.name.en",
          class: "blue1 white--text subtitle",
        },
        {
          text: "Status",
          value: "status.name.en",
          class: "blue1 white--text subtitle",
        },
        {
          text: "actions",
          value: "actions",
          class: "blue1 white--text subtitle",
        },
      ],
      items: [],
      showHistoryDialog: false,
      crn_mt_scheduled_job_id: "",
    };
  },
  computed: {
    //   ...mapGetters({
    //     activeLanguage: "activeLanguage",
    //     inactiveLanguage: "inactiveLanguage",
    //     searchKeys: "getSerchKeys",
    //   }),
  },
  components: { CronFilterVue, CronHistroy, Ellipsis },
  methods: {
    async getScheduledJobs(DTO) {
      try {
        let res = await getScheduledCronRecords(DTO);
        this.items = res.rows;
      } catch (error) {
        console.log(error);
      }
    },
    showCronHistory(item) {
      try {
        this.showHistoryDialog = true;
        console.log();
        this.crn_mt_scheduled_job_id = item.id;
      } catch (error) {
        console.log(error);
      }
    },
    handleType(item) {
      try {
        let type = "";
        switch (item.status.id) {
          case "running123":
            type = "running";
            break;
          case "stopped123":
            type = "stopped";

            break;
          case "paused123":
            type = "paused";

            break;

          default:
            type = "running";

            break;
        }
        return type;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    //   async searchKeys() {
    //     let res = await this.getFileHistories(this.searchKeys);
    //     console.log(res, "res");
    //   },
  },
  mounted() {
    this.getScheduledJobs();
  },
};
</script>

<style lang="css" scoped>
.main {
  width: 90%;
  margin: 2%;
}
</style>
