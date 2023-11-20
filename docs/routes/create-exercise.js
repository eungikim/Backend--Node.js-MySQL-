module.exports = {
  post: {
    tags: ["Admin operations"],
    description: "Create exercise",
    operationId: "addExercise",
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ExerciseInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Exercise created successfully",
      },
      // response code
      500: {
        description: "Error when adding exercise",
      },
    },
  },
};
