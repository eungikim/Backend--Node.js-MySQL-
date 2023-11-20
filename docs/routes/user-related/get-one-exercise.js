module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "Get a specific exercise",
    operationId: "getOneExercise", // unique operation id
    parameters: [
      // expected params.
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true, // Mandatory param
        description: "A single exercise id",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "Exercise is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Exercise",
            },
          },
        },
      },
      404: {
        description: "No exercise is found by this id",
        content: {
          "application/json": {
            message: "No exercise is found by this id",
          },
        },
      },
    },
  },
};
