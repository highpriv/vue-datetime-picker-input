import VueDateTimePickerInput from "./components/Vue-DateTimePicker-Input.vue";

const VueDateTimePicker = {
  install(Vue) {
    Vue.component("vue-datetimepicker-input", VueDateTimePickerInput);
  },
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueDateTimePicker);
}

export default VueDateTimePicker;
