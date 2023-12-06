module.exports = {
  // operation's method
  get: {
    tags: ["User-to-mission operations"],
    description: "미션 보상 받기",
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
        description: "완수한 미션 idx",
      },
    ],
    // expected responses
    responses: {
      200: {
        description:
          "보상받기 성공",
        content: {
          "application/json": {
            newAddedPoint: "The newly added point",
            totalUserPoint: "The total point of the user",
          },
        },
      },
      404: {
        description:
          "유저가 미션을 등록하지 않거나 완수하지 않음",
      },
    },
  },
};
