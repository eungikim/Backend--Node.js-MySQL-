module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "Get my today exercises",
    operationId: "getTodayExercise", // unique operation id
    parameters: [],
    // expected responses
    responses: {
      200: {
        description: "User's today exercises are obtained successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },
      404: {
        description: "No exercise is found by this day",
      },
    },
  },
};
