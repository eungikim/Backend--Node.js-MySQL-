module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-exercise operations"],
    description: "Deleting an exercise",
    operationId: "deleteExercise",
    parameters: [
      // expected parameters
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/id",
        },
        required: true,
        description: "Deleting an exercise by Id",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Exercise deleted successfully",
      },
      // response code
      404: {
        description: "Exercise not found",
      },
      // response code
      500: {
        description: "Server error",
      },
    },
  },
};
