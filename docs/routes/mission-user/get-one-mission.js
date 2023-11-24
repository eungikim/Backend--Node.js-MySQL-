module.exports = {
  // operation's method
  get: {
    tags: ["User-to-mission operations"],
    description: "Get a specific mission",
    operationId: "getOneMissionU", // unique operation id
    parameters: [
      // expected params.
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/properties/id",
        },
        required: true, // Mandatory param
        description: "A single mission id",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "Mission is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Mission",
            },
          },
        },
      },
      404: {
        description: "No mission is found by this id",
        content: {
          "application/json": {
            message: "No mission is found by this id",
          },
        },
      },
    },
  },
};
