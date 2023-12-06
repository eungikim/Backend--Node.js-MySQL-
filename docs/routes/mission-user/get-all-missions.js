module.exports = {
  // method of operation
  get: {
    tags: ["User-to-mission operations"],
    description: "미션 모두 가져오기",
    operationId: "getAllMissionsU", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "모든 미션 가져오기 성공", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Mission",
            },
          },
        },
      },

      400: {
        description: "미션을 찾을 수 없습니다.",
      },
    },
  },
};
