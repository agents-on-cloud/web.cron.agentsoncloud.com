<template>
  <v-dialog
    v-model="showHistory"
    persistent
    max-width="500"
    class="history_dialog"
  >
    <v-card width="500">
      <v-card-title>
        <span class="text-h6">Cron History</span>
      </v-card-title>

      <v-card-text>
        <v-col class="py-0 px-0" cols="12">
          <HistoryFilter @searchKeys="handleSearchKeys" />
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table
        ></v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeDialog')">
          Close
        </v-btn>
        <!-- <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getScheduledHistoryRecords } from "../static/services/scheduledJobs";
import HistoryFilter from "./HistoryFilter.vue";
import { mapGetters } from "vuex";

export default {
  name: "CronFilter",
  data() {
    return {
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "date",
          class: "blue1 white--text headers",
        },
        {
          text: "time",
          value: `time`,
          class: "blue1 white--text subtitle",
        },

        {
          text: "Status",
          value: "status.name.en",
          class: "blue1 white--text subtitle",
        },
      ],
      items: [],
    };
  },
  computed: {
    //   ...mapGetters({
    //     activeLanguage: "activeLanguage",
    //     inactiveLanguage: "inactiveLanguage",
    //     searchKeys: "getSerchKeys",
    //   }),
  },
  components: { HistoryFilter },
  props: ["crn_mt_scheduled_job_id", "showHistory"],
  methods: {
    async getScheduledJobsHistory(DTO) {
      try {
        let res = await getScheduledHistoryRecords({
          crn_mt_scheduled_job_id: this.crn_mt_scheduled_job_id,
          ...DTO,
        });
        this.items = res.rows;
        // console.log(
        //   res.rows[0].status,
        //   "ssssssssssssssss",
        //    JSON.parse(res.rows[0].status)
        // );
        // let arr = [];
        // res.rows.map((el) => {
        //   arr.push({ ...el, status: JSON.parse(el.status) });
        // });
        // this.items = arr;
      } catch (error) {
        console.log(error);
      }
    },
    async handleSearchKeys(data) {
      try {
        let DTO = {
          ...data,
          crn_mt_scheduled_job_id: this.crn_mt_scheduled_job_id,
        };
        console.log(DTO, "DDDDDDDTO");
        await this.getScheduledJobsHistory(DTO);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    async crn_mt_scheduled_job_id() {
      await this.getScheduledJobsHistory();
    },
  },
  mounted() {
    this.getScheduledJobsHistory();
  },
};
</script>

<style lang="css" scoped>
.main {
  width: 90%;
  margin: 2%;
}
.v-dialog {
  margin-left: 58% !important;
  margin-top: 30% !important;
}
.v-dialog__content {
  left: 600px !important;
  position: fixed;
  top: 143px !important;
}
</style>
