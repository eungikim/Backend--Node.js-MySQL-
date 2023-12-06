module.exports = {
  post: {
    tags: ["Admin-Auth operations"],
    description:
      "관리자 비밀번호 변경.",
    operationId: "adminPasswordUpdate",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              resetToken: {
                resetToken: "보낸 리셋 토큰",
                type: "string",
                example: "749773738768f3e3772962745abf793b1b952488",
              },
              newPassword: {
                description: "신규 비밀번호",
                example: "admin-new-password",
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "비밀번호 변경 성공.",
      },
      // response code
      400: {
        description: "유효하지 않거나 리셋 토큰 만료",
      },
    },
  },
};
