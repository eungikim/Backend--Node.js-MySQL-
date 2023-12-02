module.exports = {
  // operation's method
  get: {
    tags: ["User-to-Question operations"],
    description: "Get all questions with their answers",
    operationId: "getAllAnswerQuestion", // unique operation id
    parameters: [],

    responses: {
      200: {
        description: "User's questions with answers obtained successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ONEtoONE",
            },
          },
        },
      },

      404: {
        description: "No question is found for this id",
        content: {
          "application/json": {
            message: "No question is found for this id",
          },
        },
      },
    },
  },
};
