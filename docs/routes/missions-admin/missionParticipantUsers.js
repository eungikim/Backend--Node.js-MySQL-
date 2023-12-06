module.exports = {
  // method of operation
  get: {
    tags: ["Admin-to-mission operations"],
    description: "미션에 참가하고 있는 유저 리스트",
    operationId: "getAllMissionsParticipants", // unique operation id.
    parameters: [
      {
        name: "mission_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Mission/properties/id",
        },
        required: true, // Mandatory param
        description: "미션 idx",
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "미션 참가자 가져오기 성공", // response desc.
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
        description: "참가자가 없습니다",
      },
    },
  },
};
