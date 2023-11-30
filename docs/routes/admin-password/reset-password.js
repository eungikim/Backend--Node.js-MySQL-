module.exports = {
  post: {
    tags: ["Admin-Auth operations"],
    description:
      "Admin reset password, sending a request to receive an email with the reset token",
    operationId: "adminReset",
    parameters: [],
    requestBody: {
      content: {
        // content-type
        "application/json": {
          schema: {
            properties: {
              email: {
                description:
                  "The email of the admin where the reset token to be send",
                type: "string",
                format: "email",
                example: "admin@admin.com",
              },
              callBack: {
                description:
                  "The link of the front-end page that will be send with the email. The page of changing password form ",
                example: "https://personal-portfolio-y2fh.vercel.app",
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
        description: "Reset password instructions sent to your email.",
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
              },
            },
          },
        },
      },
      // response code
      404: {
        description: "Admin not found with this email",
      },
    },
  },
};
