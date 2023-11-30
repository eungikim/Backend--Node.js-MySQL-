module.exports = {
  post: {
    tags: ["User operations"],
    description: "Enroll exercise (from listed exercises to user_exercise)",
    operationId: "enrollExercise",
    parameters: [
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true, // Mandatory param
        description: "A single exercise id",
      },
    ],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              startDate: {
                description: "The start date of the exercise",
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
        description: "Exercise successfully enrolled",
      },
      // response code
      400: {
        description: "Invalid exercise id when enrolling exercise",
      },
    },
  },
};
