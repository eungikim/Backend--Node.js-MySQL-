module.exports = {
  post: {
    tags: ["User-to-Question operations"],
    description: "질문 등록하기",
    operationId: "askQuestion",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              questionText: {
                questionText: "The text of the question",
                type: "string",
                example: "How to improve my exercise?",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "질문 등록하기 성공",
      },
    },
  },
};
