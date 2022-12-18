const axios = require("axios").default;
const getScheduledCronRecords = async (DTO) => {
  try {
    // console.log(DTO, "DTOOOOOOOOOOOOOOO");
    const { data } = await axios.post(
      "http://localhost:50303/cron/scheduledJob/getScheduledJob",

      DTO
    );
    // const { data } = await window.$nuxt.$axios({
    //   path: "/performance/processMap/getProcessMaps",
    //   data: DTO,
    // });

    return data;
  } catch (error) {
    throw error;
  }
};
const getScheduledHistoryRecords = async (DTO) => {
  try {
    console.log(DTO, "DTOOOOOOOOOOOOOOO");
    const { data}= await axios.post(
      "http://localhost:50303/cron/history/getCronHistorys",

      DTO
    );

    // const { data } = await window.$nuxt.$axios({
    //   path: "/performance/processMap/getProcessMaps",
    //   data: DTO,
    // });

    return data;
  } catch (error) {
    throw error;
  }
};
const deleteTemplate = async (DTO) => {
  try {
    const { data, status } = await axios.post(
      "http://localhost:30354/edt/deleteEdTemplate",

      DTO
    );
    return [data, status];
  } catch (error) {
    console.log(error);
  }
};
const updateTemplate = async (DTO) => {
  try {
    const { data, status } = await axios.post(
      "http://localhost:30354/edt/updateEdTemplate",

      DTO
    );
    console.log(data, "data");
    return [data, status];
  } catch (error) {
    console.log(error);
  }
};
const getHistoriesRecords = async (DTO) => {
  try {
    const { data } = await axios.post(
      "http://localhost:30354/history/getHistoryFiles",

      DTO
    );
    console.log(data, "data");
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
module.exports = {
  getScheduledCronRecords,
  getScheduledHistoryRecords,
};
