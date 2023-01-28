<template>
  <div class="hello">
    <p>
      <small class="date-time-error-message"> {{ errorMessage }}</small>
    </p>
    <imask-input
      class="date-time-input"
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
            message: "Invalid day input.",
            query: day.length === 2 && day <= 31 && day > 0,
          },
          {
            message: "Invalid minute input.",
            query: month.length === 2 && month <= 12 && month > 0,
          },
          {
            message: "Invalid year input.",
            query: year.length === 4 && year <= 2100 && year > 2022,
          },
          {
            message: "Invalid hour format (00-23)",
            query: thisHour.length === 2 && thisHour >= 0 && thisHour < 24,
          },
          {
            message: "Invalid minute.",
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
        this[errorDataModel] = "Invalid date format.";
      }
    },
  },
  props: {
    hourFormat: {
      type: Number,
      default: 24,
      required: false,
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

<style scoped>
.date-time-error-message {
  color: red;
  margin-left: 5px;
}
.date-time-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(229, 229, 229);
  text-indent: 10px;
}
.date-time-input:focus {
  outline: none;
  border: 1px solid rgb(175, 175, 175);
}
</style>
