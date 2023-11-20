module.exports = {
  // operation's method
  get: {
    tags: ["Admin operations"],
    description: "Get a user by ID",
    operationId: "getOneUser", // unique operation id
    parameters: [
      // expected params.
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
      200: {
        description: "User is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
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
