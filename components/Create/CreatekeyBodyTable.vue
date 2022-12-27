<
<template>
  <div>
    <v-col cols="8">
      <div class="table_div">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="red" @click="deleteRow(item)">
              mdi-delete
            </v-icon>
            <v-icon small color="blue1" @click="updateRow(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-col>

    <v-row class="mt-4"
      ><v-col cols="3" class="first_col">
        <v-text-field label="Key" v-model="key" outlined dense></v-text-field
      ></v-col>
      <v-col cols="3">
        <v-text-field
          label="Value"
          v-model="value"
          outlined
          dense
        ></v-text-field
      ></v-col>
      <v-col cols="3" class="mt-n6"
        ><v-btn @click="addBody" class="primary_search_btn mt-1">Add</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "KeyBodyTable",
  props: [],
  data() {
    return {
      headers: [
        {
          text: "Key",
          align: "start",
          sortable: false,
          value: "key",
          class: "blue1 white--text headers",
        },
        {
          text: "value",
          value: `value`,
          class: "blue1 white--text subtitle",
        },
        {
          text: "actions",
          value: `actions`,
          class: "blue1 white--text subtitle",
        },
      ],
      value: "",
      key: "",
      errorMessages: {},
      items: [],
    };
  },
  methods: {
    addBody() {
      try {
        // validate key and value
        let validation = true;
        if (!this.key) {
          this.errorMessages.key = "key is required";
          validation = false;
        }
        if (!this.value) {
          this.errorMessages.value = "value is required";
          validation = false;
        }
        if (validation) {
          this.items.push({
            value: this.value,
            key: this.key,
            action: "mdi-delete-forever",
          });
          this.value = "";
          this.key = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    deleteRow(item) {
      try {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },
    updateRow(item) {
      try {
        // delete the row and set the inputs
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
        this.key = item.key;
        this.value = item.value;
        this.updateFlag = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    items() {
      this.$emit("body", this.items);
    },
  },
};
</script>

<style lang="css" scoped>
@import "../style/btn.css";
@import "../style/dialog.css";

.table_div {
  margin-left: 30%;
  width: 100%;
}
.first_col {
  margin-left: 25% !important;
}
</style>
