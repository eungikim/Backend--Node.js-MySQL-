module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-user operations"],
    description: "유저 전체 가져오기",
    operationId: "getAllUsers", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "유저 전체 가져오기 성공", // response desc.
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
