module.exports = {
  post: {
    tags: ["User operations - sign in/ sign up"],
    description: "Complete registration (add additional info)",
    operationId: "",
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserCompleteLoginInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "User's data added successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },

      // response code
      400: {
        description: "Authentication failed, user not found",
      },
    },
  },
};
