module.exports = {
  // operation's method
  post: {
    tags: ["User-to-mission operations"],
    description: "Enroll a mission",
    operationId: "enrollOneMission", // unique operation id
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
        description: "Mission is mission enrolled successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserMission",
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
