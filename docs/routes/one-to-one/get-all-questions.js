module.exports = {
  get: {
    tags: ["Admin-to-Question operations"],
    description: "문의사항 모두 가져오기",
    operationId: "getQuestions",
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
    },
  },
};
