module.exports = {
  // operation's method
  put: {
    tags: ["Admin-to-Question operations"],
    description: "답변하기",
    operationId: "giveAnswer",
    parameters: [
      {
        name: "question_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/ONEtoONE/properties/id",
        },
        required: true, // Mandatory param
        description: "문의사항 idx",
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              questionText: {
                questionText: "답변 내용",
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
        description: "답변 성공",
      },

      404: {
        description: "가져오기 실패",
        content: {
          "application/json": {
            message: "No question is found for this id",
          },
        },
      },
    },
  },
};
