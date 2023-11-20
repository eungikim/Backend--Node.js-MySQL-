module.exports = {
  post: {
    tags: ["Admin operations"],
    description: "Admin login",
    operationId: "adminLogin",
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AdminLoginInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Admin successfully logged in",
      },
      // response code
      400: {
        description: "Non-authorized admin",
      },
    },
  },
};
