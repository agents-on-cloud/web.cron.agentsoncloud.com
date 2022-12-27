const axios = require("axios").default;
const getScheduledCronRecords = async (DTO) => {
  try {
    // console.log(DTO, "DTOOOOOOOOOOOOOOO");
    // const { data } = await axios.post(
    //   "http://localhost:50303/cron/scheduledJob/getScheduledJob",

    //   DTO
    // );
    const { data } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/getScheduledJob",
      data: DTO,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
const deleteScheduledJob = async (DTO) => {
  try {
    // console.log(DTO, "DTOOOOOOOOOOOOOOO");
    // const { data } = await axios.post(
    //   "http://localhost:50303/cron/scheduledJob/deleteScheduledJobs",

    //   DTO
    // );
    const { data } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/deleteScheduledJobs",
      data: DTO,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
const getScheduledHistoryRecords = async (DTO) => {
  try {
    console.log(DTO, "DTOOOOOOOOOOOOOOO");
    // const { data } = await axios.post(
    //   "http://localhost:50303/cron/history/getCronHistorys",

    //   DTO
    // );

    const { data } = await window.$nuxt.$axios({
      path: "/cron/history/getCronHistorys",
      data: DTO,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
const updateCronJobRecord = async (DTO) => {
  try {
    // const { data, status } = await axios.post(
    //   "http://localhost:50303/cron/scheduledJob/updateScheduledJob",

    //   DTO
    // );
    const { data, status } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/updateScheduledJob",
      data: DTO,
    });
    return [data, status];
  } catch (error) {
    console.log(error);
  }
};
const getSettings = async (DTO) => {
  try {
    const { data } = await axios.post(
      "http://localhost:50303/cron/setting/getSettings",

      DTO
    );
    // const { data } = await window.$nuxt.$axios({
    //   path: "/cron/setting/getSettings",
    //   data: DTO,
    // });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const addscheduledCronJob = async (DTO) => {
  try {
    const { data, status } = await axios.post(
      "http://localhost:50303/cron/scheduledJob/createScheduledJob",

      DTO
    );
    // const { data,status } = await window.$nuxt.$axios({
    //   path: "/cron/scheduledJob/createScheduledJob",
    //   data: DTO,
    // });
    return [data, status];
  } catch (error) {
    console.log(error);
  }
};
const changeCronStatus = async (DTO) => {
  try {
    const { data } = await axios.post(
      "http://localhost:50303/cron/scheduledJob/changeCronStatus",

      DTO
    );
    // const { data } = await window.$nuxt.$axios({
    //   path: "/cron/scheduledJob/changeCronStatus",
    //   data: DTO,
    // });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getFeatures = async (DTO) => {
  try {
    const { data } = await window.$nuxt.$axios({
      path: `/lookups/getAllFeatures`,

      data: DTO,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
const getVirtualEnPoints = async (DTO) => {
  try {
    // const { data } = await window.$nuxt.$axios({
    //   path: "/getVirtualEnPoints",
    // });
    const { data } = await axios.post(
      "https://api.development.agentsoncloud.com/getVirtualEndpoint"
    );
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getScheduledCronRecords,
  getScheduledHistoryRecords,
  updateCronJobRecord,
  getSettings,
  addscheduledCronJob,
  changeCronStatus,
  getFeatures,
  deleteScheduledJob,
  getVirtualEnPoints,
};
