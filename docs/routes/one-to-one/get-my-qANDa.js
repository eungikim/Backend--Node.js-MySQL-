module.exports = {
  // operation's method
  get: {
    tags: ["User-to-Question operations"],
    description: "문의사항과 답변을 하나 가져옵니다",
    operationId: "getOneAnswerQuestion", // unique operation id
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

    responses: {
      200: {
        description: "가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ONEtoONE",
            },
          },
        },
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
