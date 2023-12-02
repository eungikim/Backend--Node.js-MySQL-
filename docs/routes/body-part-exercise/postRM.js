module.exports = {
  post: {
    tags: ["User-to-Body Part Exercise operations"],
    description: "Send a report for this part exercise",
    operationId: "addBodyPartExercise",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              exercise_part: {
                example: "shoulders",
              },
              weight: {
                example: 20,
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
        description: "User exercise part data is added successfully",
      },
    },
  },
};
