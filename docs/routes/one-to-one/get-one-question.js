module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-Question operations"],
    description: "Get a specific question",
    operationId: "getOneQuestion", // unique operation id
    parameters: [
      {
        name: "question_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/ONEtoONE/properties/id",
        },
        required: true, // Mandatory param
        description: "A single question id",
      },
    ],

    responses: {
      200: {
        description: "Question is obtained successfully",
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
