module.exports = {
  post: {
    tags: ["Admin-to-mission operations"],
    description: "미션 만들기",
    operationId: "addMission",
    parameters: [],
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
      201: {
        description: "미션 생성 성공",
      },
      // response code
      500: {
        description: "미션 생성 에러",
      },
    },
  },
};
