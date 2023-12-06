module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-exercise operations"],
    description: "모든 운동을 가져옵니다",
    operationId: "getAllExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "가져오기 완료", // response desc.
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
        description: "찾을 수 없습니다",
      },
    },
  },
};
