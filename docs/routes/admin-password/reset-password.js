module.exports = {
  post: {
    tags: ["Admin-Auth operations"],
    description:
      "관리자 비밀번호 재설정, 리셋 토큰 이메일 보내기 요청을 날립니다.",
    operationId: "adminReset",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              email: {
                description:
                  "리셋 토큰을 보낼 관리자의 메일",
                type: "string",
                format: "email",
                example: "admin@admin.com",
              },
              callBack: {
                description:
                  "메일과 함께 보낼 프론트엔드 페이지 링크. 비밀번호 변경폼 페이지",
                example: "https://personal-portfolio-y2fh.vercel.app",
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
        description: "메일을 보냅습니다.",
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
              },
            },
          },
        },
      },
      // response code
      404: {
        description: "어드민 이메일 찾을 수 없음",
      },
    },
  },
};
