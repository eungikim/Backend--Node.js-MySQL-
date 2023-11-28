module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "Get my exercise for a specific date",
    operationId: "getOneExerciseByDate", // unique operation id
    parameters: [
      // expected params.
      {
        name: "year",
        in: "path",
        required: true, // Mandatory param
        description: "A desired year",
      },
      {
        name: "month",
        in: "path",
        required: true, // Mandatory param
        description: "A desired month",
      },
      {
        name: "day",
        in: "path",
        required: true, // Mandatory param
        description: "A desired dat",
      },
    ],
    // expected responses
    responses: {
      200: {
        description:
          "User's exercise for the give date is obtained successfully",
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
