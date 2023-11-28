module.exports = {
  // method of operation
  get: {
    tags: ["User-to-notice operations"],
    description: "Get all notices",
    operationId: "getAllNoticesU", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All notices are obtained", // response desc.
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
        description: "No notice is found",
      },
    },
  },
};
