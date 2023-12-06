module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-exercise operations"],
    description: "특정 운동을 가져옵니다.",
    operationId: "getOneExercise", // unique operation id
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
        description: "운동 가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Exercise",
            },
          },
        },
      },
      404: {
        description: "idx 가 없습니다",
        content: {
          "application/json": {
            message: "No exercise is found by this id",
          },
        },
      },
    },
  },
};
