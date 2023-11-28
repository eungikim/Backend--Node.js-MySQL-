module.exports = {
  // operation's method
  get: {
    tags: ["User-to-mission operations"],
    description: "Get a reward of a mission",
    operationId: "getRewardMissionU", // unique operation id
    parameters: [
      // expected params.
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/properties/id",
        },
        required: true, // Mandatory param
        description: "The id of the completed mission",
      },
    ],
    // expected responses
    responses: {
      200: {
        description:
          "The reward point added successfully to the user's total point",
        content: {
          "application/json": {
            newAddedPoint: "The newly added point",
            totalUserPoint: "The total point of the user",
          },
        },
      },
      404: {
        description:
          "User didn't enroll or complete this mission, please enroll(complete) it before trying to get the reward",
      },
    },
  },
};
