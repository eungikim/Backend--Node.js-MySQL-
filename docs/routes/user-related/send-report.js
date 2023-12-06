module.exports = {
  post: {
    tags: ["User operations"],
    description: "리포트 전송",
    operationId: "sendReport",
    parameters: [
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true,
        description: "운동 idx",
      },
    ],
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ReportInput",
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "등록 성공",
      },
      400: {
        description: "운동을 찾을 수 없습니다",
      },
      // response code
      500: {
        description: "등록 실패",
      },
    },
  },
};
