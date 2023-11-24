module.exports = {
  // method of operation
  get: {
    tags: ["User-to-mission operations"],
    description: "Get all my missions",
    operationId: "getAllMyMissionsU", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All missions are obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserMission",
            },
          },
        },
      },

      400: {
        description: "No mission is found",
      },
    },
  },
};
