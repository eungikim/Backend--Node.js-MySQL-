module.exports = {
  // operation's method
  get: {
    tags: ["User-to-Question operations"],
    description: "문의사항과 답변을 모두 가져옵니다",
    operationId: "getAllAnswersQuestions", // unique operation id
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: "가져오기 성공",
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
        description: "가져오기 실패",
      },
    },
  },
};
