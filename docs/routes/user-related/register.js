module.exports = {
  post: {
    tags: ["User operations - sign in/ sign up"],
    description: "유저 로그인/회원가입",
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
        description: "유저 가입 성공",
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
        description: "가입 실패",
      },
    },
  },
};
