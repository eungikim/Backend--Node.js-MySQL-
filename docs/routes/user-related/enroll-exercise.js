module.exports = {
  post: {
    tags: ["User operations"],
    description: "운동 등록(유저 운동)",
    operationId: "enrollExercise",
    parameters: [
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true, // Mandatory param
        description: "운동 idx",
      },
    ],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              startDate: {
                description: "운동 시작 날자",
                example: "2023-11-28",
              },
            },
          },
        },
      },
    },

    // expected responses
    responses: {
      // response code
      201: {
        description: "등록 완료",
      },
      // response code
      400: {
        description: "등록 실패(운동idx)",
      },
    },
  },
};
