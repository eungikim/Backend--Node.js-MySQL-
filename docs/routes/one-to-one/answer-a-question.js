module.exports = {
  // operation's method
  put: {
    tags: ["Admin-to-Question operations"],
    description: "Give an answer for a question",
    operationId: "giveAnswer",
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

    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              questionText: {
                questionText: "The text of the answer",
                type: "string",
                example: "You can improve your exercise",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Question is answered successfully",
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
