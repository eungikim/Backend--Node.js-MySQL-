module.exports = {
  // operation's method
  patch: {
    tags: ["Admin-to-mission operations"],
    description: "미션 업데이트",
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
        description: "업데이트 할 미션 idx",
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
        description: "업데이트 성공",
      },
      // response code
      404: {
        description: "미션을 찾을 수 없습니다",
      },
      // response code
      500: {
        description: "내부 에러",
      },
    },
  },
};
