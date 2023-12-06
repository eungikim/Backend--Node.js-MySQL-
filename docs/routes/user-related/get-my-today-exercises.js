module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "오늘자 유저운동 가져오기",
    operationId: "getTodayExercise", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      200: {
        description: "유저운동 가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },
      404: {
        description: "운동을 찾을 수 없습니다",
      },
    },
  },
};
