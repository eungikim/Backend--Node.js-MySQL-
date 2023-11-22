module.exports = {
  post: {
    tags: ["Admin-to-mission operations"],
    description: "Create mission",
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
        description: "Mission created successfully",
      },
      // response code
      500: {
        description: "Error when adding mission",
      },
    },
  },
};
