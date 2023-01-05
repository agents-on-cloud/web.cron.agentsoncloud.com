<template>
  <div class="d-flex">
    <v-col cols="6">
      <v-row class="py-0 my-0">
        <v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Day of week"
            class="my-0"
            color="blue1"
            v-model="dayOfWeekFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 my-0">
          <v-autocomplete
            :items="days"
            color="blue1"
            outlined
            v-model="repetition.dayOfWeek"
            multiple
            dense
            :disabled="!dayOfWeekFlag"
          ></v-autocomplete> </v-col
      ></v-row>
      <v-row class="py-0 my-0"
        ><v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Month"
            class="my-0"
            color="blue1"
            v-model="monthFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 my-0">
          <v-autocomplete
            :items="months"
            color="blue1"
            outlined
            v-model="repetition.month"
            dense
            multiple
            :disabled="!monthFlag"
            item-text="value"
            return-object
          ></v-autocomplete> </v-col
      ></v-row>
      <v-row class="py-0 my-0"
        ><v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Day of month"
            class="my-0"
            color="blue1"
            v-model="dayOfMonthFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 my-0">
          <v-autocomplete
            :items="daysOfMonth"
            color="blue1"
            outlined
            v-model="repetition.dayOfMonth"
            item-text="name"
            return-object
            dense
            multiple
            :disabled="!dayOfMonthFlag"
          ></v-autocomplete> </v-col
      ></v-row>
      <!-- tiiiiiiime -->
      <v-row
        ><v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Hours"
            class="my-0"
            color="blue1"
            v-model="hoursFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 mt-n2">
          <div class="d-flex time_div">
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.hours"
                dense
                :disabled="!hoursFlag"
                @input="
                  timeExpression(exactTime.hours, 'hours', time.hoursRange)
                "
                min="0"
              ></v-autocomplete
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.hoursRange[0]"
                @input="
                  updateHourRange('hoursRange'),
                    timeExpression(exactTime.hours, 'hours', time.hoursRange)
                "
                type="number"
                dense
                max="24"
                :disabled="!hoursFlag"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.hoursRange[1]"
                type="number"
                dense
                :min="time.hoursRange[0]"
                max="24"
                :disabled="
                  exactTime.hours == 'At' || exactTime.hours == 'Every'
                "
                @input="
                  timeExpression(exactTime.hours, 'hours', time.hoursRange)
                "
              ></v-text-field
            ></v-col>
          </div> </v-col
      ></v-row>
      <!-- mins -->
      <v-row
        ><v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Minutes"
            class="my-0"
            color="blue1"
            v-model="minsFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 my-0">
          <div class="d-flex time_div">
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.mins"
                dense
                :disabled="!minsFlag"
                @input="timeExpression(exactTime.mins, 'mins', time.minsRange)"
                min="0"
              ></v-autocomplete
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.minsRange[0]"
                @input="
                  updateHourRange('minsRange'),
                    timeExpression(exactTime.mins, 'mins', time.minsRange)
                "
                type="number"
                dense
                max="60"
                :disabled="!minsFlag"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.minsRange[1]"
                type="number"
                dense
                :min="time.minsRange[0]"
                max="60"
                :disabled="exactTime.mins == 'At' || exactTime.mins == 'Every'"
                @input="timeExpression(exactTime.mins, 'mins', time.minsRange)"
              ></v-text-field
            ></v-col>
          </div> </v-col
      ></v-row>
      <!-- seconds -->
      <v-row
        ><v-col cols="4" class="py-0 my-0">
          <v-checkbox
            label="Seconds"
            class="my-0"
            color="blue1"
            v-model="secondsFlag"
          ></v-checkbox
        ></v-col>
        <v-col cols="8" class="py-0 my-0">
          <div class="d-flex time_div">
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.seconds"
                dense
                :disabled="!secondsFlag"
                @input="
                  timeExpression(
                    exactTime.seconds,
                    'seconds',
                    time.secondsRange
                  )
                "
                min="0"
              ></v-autocomplete
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.secondsRange[0]"
                type="number"
                max="60"
                dense
                @input="
                  updateHourRange('secondsRange'),
                    timeExpression(
                      exactTime.seconds,
                      'seconds',
                      time.secondsRange
                    )
                "
                :disabled="!secondsFlag"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.secondsRange[1]"
                type="number"
                dense
                :min="time.secondsRange[0]"
                :disabled="
                  exactTime.seconds == 'At' || exactTime.seconds == 'Every'
                "
                @input="
                  timeExpression(
                    exactTime.seconds,
                    'seconds',
                    time.secondsRange
                  )
                "
                max="60"
              ></v-text-field
            ></v-col>
          </div> </v-col
      ></v-row>
    </v-col>
    <v-col cols="6"
      ><v-textarea
        label="Description"
        class="my-0"
        color="blue1"
        v-model="repetition.description"
        outlined
        readonly
        @input="getRepetition"
      ></v-textarea>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Repetition",
  data() {
    return {
      repetition: {
        seconds: "*",
        hours: "*",
        mins: "*",
        month: [],
        dayOfMonth: [],
        dayOfWeek: [],
        description: "",
        secondsRange: [],
        hoursRange: [],
        minsRange: [],
        // ranges for time :""
      },
      time: { secondsRange: [], hoursRange: [], minsRange: [] },
      secondsFlag: false,
      minsFlag: false,
      dayOfWeekFlag: false,
      dayOfMonthFlag: false,
      hoursFlag: false,
      monthFlag: false,
      cronMsg: "Run Cron Job",
      dayDescription: "every day",
      monthDescription: " every month",
      dayOfMonthDescription: "",
      timeDescription: " every second",
      exactTime: {
        hours: "Every",
        mins: "Every",
        seconds: "Every",
      },
      errorMessages: {},
      listed: ["Every", "At", "From-To"],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months: [
        { key: 1, value: "January" },
        { key: 2, value: "Febuary" },
        // "March",
        // "April",
        // "May",
        // "June",
        // "July",
        // "August",
        // "September",
        // "October",
        // "Novmber",
        // "December",
      ],
      daysOfMonth: [],
      timesDescription: " every second",
      timesRepeation: "",

      // new thinking :
      hours: "*",
      mins: "*",
      seconds: "*",

      timeExplanation: "",
      eceryTimeExpression: [],
      fromTimeExp: "",
      toTimeExp: "",
    };
  },
  methods: {
    getRepetition() {
      try {
        // construct data and time according to v-models
        // check if one of them not assigned to *
        // time =this.hours:this.mints:this.seconds
        // date = this.month -this.dayOfMonth
        // last one days =this.days

        let hours = this.checkTimeRange(this.time.hoursRange);
        let mins = this.checkTimeRange(this.time.minsRange);
        let seconds = this.checkTimeRange(this.time.secondsRange);
        let dayOfMonth = this.repetition.dayOfMonth.map((el) => {
          return el.key;
        });
        let keysOfMonth = this.repetition.month.map((el) => {
          return el.key;
        });
        let time = `${hours}:${mins}:${seconds}`;
        let date = `${[...keysOfMonth]}-${[...dayOfMonth]}`;
        let repeation = this.createReption(
          date,
          time,
          this.repetition.dayOfWeek
        );
        if (!this.timesRepeation) {
          repeation = `* * * * ${[...repeation]}`;
        } else {
          repeation = `${this.timesRepeation} ${[...repeation]}`;
        }
        this.$emit("repeation", {
          repeation,
          description: this.repetition.description,
        });
      } catch (error) {
        console.log(error);
      }
    },
    createReption(date, time, dayOfWeek) {
      try {
        // * * * * * will get the date and start cron at this time
        let month = date.split("-")[0];
        let day = date.split("-")[1];
        let min = time.split(":")[1];
        let hour = time.split(":")[0];
        let seconds = time.split(":")[2];
        !day.length && (day = "*");
        !month.length && (month = "*");
        !dayOfWeek.length && (dayOfWeek = "*");

        let repetion = [` ${day} ${month} ${dayOfWeek}`];
        // console.log(month, day, min, hour, repetion, "moooooonth");
        return repetion;
      } catch (error) {
        throw new Error(error);
      }
    },
    changeDescriptionAccordingRepetion() {
      try {
        this.repetition.description = `${this.cronMsg} on ${this.dayDescription} in ${this.monthDescription} at ${this.timeDescription}`;
      } catch (error) {
        console.log(error);
      }
    },
    getNumericOrder() {
      try {
        for (let i = 1; i < 32; i++) {
          this.daysOfMonth.push({
            name: ` ${i}th day `,
            key: i,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateHourRange(model) {
      this.time[model][1] = this.time[model][0];
    },

    generateTimeDesc() {
      try {
        this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription} in ${this.monthDescription} ${this.timesDescription}`;
      } catch (error) {
        console.log(error);
      }
    },
    checkTimeRange(time) {
      try {
        // this function will be used when create cron job (repeation to check if range is same will retur the first one )

        let newTime = time;
        if (!time.length) {
          return "*";
        }
        if (time[0] === time[1]) {
          return (newTime = [time[0]]);
        }
        return newTime;
      } catch (error) {
        throw new Error(error);
      }
    },
    /////////////////// new thinking :
    handleTime(time, expression) {
      try {
        let formatedTime;
        let description = [];
        let [splitSec, splitMin, splitH] = time.split(" ");

        // variables :
        let hour = "00";
        let min = "00";
        let sec = "00";
        let fromH = "00";
        let fromM = "00";
        let fromSec = "00";
        let toH = "00";
        let toMin = "00";
        let toSec = "00";
        let everyArr = [];
        if (splitSec) {
          if (splitSec.includes("/")) {
            formatedTime = splitSec.split("/*")[1];

            everyArr.push("every " + formatedTime + "seconds");
          } else if (splitSec.includes("-")) {
            fromSec = splitSec.split("-")[0];
            toSec = splitSec.split("-")[1];
            fromSec.length == 1 && (fromSec = `0${fromSec}`);
            toSec.length == 1 && (toSec = `0${toSec}`);

            sec = fromSec;
          } else if (splitSec == "*") {
            sec = "0";
            everyArr.push(" every " + "1" + "second");
          } else if (splitSec !== "*") {
            splitSec.length == 1 && (splitSec = `0${splitSec}`);

            sec = splitSec;
          }
        }
        if (splitMin) {
          if (splitMin.includes("/")) {
            formatedTime = splitMin.split("/*")[1];

            everyArr.push(" every " + formatedTime + " minutes");
          } else if (splitMin.includes("-")) {
            fromM = splitMin.split("-")[0];
            toMin = splitMin.split("-")[1];
            fromM.length == 1 && (fromM = `0${fromM}`);
            toMin.length == 1 && (toMin = `0${toMin}`);
            min = fromM;
          } else if (splitMin == "*") {
            min = "0";
            everyArr.push(" every " + "1" + " minute");
          } else if (splitMin !== "*") {
            splitMin.length == 1 && (splitMin = `0${splitMin}`);

            min = splitMin;
          }
        }
        if (splitH) {
          if (splitH.includes("/")) {
            formatedTime = splitH.split("/*")[1];
            everyArr.push(" every " + formatedTime + " hours");
          } else if (splitH.includes("-")) {
            fromH = splitH.split("-")[0];
            toH = splitH.split("-")[1];
            fromH.length == 1 && (fromH = `0${fromH}`);
            toH.length == 1 && (toH = `0${toH}`);

            hour = fromH;
          } else if (splitH == "*") {
            hour = "0";
            everyArr.push(" every " + "1" + "hour");
          } else if (splitH !== "*") {
            splitH.length == 1 && (splitH = `0${splitH}`);
            hour = splitH;
          }
        }

        let exactTime = `${hour} : ${min} :${sec} O'clock`;
        let timeFrom = `${fromH} : ${fromM} :${fromSec} O'clock`;
        let timeTo = `${toH} : ${toMin} :${toSec} O'clock`;

        if (timeFrom !== "00 : 00 :00 O'clock") {
          if (
            hour !== "undefined" &&
            min !== "undefined" &&
            sec !== "undefined"
          ) {
            description.push(` from ${exactTime} `);
          }
        }
        if (timeTo !== "00 : 00 :00 O'clock") {
          if (
            hour !== "undefined" &&
            min !== "undefined" &&
            sec !== "undefined"
          ) {
            description.push(` to ${timeTo} `);
          }
        }
        if (everyArr.length) {
          description.push(` ${everyArr}`);
        }
        if (
          exactTime !== "00 : 00 :00 O'clock" &&
          timeFrom == "00 : 00 :00 O'clock"
        ) {
          if (
            hour !== "undefined" &&
            min !== "undefined" &&
            sec !== "undefined"
          ) {
            description.push(` at ${exactTime}`);
          }
        }

        // let description = [`at ${exactTime} ${timeFrom} ${timeTo}`, ...everyArr];
        console.log(description, "deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        return description;
      } catch (error) {
        console.log(error);
      }
    },
    formatTimeDesc(repeation) {
      try {
        let [sec, min, hour] = repeation.split(" ");
        this.handleTime(sec);
      } catch (error) {
        throw new Error(error);
      }
    },
    timeExpression(exactExpression, expression, time) {
      try {
        let TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
        if (exactExpression == "At") {
          switch (expression) {
            case "hours":
              this.hours = time[0];
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "mins":
              this.mins = time[0];
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "seconds":
              this.seconds = time[0];
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;

            default:
              break;
          }
        } else if (exactExpression == "Every") {
          switch (expression) {
            case "hours":
              this.hours = `/*${time[0]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "mins":
              this.mins = `/*${time[0]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "seconds":
              this.seconds = `/*${time[0]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;

            default:
              break;
          }
        } else if (exactExpression == "From-To") {
          switch (expression) {
            case "hours":
              this.hours = `${time[0]}-${time[1]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "mins":
              this.mins = `${time[0]}-${time[1]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "seconds":
              this.seconds = `${time[0]}-${time[1]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;

            default:
              TimeRepeation = TimeRepeation;
              break;
          }
        }
        let desc = this.handleTime(TimeRepeation);
        this.timesRepeation = TimeRepeation;
        this.timesDescription = [...desc];
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    "repetition.dayOfWeek"() {
      this.dayDescription = this.repetition.dayOfWeek;
      this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription} in ${this.monthDescription}  ${this.timesDescription}`;
    },
    "repetition.month"() {
      let arr = [];
      this.repetition.month.map((el) => {
        arr.push(`${el.value} `);
      });
      this.monthDescription = arr;
      // this.monthDescription = this.repetition.month;
      this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription}  in ${this.monthDescription}  ${this.timesDescription}`;
    },
    "repetition.dayOfMonth"() {
      let arr = [];
      this.repetition.dayOfMonth.map((el) => {
        arr.push(`${el.name} `);
      });
      this.dayOfMonthDescription = arr;
      this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription} in ${this.monthDescription}  ${this.timesDescription}`;
    },

    time: {
      handler(newValue, oldValue) {
        this.generateTimeDesc();
      },
      deep: true,
    },
    exactTime: {
      handler(newValue, oldValue) {
        this.generateTimeDesc();
      },
      deep: true,
    },
    "repetition.description"() {
      this.getRepetition();
    },
  },
  mounted() {
    this.changeDescriptionAccordingRepetion();
    this.getNumericOrder();
  },
};
</script>

<style lang="css" scoped>
@import "../style/dialog.css";

.time_div {
  margin-left: -12px;
  margin-top: -26px;
}
.check_btn {
  margin-left: 45%;
  margin-top: 4%;
}
.msg {
  margin-top: -5%;
  margin-left: 14%;
}
</style>
