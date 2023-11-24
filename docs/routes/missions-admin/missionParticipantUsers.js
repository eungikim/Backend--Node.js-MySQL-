module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-mission operations"],
    description: "A list of users currently engaged in a specific mission",
    operationId: "getAllMissionsParticipants", // unique operation id.
    parameters: [
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/properties/id",
        },
        required: true, // Mandatory param
        description: "A single mission id",
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "All missions participant are obtained successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },

      400: {
        description: "No mission participant is found",
      },
    },
  },
};
