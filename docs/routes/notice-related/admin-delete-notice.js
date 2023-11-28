module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-notice operations"],
    description: "Deleting a notice",
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
        description: "Deleting a notice by Id",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Notice deleted successfully",
      },
      // response code
      404: {
        description: "Notice not found",
      },
      // response code
      500: {
        description: "Server error",
      },
    },
  },
};
