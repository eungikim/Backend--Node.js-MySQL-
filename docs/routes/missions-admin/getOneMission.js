module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-mission operations"],
    description: "미션 하나 가져오기",
    operationId: "getOneMission", // unique operation id
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
        description: "가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Mission",
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
