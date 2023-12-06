module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-notice operations"],
    description: "공지사항 삭제",
    operationId: "deleteNotice",
    parameters: [
      // expected parameters
      {
        name: "notice_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Notice/id",
        },
        required: true,
        description: "공지사항 idx",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "삭제 성공",
      },
      // response code
      404: {
        description: "공지사항 없음",
      },
      // response code
      500: {
        description: "내부 에러",
      },
    },
  },
};
