module.exports = {
  post: {
    tags: ["Admin-Auth operations"],
    description:
      "Admin update password. Sending a request to change the password",
    operationId: "adminPasswordUpdate",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              resetToken: {
                resetToken: "The token sent to the admin email",
                type: "string",
                example: "749773738768f3e3772962745abf793b1b952488",
              },
              newPassword: {
                description: "The new password",
                example: "admin-new-password",
              },
            },
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Password updated successfully.",
      },
      // response code
      400: {
        description: "Invalid or expired reset token",
      },
    },
  },
};
