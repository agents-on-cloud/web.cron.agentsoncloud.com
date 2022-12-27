const formatTimeExpression = (time, currentExpression, expression) => {
  try {
    let formated;
    switch (currentExpression) {
      case "At":
        formated = convertTme(time, expression);
        break;

      default:
        break;
    }
    return formated;
  } catch (error) {
    throw new Error(error);
  }
};
const convertTme = (time, expression) => {
  try {
    let formatedTime;
    if (
      expression.hours == "At" &&
      expression.mins == "At" &&
      expression.seconds == "At"
    ) {
      formatedTime = `${time.hoursRange[0]} :${time.minsRange[0]} : ${time.secondsRange[0]}`;
    }
    if (expression.hours == "At") {
      formatedTime = `${time.hoursRange[0]}:"00":"00" O'clock`;
    }
    return formatedTime;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  formatTimeExpression,
};
