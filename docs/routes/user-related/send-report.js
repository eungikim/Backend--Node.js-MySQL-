module.exports = {
  post: {
    tags: ["User operations"],
    description: "Send a report ",
    operationId: "sendReport",
    parameters: [
      {
        name: "exercise_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/Exercise/properties/id",
        },
        required: true,
        description: "A single exercise id",
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
        description: "Report added successfully",
      },
      400: {
        description: "No exercise is found for this user_id and exercise_id",
      },
      // response code
      500: {
        description: "Error when adding exercise",
      },
    },
  },
};
