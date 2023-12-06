module.exports = {
  // operation's method
  post: {
    tags: ["User-to-mission operations"],
    description: "미션 진행하기",
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
        description: "미션 idx",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "진행 등록 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserMission",
            },
          },
        },
      },
      404: {
        description: "미션을 찾을 수 없습니다.",
        content: {
          "application/json": {
            message: "No mission is found by this id",
          },
        },
      },
    },
  },
};
