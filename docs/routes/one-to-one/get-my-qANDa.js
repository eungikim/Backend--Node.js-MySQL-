module.exports = {
  // operation's method
  get: {
    tags: ["User-to-Question operations"],
    description: "Get one answer for my one question",
    operationId: "getOneAnswerQuestion", // unique operation id
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
        description: "User's question obtained successfully",
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
