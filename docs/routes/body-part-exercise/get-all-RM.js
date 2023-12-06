module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "운동부위를 모두 가져옵니다",
    operationId: "getAllBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "운동부위 모두 가져오기 성공", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bodyPartExercise",
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
