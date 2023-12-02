module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "Get total user average ",
    operationId: "getAllUsersBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Total users average obtained successfully", // response desc.
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
