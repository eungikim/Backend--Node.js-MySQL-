module.exports = {
  post: {
    tags: ["Admin-to-notice operations"],
    description: "Add notice",
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
        description: "Notice added successfully",
      },
      // response code
      500: {
        description: "Error when adding notice",
      },
    },
  },
};
