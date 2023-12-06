module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "성별 평균",
    operationId: "getsameUsersBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "성별 평균 가저오기 성공", // response desc.
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
