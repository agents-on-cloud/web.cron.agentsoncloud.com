<template>
  <div>
    <v-list elevation="21" dense>
      <!-- running ellipsis --->
      <v-list-item
        @click="scheduledJobAction('updateCronStatus', selected, 'stop')"
        v-if="this.type == 'running' || this.type == 'paused'"
      >
        <v-list-item-title>Stop</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="scheduledJobAction('updateCronStatus', selected, 'pause')"
        v-if="this.type == 'running'"
      >
        <v-list-item-title>Paused</v-list-item-title>
      </v-list-item>

      <!--  Paused ellipsis ------------------->
      <v-list-item
        @click="scheduledJobAction('updateCronStatus', selected, 'run')"
        v-if="this.type == 'paused' || this.type == 'stopped'"
      >
        <v-list-item-title> Run</v-list-item-title>
      </v-list-item>

      <!-- pauseJobsEllipsis -->
      <v-list-item
        @click="scheduledJobAction('updateCronStatus', selected, 'cancel')"
        v-if="
          this.type == 'pausedJob' &&
          selected.pauseJob &&
          selected.statusTo == status.paused
        "
      >
        <v-list-item-title>Cancel</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="
          scheduledJobAction('updateCronStatus', selected, 'stopScheduled')
        "
        v-if="
          this.type == 'pausedJob' &&
          selected.pauseJob &&
          this.selected.body.statusTo.id == this.status.running.id
        "
      >
        <v-list-item-title>Cancel</v-list-item-title>
      </v-list-item>

      <!--ellipsis for all scheduled jobs     ------------>
      <v-list-item @click="scheduledJobAction('Delete', selected)">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item @click="scheduledJobAction('Update', selected)">
        <v-list-item-title>Update</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// // import {
// //   updateNotifications,
// //   deleteScheduledNotification,
// //   cancelCronJob,
// // } from "../../static/services/notificationService";
// // import { formatCreatedDate } from "../../static/sharedFunctions/time";
import Swal from "sweetalert2";
// // import { handleSucessMsg } from "../../static/sharedFunctions/handleSucessMsg";
// // import { handleErrorMsg } from "../../static/sharedFunctions/handleErrors";
import {
  updateCronJobRecord,
  changeCronStatus,
  deleteScheduledJob,
} from "../static/services/scheduledJobs";
import { handleSucessMsg } from "../static/sharedFunctions/handleSucessMsg";
// import { handleErrorMsg } from "../static/sharedFunctions/handleErrors";
import { mapActions, mapGetters } from "vuex";
import { setEngine } from "crypto";

export default {
  name: "Ellipsis",
  props: ["selected", "type"],

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // activeLanguage: "activeLanguage",
      // inactiveLanguage: "inactiveLanguage",
      status: "getCronStatus",
    }),
  },
  methods: {
    ...mapActions(["fetchCronJobsSettings"]),
    // this function is used to update the notification according to ellipsis (unread,flag,delete ) it takes two parameters (selectedAction as an object ) and selectedNotification also as an object
    async scheduledJobAction(selectedAction, selected, state) {
      try {
        let DTO = { id: selected.id };
        let status = "";
        if (selectedAction === "updateCronStatus") {
          switch (state) {
            case "stop":
              status = this.status.stopped;
              // update the status to stop one will get the value from store (backend)
              await updateCronJobRecord({ ...DTO, status: status });
              break;
            case "run":
              status = this.status.running;
              let changedStatusDTO = {
                id: selected.id,
                statusTo: this.status.running,
                statusFrom: this.status.paused,
              };
              await changeCronStatus({ ...DTO, ...changedStatusDTO });
              break;
            case "cancel":
              let confirmmedMsg = await Swal.fire({
                title: "Are you sure you want To Delete?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              });
              if (confirmmedMsg.isConfirmed) {
                let cancelDTO = {
                  id: selected.id,
                  statusTo: this.status.running,
                  statusFrom: this.status.paused,
                  cancel: true,
                };
                await changeCronStatus({ ...DTO, ...cancelDTO });
              }

              break;
            case "pause":
              // status = this.status.paused;
              // await updateCronJobRecord({ ...DTO, status: status });
              // handle show dialog for pause
              this.$emit("showPauseDialog", this.selected);
              break;
            case "stopScheduled":
              // will delete paused job the record and update scheduled to run
              let updateScheduledDTO = {
                id: selected.body.id,
                statusTo: this.status.running,
                statusFrom: this.status.paused,
              };
              await changeCronStatus({ ...DTO, ...updateScheduledDTO });
              break;
            default:
              break;
          }
        }
        if (selectedAction === "Delete") {
          let confirmmedMsg = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });
          if (confirmmedMsg.isConfirmed) {
            let res = await deleteScheduledJob({
              ...DTO,
            });
            handleSucessMsg(status, "Cron Job ", "deleted");
          }
        }
        if (selectedAction === "Update") {
          this.$emit("showUpdateDialog", selected);
        }
        this.$emit("getTheDataAgain");
      } catch (error) {
        console.log(error);
        let [data, status] = error;
        // handleErrorMsg(data.message, status);
      }
    },
    updateDTO(key, selected) {
      key = {
        sender:
          this.type == "recevied"
            ? selected[key].sender
            : !selected[key].sender,
        reciever:
          this.type == "recevied"
            ? !selected[key].reciever
            : selected[key].reciever,
      };
      return key;
    },
  },

  watch: {
    // selected() {
    //   this.selected = this.selected;
    // },
  },
  mounted() {
    this.fetchCronJobsSettings();
  },
};
</script>

<style scoped>
.dots-position {
  margin-left: 42%;
}
.options {
  padding: 5px 20px;
  cursor: pointer;
}

.options:hover {
  background: #009688;
  color: white !important;
}
</style>
