module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-user operations"],
    description: "Get a user_exercise using user_id and exercise_id",
    operationId: "getOneUserExercise", // unique operation id
    parameters: [
      // expected params.
      {
        name: "user_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/User/properties/id",
        },
        required: true,
        description: "A single user id",
      },
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/UserExercise/properties/id",
        },
        required: true,
        description: "A single exercise id",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "UserExercise is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },
      404: {
        description: "No user is found by this id",
        content: {
          "application/json": {
            message: "No user is found by this id",
          },
        },
      },
    },
  },
};
