import Calendar from './calendar.vue';

export { Calendar };
export default {
  install(Vue) {
    Vue.component(Calendar.name, Calendar);
  }
};
