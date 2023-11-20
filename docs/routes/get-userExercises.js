module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-user operations"],
    description: "Get all exercises for a specific user(get User_Exercise)",
    operationId: "getUserExercises", // unique operation id.
    parameters: [
      {
        name: "user_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/User/properties/id",
        },
        required: true, // Mandatory param
        description: "A single user id",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "All userExercises are obtained", // response desc.
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
