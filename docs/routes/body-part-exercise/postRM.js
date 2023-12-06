module.exports = {
  post: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "운동부위 리포트 전송",
    operationId: "addBodyPartExercise",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              exercise_part: {
                example: "shoulders",
              },
              weight: {
                example: 20,
              },
            },
          },
        },
      },
    },

    // expected responses
    responses: {
      // response code
      201: {
        description: "운동부위 리포트 등록 성공",
      },
    },
  },
};
