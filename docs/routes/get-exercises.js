module.exports = {
  // method of operation
  get: {
    tags: ["Admin operations"],
    description: "Get all exercises",
    operationId: "getAllExercises", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All exercises are obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Exercise",
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
