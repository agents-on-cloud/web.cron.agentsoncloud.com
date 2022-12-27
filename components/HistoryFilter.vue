<template>
  <v-row class="mt-4 px-0">
    <v-col cols="4" class="py-0">
      <v-menu
        ref="dueDateFrom"
        v-model="showDateFlag"
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
        <v-date-picker v-model="dueDateFrom" no-title scrollable range>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="showDateFlag = false">
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
      </v-menu>
    </v-col>
    <v-col cols="4" class="py-0">
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
            outlined
            dense
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showStartTime"
          v-model="dueTimeFrom"
          full-width
          @click:minute="$refs.dueTimeFrom.save(dueTimeFrom)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-col cols="4" class="py-0">
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
            outlined
            dense
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="showEndTime"
          v-model="dueTimeTo"
          full-width
          @click:minute="$refs.showEndTime.save(dueTimeTo)"
        ></v-time-picker>
      </v-menu>
    </v-col>
    <v-col md="4" class="py-0">
      <div class="btn_style">
        <v-btn @click="handleUpdateDTO" class="primary_search_btn mr-2" raised>
          SEARCH
        </v-btn>
        <v-btn @click="resetUpdateDTO" class="secondry_cancel_btn" outlined>
          RESET
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "HistoryFilter",
  data() {
    return {
      activeLanguage: "en",
      dueDateFrom: [],
      dueTimeFrom: "",
      dueTimeTo: "",
      showEndTime: false,
      showStartTime: false,

      // flags:
      showDateFlag: false,
      expand: false,
    };
  },
  methods: {
    // ...mapMutations(["SET_SEARCH_KEYS"]),
    handleUpdateDTO() {
      try {
        this.searchKeys = {
          // status: this.status,
          timeFrom:
            this.dueTimeFrom < this.dueTimeTo
              ? this.dueTimeFrom
              : this.dueTimeTo,

          timeTo:
            this.dueTimeTo > this.dueTimeFrom
              ? this.dueTimeTo
              : this.dueTimeFrom,
          dateFrom:
            this.dueDateFrom.length == 1
              ? this.dueDateFrom[0]
              : this.dueDateFrom[0] < this.dueDateFrom[1]
              ? this.dueDateFrom[0]
              : this.dueDateFrom[1],

          dateTo:
            this.dueDateFrom.length == 1
              ? this.dueDateFrom[0]
              : this.dueDateFrom[1] > this.dueDateFrom[0]
              ? this.dueDateFrom[1]
              : this.dueDateFrom[0],
        };
        this.$emit("searchKeys", this.searchKeys);
      } catch (error) {
        console.log(error.stack);
      }
    },
    resetUpdateDTO() {
      try {
        // this.status = "";
        this.dueTimeFrom = "";
        this.dueTimeTo = "";
        this.dueDateFrom = [];
        this.$emit("searchKeys", {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.primary_search_btn {
  background-color: #194569 !important;
  /* margin-top: 24px !important; */
  /* position: absolute;
      left: 70% !important;
      top: 9%;    */
  color: #ffffff !important;
  font-size: 16px !important;
}
.secondry_cancel_btn {
  /* position: absolute;
      left: 62% !important;
      top: 9%; */
  font-size: 16px !important;
  color: #5f84a2 !important;
  /* margin-top: 24px !important;
      margin-right: 20px; */
}
.btn_style {
  display: flex;
  display: flex;
  margin-top: -10%;
  margin-bottom: 15%;
  margin-left: 90%;
}
</style>
