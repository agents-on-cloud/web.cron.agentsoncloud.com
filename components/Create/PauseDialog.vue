<template>
  <v-row justify="center">
    <v-dialog v-model="showPauseDialog" persistent max-width="500px">
      <v-card>
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
                    label="Date Range"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="blue1"
                    dense
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
                    @click="$refs.dueDateFrom.save(dueDateFrom)"
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
                    label="Date Range"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="blue1"
                    dense
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
                    @click="$refs.dueDateTo.save(dueDateTo)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu></v-col
            >
            <v-col cols="2">
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
                    label="Picker in menu"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="showStartTime"
                  v-model="dueTimeFrom"
                  full-width
                  @click:minute="$refs.dueTimeFrom.save(dueTimeFrom)"
                ></v-time-picker> </v-menu
            ></v-col>
            <v-col>
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
                    label="Picker in menu"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
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
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handlePausedCron">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "PauseDialog",
  props: ["showPauseDialog"],
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
    };
  },
  methods: {
    handlePausedCron() {
      try {
        // first of all will get the start data and time and create a cron job to update the status to paused
        // and then get the due to and date to and create a cron job to check if the the status is paused will change it to run :

        let startTimeToChangeStatus = this.createReption(
          this.dueDateFrom,
          this.dueTimeFrom
        );
        let endTimeToChangeStatus = this.createReption(
          this.dueDateTo,
          this.dueDateTo
        )
        let cronDto={
            
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
        console.log(month, day, min, hour, repetion, "moooooonth");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
