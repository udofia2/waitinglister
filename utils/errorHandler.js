module.exports = mongooseIdError = (err, response) => {
  if (err.name === "CastError") {
    const model = err.message.split(" ").pop();

    return response.status(400).json({
      status: "fail",
      Error: err.name,
      // ErrorMessage: err.message,
      instruction: `The ID  [ ${
        err.value
      } ] is not a valid ID, please provide a valid ${model.replace(
        /['"]+/g,
        ""
      )}Id`,
    });
  }

  // response.json(err);
};
