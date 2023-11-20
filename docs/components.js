module.exports = {
  components: {
    schemas: {
      // Admin model(table)
      Admin: {
        // type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Admin identification number",
            example: "1",
          },

          email: {
            type: "string",
            description: "Admin's email",
            example: "admin@admin.com",
          },

          password: {
            type: "string",
            description: "Admin password",
            example:
              "$2a$10$YwE3o.D1Lc4Z/CPnpzm87.g7Kvl40z2K11wTdM8mbfofarEgRnAcO",
          },
        },
      },

      // User model(table)
      User: {
        // type: "object",
        properties: {
          id: {
            type: "integer",
            description: "User identification number",
            example: 1, // example of an id
          },
          accountId: {
            type: "string",
            description: "User's log in provider (google, apple) account id",
            example: "106587056104379307591",
          },
          accountName: {
            type: "string",
            description: "User's google or apple account name",
            example: "Faysel",
          },
          loginType: {
            type: "string",
            description: "User's login type",
            example: "google",
          },
          imageURL: {
            type: "string",
            description: "User's profile",
            example:
              "https://lh3.googleusercontent.com/a/ACg8ocLUTXXr5TLqzC7MhpXGxaKmHOEa4zYx8jmdHEBk4zAZ=s96-c",
          },
          totalPoint: {
            type: "number",
            format: "double",
            description: "User's total point",
            example: 300,
          },
          nickName: {
            type: "string",
            description: "User's nick name",
            example: "faye",
          },
          gender: {
            type: "string",
            description: "User's gender",
            example: "Male",
          },
          height: {
            type: "number",
            format: "double",
            description: "User's height",
            example: 1.3,
          },
          weight: {
            type: "number",
            format: "double",
            description: "User's weight",
            example: 52,
          },
        },
      },

      // Exercise model(table)
      Exercise: {
        // type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Exercise identification number",
            example: 1, // example of an id
          },
          name: {
            type: "string",
            description: "Exercise name",
            example: "push-up",
          },
          imageURL: {
            type: "string",
            description: "Exercise image url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          videoURL: {
            type: "string",
            description: "Exercise video url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          detailed_information: {
            type: "string",
            description: "Exercise detailed information",
            example: "This exercise is for young people..",
          },
          achievement_point: {
            type: "number",
            format: "double",
            description: "Exercise achievement point",
            example: 100,
          },
          duration: {
            type: "string",
            description: "Exercise duration",
            example: "10Min",
          },
          method_of_performing: {
            type: "string",
            description: "Exercise method of performing",
            example: "First make your hand...",
          },
          pose_and_description: {
            type: "string",
            description: "Exercise pose and description",
            example: "Make sure to wear...",
          },
          precaution: {
            type: "string",
            description: "Exercise precaution",
            example: "Make sure to avoid...",
          },
        },
      },

      // Exercise input model
      ExerciseInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Exercise's name",
            example: "Push-up",
          },
          imageURL: {
            type: "string", // data type
            description: "The image URL of the exercise", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          videoURL: {
            type: "string", // data type
            description: "The video URL of the exercise", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          detailed_information: {
            type: "string",
            description: "The detail information of the exercise",
            example: "This exercise is for .....",
          },
          achievement_point: {
            type: "number",
            format: "double",
            description: "The achievement point of the exercise",
            example: 160,
          },
          duration: {
            type: "string",
            description: "The duration of the exercise",
            example: "20Min",
          },
          method_of_performing: {
            type: "string",
            description: "The method of performing of the exercise",
            example: "First make......",
          },
          pose_and_description: {
            type: "string",
            description: "The pose_and_description of the exercise",
            example: "Make sure to make your hand......",
          },
          precaution: {
            type: "string",
            description: "The precaution of the exercise",
            example: "Make sure to wear......",
          },
        },
      },

      // userExercise model(table)
      UserExercise: {
        // type: "object",
        properties: {
          id: {
            type: "integer",
            description: "user_Exercise identification number",
            example: "1", // example of an id
          },
          User_ID: {
            type: "integer",
            description: "User id",
            example: "1",
          },
          Exercise_ID: {
            type: "integer",
            description: "Exercise id",
            example: "2",
          },
          point_Achieved: {
            type: "number",
            format: "double",
            description: "Point achieved by this user for this exercise",
            example: "30",
          },
          performance: {
            type: "integer",
            description: "Performance of this user for this exercise",
            example: "10",
          },
          duration: {
            type: "string",
            description: "Duration of this user on this exercise",
            example: "20Min",
          },
          weight_lifted: {
            type: "number",
            format: "double",
            description: "Weight lifted by this user for this exercise",
            example: "4",
          },
          calorie_conversion_result: {
            type: "number",
            format: "double",
            description:
              "Calorie conversion result of this user for this exercise",
            example: "70",
          },
          completion_status: {
            type: "string",
            description: "Completion status of this user for this exercise",
            example: "Completed",
          },
        },
      },
    },
  },
};
