<template>
    <v-row class="mt-4">

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
            language: this.activeLanguage,
            name: this.TemplateName,
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
  
          // this.SET_SEARCH_KEYS(this.searchKeys);/
          // console.log(
          //   this.searchKeys,
          //   this.dueDateFrom,
          //   "sssssssssssseaaaaaaaaarch"
          // );
        } catch (error) {
          console.log(error.stack);
        }
      },
      resetUpdateDTO() {
        try {
          // this.status = "";
          this.TemplateName = "";
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
  