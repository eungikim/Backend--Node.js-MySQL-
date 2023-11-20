module.exports = {
  // method of operation
  get: {
    tags: ["User operations"],
    description: "Get all my exercises",
    operationId: "getAllMyExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All user_exercises are obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },

      400: {
        description: "No exercise is found",
      },
    },
  },
};
