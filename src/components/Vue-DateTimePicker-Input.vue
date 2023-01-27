<template>
  <div class="hello">
    <p>Input: {{ dateInput }}</p>
    <p>Error: {{ errorMessage }}</p>
    <p>Success: {{ dateSuccess }}</p>

    <imask-input
      v-model="dateInput"
      mask="**-**-**** **:**"
      :lazy="false"
      radix="/"
      :unmask="false"
    />
  </div>
</template>

<script>
import { IMaskComponent } from "vue-imask";

export default {
  name: "HelloWorld",
  components: {
    "imask-input": IMaskComponent,
  },
  data() {
    return {
      dateInput: "",
      errorMessage: "",
      dateSuccess: "",
    };
  },
  methods: {
    checkDateTimeValid(val, errorDataModel, successDataModel) {
      try {
        let [day, month, yearTime] = val.replaceAll("_", "").split("-");

        let year_hours = yearTime.split(" "),
          hours = year_hours[1],
          splittedTime = hours.split(":"),
          thisHour = splittedTime[0];

        let year = yearTime.split(" ")[0];
        const errors = [
          {
            message: "Day input must be between 01 and 31.",
            query: day.length === 2 && day <= 31 && day > 0,
          },
          {
            message: "Month input must be between 01 and 12.",
            query: month.length === 2 && month <= 12 && month > 0,
          },
          {
            message: "The year were you inputted wrong. (2022 - 2100)",
            query: year.length === 4 && year <= 2100 && year > 2022,
          },
          {
            message: "Hour input must be between 01 and 23.",
            query: thisHour.length === 2 && thisHour >= 0 && thisHour < 24,
          },
          {
            message: "Minute input must be between 00 and 59.",
            query:
              splittedTime[1].length === 2 &&
              splittedTime[1] <= 59 &&
              splittedTime[1] >= 0,
          },
        ];
        let i = 0;

        while (errors[i]) {
          if (!errors[i].query) {
            this[errorDataModel] = errors[i].message;
            this[successDataModel] = "";
            break;
          }
          this[errorDataModel] = "";
          this[successDataModel] = val;

          i++;
        }
      } catch (err) {
        console.log(err);
        this[errorDataModel] = "Girdiğiniz tarih formatı hatalı";
      }
    },
  },
  watch: {
    dateInput: function (val) {
      // ACCEPTABLE INPUT DATE FORMAT GONNA BE ADDED.
      this.checkDateTimeValid(val, "errorMessage", "dateSuccess");
    },
    dateSuccess: function (val) {
      // OUTPUT DATE FORMAT (PROP) GONNA BE ADDED.
      this.dateSuccess = new Date(val).toISOString();
    },
  },
};
</script>

<style scoped></style>
