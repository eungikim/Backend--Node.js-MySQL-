module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-user operations"],
    description: "유저의 모든 운동 가져오기",
    operationId: "getUserExercises", // unique operation id.
    parameters: [
      {
        name: "user_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/User/properties/id",
        },
        required: true, // Mandatory param
        description: "유저 idx",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "운동 가져오기 성공", // response desc.
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
