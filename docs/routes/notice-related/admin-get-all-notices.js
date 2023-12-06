module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-notice operations"],
    description: "공지사항 모두 가져오기",
    operationId: "getAllNotices", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "가져오기 성공", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Notice",
            },
          },
        },
      },

      400: {
        description: "가져오기 실패",
      },
    },
  },
};
