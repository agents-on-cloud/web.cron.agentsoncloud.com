<template>
  <v-row class="mt-4">
    <v-col cols="2">
      <v-text-field
        color="blue1"
        v-model="jobName"
        label="Job Name"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-autocomplete
        label="Feature"
        v-model="feature"
        outlined
        :items="features"
        :item-text="`name[${activeLanguage}]`"
        dense
      ></v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-autocomplete
        label="Created By"
        v-model="createdBy"
        outlined
        :items="users"
        dense
      ></v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-autocomplete
        label="Status"
        v-model="status"
        outlined
        :items="statusItems"
        dense
      ></v-autocomplete>
    </v-col>
    <v-col cols="2">
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
    <v-col md="2" class="mt-2">
      <div class="btn_style">
        <v-btn @click="handleUpdateDTO" class="primary_search_btn mr-2" raised>
          SEARCH
        </v-btn>
        <v-btn @click="resetUpdateDTO" class="secondry_cancel_btn" outlined>
          RESET
        </v-btn>
      </div>
    </v-col>
    <!-- <v-col md="1"> -->

    <!-- </v-col
      > -->
    <!-- <v-col cols="2">
        <v-autocomplete
          label="status"
          v-model="status"
          outlined
          :items="statuses"
        ></v-autocomplete>
      </v-col> -->
    <!-- <v-col cols="2">
        <v-btn
          fab
          dark
          x-small
          color="blue1"
          outlined
          @click="expand = !expand"
          class="mt-4"
        >
          <v-icon dark v-if="!expand"> mdi-chevron-down </v-icon>
          <v-icon dark v-else> mdi-chevron-up </v-icon>
        </v-btn></v-col
      > -->
    <!-- <v-row v-if="expand" class="ml-2">
        <v-col cols="2">
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
      </v-row> -->
    <!-- <div class="d-flex">
   
   
      </div> -->
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CronFilter",
  data() {
    return {
      activeLanguage: "en",
      status: "",
      jobName: "",
      feature: "",
      features: [],
      dueDateFrom: [],
      users: [],
      statusItems:[],
      createdBy: "",

      // flags:
      showDateFlag: false,
      expand: false,
    };
  },
  methods: {
    ...mapMutations(["SET_SEARCH_KEYS"]),
    handleUpdateDTO() {
      try {
        this.searchKeys = {
          // status: this.status,
          language: this.activeLanguage,
          name: this.jobName,
          body: [
            { key: "source", value: this.source },
            { key: "target", value: this.target },
          ],
          dueDateFrom:
            this.dueDateFrom.length == 1
              ? this.dueDateFrom[0]
              : this.dueDateFrom[0] < this.dueDateFrom[1]
              ? this.dueDateFrom[0]
              : this.dueDateFrom[1],

          dueDateTO:
            this.dueDateFrom.length == 1
              ? this.dueDateFrom[0]
              : this.dueDateFrom[1] > this.dueDateFrom[0]
              ? this.dueDateFrom[1]
              : this.dueDateFrom[0],
        };

        this.SET_SEARCH_KEYS(this.searchKeys);
        console.log(
          this.searchKeys,
          this.dueDateFrom,
          "sssssssssssseaaaaaaaaarch"
        );
      } catch (error) {
        console.log(error.stack);
      }
    },
    resetUpdateDTO() {
      try {
        // this.status = "";
        this.jobName = "";
        this.source = {};
        this.target = {};
        this.dueDateFrom = [];
        this.SET_SEARCH_KEYS({});
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
}
</style>
