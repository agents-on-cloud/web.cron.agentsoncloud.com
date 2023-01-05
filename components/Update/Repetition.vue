<template>
  <div class="d-flex">
    <v-col cols="6">
      <v-row class="py-0 my-0"
        ><v-col cols="4" class="py-0 my-0">
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
                @input="
                  timeExpression(exactTime.hours, 'hours', time.hoursRange)
                "
              ></v-text-field
            ></v-col>
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.hours"
                dense
                :error-messages="errorMessages.feature"
              ></v-autocomplete
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
                @input="timeExpression(exactTime.mins, 'mins', time.minsRange)"
              ></v-text-field
            ></v-col>
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.mins"
                dense
                :error-messages="errorMessages.feature"
              ></v-autocomplete
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
            <v-col cols="4">
              <v-text-field
                outlined
                required
                v-model="time.secondsRange[0]"
                type="number"
                dense
                @input="
                  updateHourRange('secondsRange'),
                    timeExpression(
                      exactTime.seconds,
                      'seconds',
                      time.secondsRange
                    )
                "
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
                @input="
                  timeExpression(
                    exactTime.seconds,
                    'seconds',
                    time.secondsRange
                  )
                "
              ></v-text-field
            ></v-col>
            <v-col cols="5">
              <v-autocomplete
                :items="listed"
                color="blue1"
                outlined
                v-model="exactTime.seconds"
                dense
                :error-messages="errorMessages.feature"
              ></v-autocomplete
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
      <!-- <div class="msg">
        <h3 class="blue2--text">
          if you agreed on description click btn below
        </h3>
      </div>
      <div class="check_btn">
        <v-btn @click="getRepetition"
          ><v-icon color="green"> mdi-check </v-icon></v-btn
        >
      </div> -->
    </v-col>
  </div>
</template>

<script>
export default {
  name: "Repetition",
  props: ["intialRepetition"],
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
      days: ["Sunday", "Monday"],
      months: ["January", "Febuary"],
      daysOfMonth: [],
      timesDescription: "",
      intialDesc: "",
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

        let dayOfMonth = this.repetition.dayOfMonth.map((el) => {
          return el.key;
        });
        let date = `${[...this.repetition.month]}-${[...dayOfMonth]}`;
        let repeation = this.createReption(date, this.repetition.dayOfWeek);
        repeation = `${this.timesRepeation} ${[...repeation]}`;
        this.$emit("repeation", {
          repeation,
          description: this.repetition.description,
        });
        console.log(repeation, "repeationrepeationrepeation");
      } catch (error) {
        console.log(error);
      }
    },
    createReption(date, dayOfWeek) {
      try {
        // * * * * * will get the date and start cron at this time
        let month = date.split("-")[0];
        let day = date.split("-")[1];
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
        this.repetition.description = `${this.cronMsg} on ${this.dayDescription} in ${this.monthDescription} ${this.timesDescription}`;
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
    generateTime(time) {
      try {
        let newTime = time;
        if (!time.length) {
          return "0";
        }
        if (time[0] === time[1]) {
          return (newTime = [time[0]]);
        }
        return newTime;
      } catch (error) {
        throw new Error(error);
      }
    },
    getIndecationPreposition(word, timeExpression) {
      try {
        let expression = timeExpression;
        if (word === "At") return;

        if (word == "Every") {
          switch (timeExpression) {
            case "hour":
              expression = "hour";
              break;
            case "min":
              expression = "minutes";
              break;
            case "second":
              expression = "second";
              break;
            default:
              break;
          }
          return expression;
        }
      } catch (error) {
        throw new Error(error);
      }
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
    handleIntialTime(time, expresiion) {
      try {
        let formatedTime = time;
        if (time == "*") {
          formatedTime = [1];
          return [formatedTime, (this.exactTime[expresiion] = "Every")];
        }
        if (time.includes("/")) {
          formatedTime = time.split("/")[1];
          return [[formatedTime], (this.exactTime[expresiion] = "Every")];
        }

        if (time.includes("-")) {
          formatedTime = [time.split("-")[0], time.split("-")[1]];
          return [formatedTime, (this.exactTime[expresiion] = "From-To")];
        }

        return [[formatedTime], (this.exactTime[expresiion] = "At")];
      } catch (error) {
        console.log(error);
      }
    },
    handleIntialDate(date, expression) {
      try {
        console.log(date, "daaaaaaaaaaaaaaate");
        let formatedDate = date;

        if (date == "*") {
          if (expression == "dayOfMonth") {
            let obj = {
              key: "",
              name: "",
            };
            formatedDate = { ...obj };
          }
          return [formatedDate];
        } else if (date.length == 1) {
          if (expression == "dayOfMonth") {
            let obj = {
              key: date,
              name: ` ${date}th day `,
            };
            formatedDate = { ...obj };
          }
          return [formatedDate];
        } else {
          let arr = [];
          if (expression == "dayOfMonth") {
            date.split(",").map((el) => {
              arr.push({
                key: el,
                name: ` ${el}th day `,
              });
            });
          } else {
            date.split(",").map((el) => {
              arr.push(el);
            });
          }

          formatedDate = arr;
          return formatedDate;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    handleIntialRepetition(repeation) {
      try {
        let [seconds, mins, hours, dayOfMonth, month, day] =
          repeation.split(" ");

        this.time.secondsRange = this.handleIntialTime(seconds, "seconds")[0];
        this.time.minsRange = this.handleIntialTime(mins, "mins")[0];
        this.time.hoursRange = this.handleIntialTime(hours, "hours")[0];
        this.repetition.dayOfMonth = this.handleIntialDate(
          dayOfMonth,
          "dayOfMonth"
        )[0];
        this.repetition.month = this.handleIntialDate(month)[0];
        this.repetition.dayOfWeek = this.handleIntialDate(day)[0];
      } catch (error) {
        console.log(error);
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

        if (splitSec.includes("/")) {
          formatedTime = splitSec.split("/")[1];

          everyArr.push("every " + formatedTime + "seconds");
        }
        if (splitSec.includes("-")) {
          fromSec = splitSec.split("-")[0];
          toSec = splitSec.split("-")[1];
          sec = fromSec;
          // toH = fromH;
          // toMin = fromM;
        }
        if (splitSec.length == 1 && splitSec !== "*") {
          sec = splitSec;
        }
        if (splitSec == "*") {
          sec = "0";
          everyArr.push(" every " + "1" + "second");
        }

        if (splitMin.includes("/")) {
          formatedTime = splitMin.split("/")[1];

          everyArr.push(" every " + formatedTime + " minutes");
        }
        if (splitMin.includes("-")) {
          fromM = splitMin.split("-")[0];
          toMin = splitMin.split("-")[1];
          // toH = fromH;
          // toSec = fromSec;
          min = fromM;
        }
        if (splitMin.length == 1 && splitMin !== "*") {
          min = splitMin;
        }
        if (splitMin == "*") {
          min = "0";
          everyArr.push(" every " + "1" + " minute");
        }
        if (splitH.includes("/")) {
          formatedTime = splitH.split("/")[1];
          everyArr.push(" every " + formatedTime + " hours");
        }
        if (splitH.includes("-")) {
          fromH = splitH.split("-")[0];
          toH = splitH.split("-")[1];
          hour = fromH;
          // toMin = fromM;
          // toSec = fromSec;
        }
        if (splitH.length == 1 && splitH !== "*") {
          hour = splitH;
        }
        if (splitH == "*") {
          hour = "0";
          everyArr.push(" every " + "1" + "hour");
        }

        let exactTime = `${hour} : ${min} :${sec} O'clock`;
        let timeFrom = `${fromH} : ${fromM} :${fromSec} O'clock`;
        let timeTo = `${toH} : ${toMin} :${toSec} O'clock`;

        if (timeFrom !== "00 : 00 :00 O'clock") {
          description.push(`from ${exactTime}`);
        }
        if (timeTo !== "00 : 00 :00 O'clock") {
          description.push(`to ${timeTo}`);
        }
        if (everyArr.length) {
          description.push(` ${everyArr}`);
        }
        if (
          exactTime !== "00 : 00 :00 O'clock" &&
          timeFrom == "00 : 00 :00 O'clock"
        ) {
          description.push(`at ${exactTime}`);
        }

        // let description = [`at ${exactTime} ${timeFrom} ${timeTo}`, ...everyArr];
        // console.log(description, "deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
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
              this.hours = `/${time[0]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "mins":
              this.mins = `/${time[0]}`;
              TimeRepeation = `${this.seconds} ${this.mins} ${this.hours}`;
              break;
            case "seconds":
              this.seconds = `/${time[0]}`;
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
        console.log(TimeRepeation, "TimeRepeation");
        // this.repetition = TimeRepeation;
        let desc = this.handleTime(TimeRepeation);
        this.timesRepeation = TimeRepeation;
        this.timesDescription = [...desc];

        // let formatedTime = formatTimeExpression(
        //   this.time,
        //   exactExpression,
        //   this.exactTime
        // );
        // console.log(formatedTime, "formatedTime");
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
      this.monthDescription = this.repetition.month;
      this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription}  in ${this.monthDescription} ${this.timesDescription}`;
    },
    "repetition.dayOfMonth"() {
      let arr = [];
      if (this.repetition.dayOfMonth !== "*") {
        this.repetition.dayOfMonth.map((el) => {
          arr.push(`${el.name} `);
        });
      }

      this.dayOfMonthDescription = arr;
      this.repetition.description = `${this.cronMsg} on ${this.dayDescription} ${this.dayOfMonthDescription} in ${this.monthDescription} ${this.timesDescription}`;
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
    intialRepetition: {
      handler(newValue, oldValue) {
        let { description, repeation } = this.intialRepetition;
        let [sec, min, hour] = repeation.split(" ");
        let time = `${hour} ${min} ${sec}`;
        let desc = this.handleTime(time);
        this.timesDescription = [...desc];
        this.repetition.description = description;
        this.handleIntialRepetition(repeation);
      },
      deep: true,
    },
  },
  mounted() {
    // this.changeDescriptionAccordingRepetion();
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
