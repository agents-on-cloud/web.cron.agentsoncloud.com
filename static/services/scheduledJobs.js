const axios = require("axios").default;
const getScheduledCronRecords = async (DTO) => {
  try {
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

    const { data } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/deleteScheduledJob",
      data: DTO,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
const getScheduledHistoryRecords = async (DTO) => {
  try {
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

    const { data } = await window.$nuxt.$axios({
      path: "/cron/setting/getSettings",
      data: DTO,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const addscheduledCronJob = async (DTO) => {
  try {
    const { data, status } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/createScheduledJob",
      data: DTO,
    });
    return [data, status];
  } catch (error) {
    console.log(error);
  }
};
const changeCronStatus = async (DTO) => {
  try {
    const { data } = await window.$nuxt.$axios({
      path: "/cron/scheduledJob/changeCronStatus",
      data: DTO,
    });
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
    const { data } = await window.$nuxt.$axios({
      path: `/getVirtualEndpoint`,
      data: DTO,
      gatewayRequest: true,
    });
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
