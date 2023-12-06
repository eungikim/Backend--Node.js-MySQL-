module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-exercise operations"],
    description: "운동 삭제",
    operationId: "deleteExercise",
    parameters: [
      // expected parameters
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/id",
        },
        required: true,
        description: "삭제할 운동 idx",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "삭제 성공",
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
