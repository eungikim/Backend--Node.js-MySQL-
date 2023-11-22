module.exports = {
  // operation's method
  patch: {
    tags: ["Admin-to-mission operations"],
    description: "Update mission",
    operationId: "updateMission1",
    parameters: [
      // expected params
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/properties/id",
        },
        required: true,
        description: "Id of mission to be updated",
      },
    ],
    // expected request
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/MissionInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Mission updated successfully",
      },
      // response code
      404: {
        description: "Mission not found",
      },
      // response code
      500: {
        description: "Server error",
      },
    },
  },
};
