module.exports = {
  // operation's method.
  delete: {
    tags: ["Admin-to-mission operations"],
    description: "미션 삭제",
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
        description: "삭제할 미션 idx",
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "삭제 성공",
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
