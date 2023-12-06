module.exports = {
  post: {
    tags: ["Admin-to-notice operations"],
    description: "공지사항 등록",
    operationId: "addNotice",
    parameters: [],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/NoticeInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "등록 성공",
      },
      // response code
      500: {
        description: "등록 실패",
      },
    },
  },
};
