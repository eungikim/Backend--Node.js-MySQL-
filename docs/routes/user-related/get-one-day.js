module.exports = {
  // operation's method
  get: {
    tags: ["User operations"],
    description: "유저운동 날자로 가져오기",
    operationId: "getOneExerciseByDate", // unique operation id
    parameters: [
      // expected params.
      {
        name: "year",
        in: "path",
        required: true, // Mandatory param
        description: "검색 년도",
      },
      {
        name: "month",
        in: "path",
        required: true, // Mandatory param
        description: "검색 월",
      },
      {
        name: "day",
        in: "path",
        required: true, // Mandatory param
        description: "검색 일자",
      },
    ],
    // expected responses
    responses: {
      200: {
        description:
          "유저운동 가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },
      404: {
        description: "운동을 찾을 수 없습니다 by this day",
      },
    },
  },
};
