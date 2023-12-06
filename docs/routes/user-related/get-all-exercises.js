module.exports = {
  // method of operation
  get: {
    tags: ["User operations"],
    description: "운동 모두 가져오기",
    operationId: "getAllExercisesU", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "가져오기 성공", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Exercise",
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
