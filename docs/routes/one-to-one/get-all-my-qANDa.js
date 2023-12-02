module.exports = {
  // operation's method
  get: {
    tags: ["User-to-Question operations"],
    description: "Get all my questions with their answers",
    operationId: "getAllAnswersQuestions", // unique operation id
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: "User's questions with answers obtained successfully",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ONEtoONE",
            },
          },
        },
      },

      404: {
        description: "No question is found for this id",
      },
    },
  },
};
