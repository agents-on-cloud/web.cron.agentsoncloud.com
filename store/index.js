import Vuex from "vuex";
import cronJob from "./modules/cronJob";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cronJob,
    },
  });
};

export default createStore;
