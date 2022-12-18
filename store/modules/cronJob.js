import { getSettings } from "../../static/services/scheduledJobs";

const CronJob = {
  namespace: true,
  state: {
    status: {
      stopped: {},
      paused: {},
      running: {},
    },
    historyStatus: [],
    cronJobsStatus: [],
  },

  mutations: {
    SET_CRON_SETTINGS(state, payload) {
      payload.map((el) => {
        el.key === "history_status" && (state.historyStatus = el.value);
        el.key == "job_status" && (state.cronJobsStatus = el.value);
      });

      // set Status
      state.cronJobsStatus.map((el) => {
        switch (el.id) {
          case "stopped123":
            state.status.stopped = el;
            break;
          case "paused123":
            state.status.paused = el;
            break;
          case "running123":
            state.status.running = el;
            break;

          default:
            break;
        }
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
  },
  actions: {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    async fetchCronJobsSettings({ commit }) {
      try {
        const response = await getSettings();
        commit("SET_CRON_SETTINGS", response.rows);
      } catch (error) {
        throw error;
      }
    },
  },

  getters: {
    getCronStatus(state) {
      return state.status;
    },
    getCronHistoryStatus(state) {
      return state.historyStatus;
    },
    getCronJobsStatus(state) {
      return state.cronJobsStatus;
    },
  },
};

export default CronJob;
