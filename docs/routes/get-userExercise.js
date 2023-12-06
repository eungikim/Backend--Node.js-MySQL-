module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-user operations"],
    description: "유저의 운동 가져오기",
    operationId: "getOneUserExercise", // unique operation id
    parameters: [
      // expected params.
      {
        name: "user_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/User/properties/id",
        },
        required: true,
        description: "유저 idx",
      },
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/UserExercise/properties/id",
        },
        required: true,
        description: "운동 idx",
      },
    ],
    // expected responses
    responses: {
      200: {
        description: "유저운동 가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserExercise",
            },
          },
        },
      },
      404: {
        description: "가져오기 실패",
        content: {
          "application/json": {
            message: "No user is found by this id",
          },
        },
      },
    },
  },
};
