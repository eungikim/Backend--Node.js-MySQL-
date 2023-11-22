module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-mission operations"],
    description: "Deleting an mission",
    operationId: "deleteMission",
    parameters: [
      // expected parameters
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/id",
        },
        required: true,
        description: "Deleting an mission by Id",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Mission deleted successfully",
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
