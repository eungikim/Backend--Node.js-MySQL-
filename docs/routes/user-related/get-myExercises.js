module.exports = {
  // method of operation
  get: {
    tags: ["User operations"],
    description: "내 운동 모두 가져오기",
    operationId: "getAllMyExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "유저운동 모두 가져오기 성공", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },

      400: {
        description: "운동을 찾을 수 없습니다",
      },
    },
  },
};
