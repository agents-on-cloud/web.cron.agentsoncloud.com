<template>
  <div class="main">
    <CronFilterVue @searchKeys="searchKeys" />
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
          <Ellipsis
            :selected="item"
            type="pausedJob"
            @getTheDataAgain="getTheDataAgain"
            @showPauseDialog="showPauseDialog"
          ></Ellipsis>
        </v-menu> </template
    ></v-data-table>
    <!-- pause dialog -->
    <div v-if="pauseDialogFlag">
      <PauseDialog
        :showPauseDialog="pauseDialogFlag"
        :item="selectedItem"
        @closeDialg="pauseDialogFlag = false"
      />
    </div>
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
import PauseDialog from "./Create/PauseCronDialog.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ScheduledPausedJobsTable",
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
          value: `description.en`,
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
      pauseDialogFlag: false,
      selectedItem: {},
    };
  },
  computed: {
    //   ...mapGetters({
    //     activeLanguage: "activeLanguage",
    //     inactiveLanguage: "inactiveLanguage",
    //     searchKeys: "getSerchKeys",
    //   }),
  },
  components: { CronFilterVue, CronHistroy, Ellipsis, PauseDialog },
  methods: {
    ...mapActions(["fetchCronJobsSettings"]),
    async getScheduledJobs(DTO) {
      try {
        let res = await getScheduledCronRecords({ pauseJob: true });
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
    async getTheDataAgain() {
      try {
        await this.getScheduledJobs();
      } catch (error) {
        console.log(error);
      }
    },
    showPauseDialog(data) {
      try {
        this.pauseDialogFlag = true;
        this.selectedItem = data;
      } catch (error) {
        console.log(error);
      }
    },
    async searchKeys(data) {
      let res = await this.getScheduledJobs(data);
    },
  },
  watch: {},
  mounted() {
    this.fetchCronJobsSettings();
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
