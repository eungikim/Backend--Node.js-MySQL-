module.exports = {
  post: {
    tags: ["Admin-Auth operations"],
    description: "관리자 로그인",
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
        description: "로그인 완료",
      },
      // response code
      400: {
        description: "인증 불가",
      },
    },
  },
};
