module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "유저 평균",
    operationId: "getAllUsersBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "유저 평균 가져오기 성공", // response desc.
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
                gender: {
                  example: "male",
                },
              },
            },
          },
        },
      },
    },
  },
};
