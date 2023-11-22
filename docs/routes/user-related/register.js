module.exports = {
  post: {
    tags: ["User operations - sign in/ sign up"],
    description: "User sign in/ sign up",
    operationId: "userSign",
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/userSignInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "User successfully registered",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      // response code
      400: {
        description: "Failed to register",
      },
    },
  },
};
