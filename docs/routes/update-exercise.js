module.exports = {
  // operation's method
  patch: {
    tags: ["Admin operations"],
    description: "Update exercise",
    operationId: "updateTodo",
    parameters: [
      // expected params
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true,
        description: "Id of exercise to be updated",
      },
    ],
    // expected request
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
      200: {
        description: "Exercise updated successfully",
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
