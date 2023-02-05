<template>
  <v-row justify="center">
    <v-dialog v-model="showUpdateDialog" persistent max-width="1000px">
      <v-card width="1000">
        <v-card-title>
          <span class="text-h5 blue1--text">Update Cron Job</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6" class="mb-0 mt-0">
              <v-text-field
                label="name"
                v-model="name"
                outlined
                dense
                :error-messages="errorMessages.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mt-n9"
              ><Repetition
                @repeation="getRepeation"
                :intialRepetition="intialRepetition"
              />
            </v-col>
            <!-- <v-col cols="6" class="py-0">
              <v-autocomplete
                :items="features"
                color="blue1"
                outlined
                v-model="feature"
                label="Feature"
                :item-text="`name`"
                return-object
                dense
                :error-messages="errorMessages.feature"
              ></v-autocomplete
            ></v-col> -->
            <v-col cols="6" class="py-0">
              <v-autocomplete
                :items="endPoints"
                color="blue1"
                outlined
                v-model="endPoint"
                label="End point"
                return-object
                dense
                :error-messages="errorMessages.endPoint"
              ></v-autocomplete>
            </v-col>
            <v-col cols="3" class="py-0 mt-n3">
              <v-checkbox
                color="blue1"
                v-model="once"
                label="repeate cron once"
              ></v-checkbox
            ></v-col>
            <v-col cols="3" class="py-0 mt-n3">
              <v-checkbox
                color="blue1"
                v-model="isDefault"
                label="default Template"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="py-0 mt-n4">
              <v-radio-group row v-model="bodyRadio">
                <v-radio label="keys" value="keys"></v-radio>
                <v-radio label="json" value="json"></v-radio>
              </v-radio-group>
              <v-textarea
                v-if="bodyRadio == 'json'"
                label="body"
                outlined
                dense
                v-model="body"
                :error-messages="errorMessages.body"
              >
              </v-textarea>
              <keyBodyTableVue
                v-if="bodyRadio == 'keys'"
                @body="getBodyFromKeys"
              >
              </keyBodyTableVue>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex mt-n12">
            <v-btn
              class="secondry_cancel_btn"
              text
              @click="$emit('closeDialog')"
            >
              Close
            </v-btn>
            <v-btn class="primary_search_btn" text @click="handleCreateCron">
              Update
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getFeatures,
  addscheduledCronJob,
  getScheduledCronRecords,
  getVirtualEnPoints,
} from "../../static/services/scheduledJobs";
import { validateInputs } from "../../static/sharedFunctions/validation";
import keyBodyTableVue from "./KeysBodyTableUpdate.vue";
import Repetition from "./Repetition.vue";
import { handleSucessMsg } from "../../static/sharedFunctions/handleSucessMsg";
import { updateCronJobRecord } from "../../static/services/scheduledJobs";

export default {
  name: "UpdateCronDialog",
  props: ["showUpdateDialog", "id"],
  components: { Repetition, keyBodyTableVue },
  computed: {
    ...mapGetters({
      activeLanguage: "activeLanguage",
      inactiveLanguage: "inactiveLanguage",
      user: "user",
      status: "getCronStatus",
    }),
  },
  data: () => ({
    name: "",
    endPoints: [],
    endPoint: "",
    bodyRadio: "json",
    errorMessages: {},
    row: "",
    jsonBody: "",
    repeation: "",
    description: "",
    body: "",
    intialRepetition: "",
    isDefault: false,
    once: false,
  }),
  methods: {
    // async getAllFeatures() {
    //   try {
    //     let res = await getFeatures();
    //     console.log(res, "ressssss");
    //     for (let i = 0; i < res.rows.length; i++) {
    //       const element = res.rows[i];
    //       this.features.push({
    //         id: element.id,
    //         name: element.abbreviation,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async handleCreateCron() {
      try {
        // let validation :
        let res;
        let status;
        let cronBody = {
          name: {
            [this.activeLanguage]: this.name,
            [this.inactiveLanguage]: "",
          },
          description: {
            [this.activeLanguage]: this.description,
            [this.inactiveLanguage]: "",
          },
          endPoint: this.endPoint,
          repetition: this.repeation,
          body: this.body,
          status: this.status.running,
          isDefault: this.isDefault,
          one: this.once,
          id: this.id,
        };
        let validation = validateInputs({
          name: cronBody.name[this.activeLanguage],
          description: cronBody.description[this.activeLanguage],
          endPoint: cronBody.endPoint,
          repeation: cronBody.repetition,
          body: this.body,
        });
        if (validation[0]) {
          [res, status] = await updateCronJobRecord(cronBody);
          handleSucessMsg(status, "Cron Job", "Updated");
          this.$emit("closeDialog");
          this.$emit("getDataAgain");
        } else {
          this.errorMessages = validation[1];
        }
      } catch (error) {
        console.log(error);
      }
    },
    getRepeation(data) {
      try {
        let { repeation, description } = data;
        this.repeation = repeation;
        this.description = description;
      } catch (error) {
        console.log(error);
      }
    },
    getBodyFromKeys(data) {
      try {
        let body = {};
        // get array of key and values will create body { that has key:value}
        data.map((el) => {
          return (body[el.key] = el.value);
        });
        this.body = body;
      } catch (error) {
        console.log(error);
      }
    },
    async getInitData() {
      try {
        let res = await getScheduledCronRecords({ ids: [this.id] });
        let intial = res.rows[0];
        this.name = intial.name[this.activeLanguage];
        this.endPoint = intial.endPoint;
        this.body = JSON.stringify(intial.body);
        this.isDefault = intial?.isDefault;
        this.once = intial?.once;

        // emit to children :
        // 1. repeation:
        this.intialRepetition = {
          description: intial?.description[this.activeLanguage],
          repeation: intial.repetition,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getAllVirtyualEndPoints() {
      try {
        let res = await getVirtualEnPoints();
        res.rows.map((el) => {
          this.endPoints.push(el.virtualEndpoint);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // this.getAllFeatures();
    this.getInitData();
    this.getAllVirtyualEndPoints();
  },
  watch: {
    async id() {
      await this.getInitData();
    },
  },
};
</script>

<style lang="css" scoped>
@import "../style/btn.css";
@import "../style/dialog.css";
</style>
