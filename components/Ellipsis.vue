<template>
  <div>
    <v-list elevation="21" dense>
      <!-- running ellipsis --->
      <v-list-item
        @click="templateActions('updateTemplate', selected)"
        v-if="this.type == 'running'"
      >
        <v-list-item-title>Stopped</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="templateActions('updateTemplate', selected)"
        v-if="this.type == 'running'"
      >
        <v-list-item-title>Paused</v-list-item-title>
      </v-list-item>

      <!--  Paused ellipsis ------------------->
      <v-list-item
        @click="templateActions('updateTemplate', selected)"
        v-if="this.type == 'paused' || this.type == 'stopped'"
      >
        <v-list-item-title> Run</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="templateActions('updateTemplate', selected)"
        v-if="this.type == 'paused'"
      >
        <v-list-item-title>Stop</v-list-item-title>
      </v-list-item>

      <!--ellipsis for all scheduled jobs     ------------>
      <v-list-item @click="templateActions('Delete', selected)">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item @click="templateActions('read', selected)">

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
// import Swal from "sweetalert2";
// // import { handleSucessMsg } from "../../static/sharedFunctions/handleSucessMsg";
// // import { handleErrorMsg } from "../../static/sharedFunctions/handleErrors";
// import { deleteTemplate, updateTemplate } from "../static/services/edt";
// import { handleSucessMsg } from "../static/sharedFunctions/handleSucessMsg";
// import { handleErrorMsg } from "../static/sharedFunctions/handleErrors";
// import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Ellipsis",
  props: ["selected", "type"],

  data() {
    return {};
  },
  computed: {
    // ...mapGetters({
    //   activeLanguage: "activeLanguage",
    //   inactiveLanguage: "inactiveLanguage",
    //   getDataFlag: "getDataAgainFlag",
    // }),
  },
  methods: {
    // ...mapMutations(["SET_GET_DATA_AGAIN_FLAG"]),
    // this function is used to update the notification according to ellipsis (unread,flag,delete ) it takes two parameters (selectedAction as an object ) and selectedNotification also as an object
    async templateActions(selectedAction, selected) {
      try {
        let DTO = { id: selected.id };
        // console.log(DTO, "DTOO",selectedAction,"selectedAction");
        if (selectedAction === "updateTemplate") {
          this.$emit("showUpdateDialog", selected.id);
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
            let [res, status] = await deleteTemplate({
              ...DTO,
            });
            handleSucessMsg(status, "Template", "deleted");
          }
        }
        if (selectedAction == "active") {
          let [res, status] = await updateTemplate({
            ...DTO,
            status: "ACTIVE",
          });
          handleSucessMsg(status, "Template", "activated");
        }
        if (selectedAction == "inActive") {
          // console.log("INAAACTIVE");
          let [res, status] = await updateTemplate({
            ...DTO,
            status: "INACTIVE",
          });
          handleSucessMsg(status, "Template", "Deactivate");
        }
        // emit to store to update in active list
        this.SET_GET_DATA_AGAIN_FLAG(!this.getDataAgainFlag);
        this.$emit("getTheDataAgain");
      } catch (error) {
        console.log(error);
        let [data, status] = error;
        handleErrorMsg(data.message, status);
      }
    },

    // this function is used to hide or show (update , stop and delete) icons it validates if the notification date is greater then current date and return a flag

    // validateShowIconsForSpacific() {
    //   let [currentDay, currentTime] = formatCreatedDate();
    //   let flag = false;

    //   if (this.selected.startShowDate == currentDay) {
    //     this.selected.startShowTime > currentTime
    //       ? (flag = true)
    //       : (flag = false);
    //     // this.spacificIconsFlag = flag;
    //   } else {
    //     this.selected.startShowDate > currentDay
    //       ? (flag = true)
    //       : (flag = false);
    //   }

    //   this.spacificIconsFlag = flag;
    // },

    /* this function is used to update the DTO for update notification function according to which key (col in backend should be changed , (unread,flagged)) it takes a key which represent the column in db to be changed or trigged  and it return an object (json {sender: value , reciever: value})
     */
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
    // this.validateShowIconsForSpacific();
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
