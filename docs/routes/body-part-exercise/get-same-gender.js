module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "Get same user average ",
    operationId: "getsameUsersBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Same users average obtained successfully", // response desc.
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
