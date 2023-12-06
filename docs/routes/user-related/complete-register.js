module.exports = {
  post: {
    tags: ["User operations - sign in/ sign up"],
    description:
      "상세정보 기입. 토큰 확인하세요! authorization: Bearer {token}",
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
        description: "상세정보 입력 성공",
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
        description: "인증 실패, 유저 찾을 수 없음",
      },
    },
  },
};
