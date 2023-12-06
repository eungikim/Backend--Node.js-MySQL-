module.exports = {
  // operation's method
  get: {
    tags: ["Admin-to-Question operations"],
    description: "문의사항 가져오기",
    operationId: "getOneQuestion", // unique operation id
    parameters: [
      {
        name: "question_id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/ONEtoONE/properties/id",
        },
        required: true, // Mandatory param
        description: "문의사항 idx",
      },
    ],

    responses: {
      200: {
        description: "가져오기 성공",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ONEtoONE",
            },
          },
        },
      },

      404: {
        description: "가져오기 실패",
        content: {
          "application/json": {
            message: "No question is found for this id",
          },
        },
      },
    },
  },
};
