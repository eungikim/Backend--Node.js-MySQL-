module.exports = {
  get: {
    tags: ["Admin-to-Question operations"],
    description: "Get all question",
    operationId: "getQuestions",
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: "All questions obtained successfully",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ONEtoONE",
            },
          },
        },
      },
    },
  },
};
