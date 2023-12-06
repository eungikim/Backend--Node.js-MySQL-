module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "특정 유저운동을 가져옵니다.",
    operationId: "getOneUserExerciseMy", // unique operation id
    parameters: [
      // expected params.
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true, // Mandatory param
        description: "운동 idx",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "가져오기 성공",
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
        content: {
          "application/json": {
            message: "No exercise is found by this id",
          },
        },
      },
    },
  },
};
