module.exports = {
  post: {
    tags: ["Admin-to-exercise operations"],
    description: "운동 생성",
    operationId: "addExercise",
    parameters: [],
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
      201: {
        description: "운동 생성 성공",
      },
      // response code
      500: {
        description: "운동 추가 에러",
      },
    },
  },
};
