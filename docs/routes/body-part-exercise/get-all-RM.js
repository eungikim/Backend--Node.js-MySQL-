module.exports = {
  // method of operation
  get: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "Get all my body part exercises",
    operationId: "getAllBodyPart", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All exercise_parts are obtained successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bodyPartExercise",
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
