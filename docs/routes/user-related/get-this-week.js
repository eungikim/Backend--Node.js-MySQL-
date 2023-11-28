module.exports = {
  // method of operation
  get: {
    tags: ["User operations"],
    description: "Get my exercises for the the last 7 day (including today)",
    operationId: "getWeekMyExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description:
          "Exercise of the past 7 days (including today) obtained successfully", // response desc.
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
