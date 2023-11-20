module.exports = {
  // method of operation
  get: {
    tags: ["Admin operations"],
    description: "Get all users",
    operationId: "getAllUsers", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Get all users", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // User model
            },
          },
        },
      },
    },
  },
};
