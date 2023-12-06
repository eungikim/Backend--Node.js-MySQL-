module.exports = {
  // method of operation
  get: {
    tags: ["User operations"],
    description: "유저운동 7일치 가져오기 오늘포함",
    operationId: "getWeekMyExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "유저운동 가져오기 성공", // response desc.
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
