<template>
  <v-row justify="center">
    <v-dialog v-model="showPauseDialog" persistent max-width="600px">
      <v-card width="600">
        <v-card-title>
          <span class="text-h5">pause Cron Job</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-menu
                ref="dueDateFrom"
                v-model="showStartDateFlag"
                :close-on-content-click="false"
                :return-value.sync="dueDateFrom"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueDateFrom"
                    label="Date From"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="blue1"
                    dense
                    :error-messages="errorMessages.dueDateFrom"
                    @change="updateErrorMessages('dueDateFrom')"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dueDateFrom" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="showStartDateFlag = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.dueDateFrom.save(dueDateFrom),
                        updateErrorMessages('dueDateFrom')
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu></v-col
            >
            <v-col cols="3">
              <v-menu
                ref="dueDateTo"
                v-model="showEndDateFlag"
                :close-on-content-click="false"
                :return-value.sync="dueDateTo"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueDateTo"
                    label="Date To"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="blue1"
                    dense
                    :error-messages="errorMessages.dueDateTo"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dueDateTo" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="showEndDateFlag = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.dueDateTo.save(dueDateTo),
                        updateErrorMessages('dueDateTo')
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu></v-col
            >
            <v-col cols="3">
              <v-menu
                ref="dueTimeFrom"
                v-model="showStartTime"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="dueTimeFrom"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueTimeFrom"
                    label="Time From"
                    prepend-inner-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errorMessages.dueTimeFrom"
                    outlined
                    dense
                    @change="updateErrorMessages('dueTimeFrom')"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="showStartTime"
                  v-model="dueTimeFrom"
                  full-width
                  @click:minute="$refs.dueTimeFrom.save(dueTimeFrom)"
                ></v-time-picker> </v-menu
            ></v-col>
            <v-col cols="3">
              <v-menu
                ref="showEndTime"
                v-model="showEndTime"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="dueTimeTo"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dueTimeTo"
                    label="Time To"
                    prepend-inner-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="errorMessages.dueTimeTo"
                    outlined
                    dense
                    @change="updateErrorMessages('dueTimeTo')"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="showEndTime"
                  v-model="dueTimeTo"
                  full-width
                  @click:minute="$refs.showEndTime.save(dueTimeTo)"
                ></v-time-picker> </v-menu></v-col
          ></v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondry_cancel_btn" text @click="$emit('closeDialg')">
            Close
          </v-btn>
          <v-btn class="primary_search_btn" text @click="handlePausedCron">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validateInputs } from "../../static/sharedFunctions/validation";
import { addscheduledCronJob } from "../../static/services/scheduledJobs";
import { mapGetters } from "vuex";
export default {
  name: "PauseDialog",
  props: ["showPauseDialog", "item"],
  data() {
    return {
      showStartDateFlag: false,
      showEndDateFlag: false,
      showStartTime: false,
      showEndTime: false,

      dueDateFrom: "",
      dueDateTo: "",
      dueTimeFrom: "",
      dueTimeTo: "",
      errorMessages: {},
    };
  },
  computed: {
    ...mapGetters({
      activeLanguage: "activeLanguage",
      inactiveLanguage: "inactiveLanguage",
      status: "getCronStatus",
      user: "user",
    }),
  },
  methods: {
    async handlePausedCron() {
      try {
        // first of all will get the start data and time and create a cron job to update the status to paused
        // and then get the due to and date to and create a cron job to check if the the status is paused will change it to run :
        // validateion for Time and Date:
        let validation = validateInputs({
          dueDateFrom: this.dueDateFrom,
          dueDateTo: this.dueDateTo,
          dueTimeFrom: this.dueTimeFrom,
          dueTimeTo: this.dueTimeTo,
        });
        if (validation[0]) {
          let startTimeToChangeStatus = this.createReption(
            this.dueDateFrom,
            this.dueTimeFrom
          );
          let endTimeToChangeStatus = this.createReption(
            this.dueDateTo,
            this.dueTimeTo
          );
          // create cron job for change status to
          let ChangeToPauseCronDTO = {
            body: {
              id: this.item.id,
              statusTo: this.status.paused,
              statusFrom: this.status.running,
            },
            feature: {
              id: "LKP-LSF-JOR-9af8a17d-35d5-4217-a43a-320745647832",
              name: { ar: "المهام المجدولة", en: "Cron Jobs" },
            },
            name: { en: `${this.item.name[this.activeLanguage]} Paused` },
            description: {
              en: `${
                this.item.name[this.activeLanguage]
              } change status to Paused`,
            },
            status: this.status.running,
            repetition: startTimeToChangeStatus,
            endPoint:
              "http://localhost:50303/cron/scheduledJob/changeCronStatus",
            createdBy: {
              user: {
                name: this.user.name,
                id: this.user.id,
                image: this.user.image,
              },
              system: "xxx",
              channel: "web",
            },
            pauseJob: true,
          };
          let ChangeToRunningCronDTO = {
            body: {
              id: this.item.id,
              statusTo: this.status.running,
              statusFrom: this.status.paused,
            },
            feature: {
              id: "LKP-LSF-JOR-9af8a17d-35d5-4217-a43a-320745647832",
              name: { ar: "المهام المجدولة", en: "Cron Jobs" },
            },
            name: { en: `${this.item.name[this.activeLanguage]} Paused` },
            description: {
              en: `${
                this.item.name[this.activeLanguage]
              } change status to Running`,
            },
            status: this.status.running,
            repetition: endTimeToChangeStatus,
            endPoint:
              "http://localhost:50303/cron/scheduledJob/changeCronStatus",
            createdBy: {
              user: {
                name: this.user.name,
                id: this.user.id,
                image: this.user.image,
              },
              system: "xxx",
              channel: "web",
            },
            pauseJob: true,
          };
          let res = await addscheduledCronJob(ChangeToPauseCronDTO);
          let res2 = await addscheduledCronJob(ChangeToRunningCronDTO);

          this.$emit("closeDialg");
        } else {
          this.errorMessages = validation[1];
        }
      } catch (error) {
        console.log(error);
      }
    },
    createReption(date, time) {
      try {
        // * * * * * will get the date and start cron at this time
        console.log(date, time, "handlePausedCron");
        let month = date.split("-")[1];
        let day = date.split("-")[2];
        let min = time.split(":")[1];
        let hour = time.split(":")[0];
        let repetion = `${min} ${hour} ${day} ${month} *`;
        // console.log(month, day, min, hour, repetion, "moooooonth");
        return repetion;
      } catch (error) {
        console.log(error);
      }
    },
    updateErrorMessages(key) {
      if (this[key]) {
        this.errorMessages[key] = "";
      }
    },
  },
};
</script>

<style lang="css" scoped>
@import "../style/btn.css";
</style>
