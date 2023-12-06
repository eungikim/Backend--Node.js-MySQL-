module.exports = {
  // operation's method
  patch: {
    tags: ["Admin-to-exercise operations"],
    description: "운동 업데이트",
    operationId: "updateExercise",
    parameters: [
      // expected params
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true,
        description: "업데이트 할 운동 idx",
      },
    ],
    // expected request
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ExerciseInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "업데이트 성공",
      },
      // response code
      404: {
        description: "운동을 찾을 수 없습니다",
      },
      // response code
      500: {
        description: "내부 에러",
      },
    },
  },
};
