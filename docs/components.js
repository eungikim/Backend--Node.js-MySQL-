const { format } = require("mysql2");

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
            example: "pom2398@gmail.com",
          },

          password: {
            type: "string",
            description: "Admin password",
            example: "admin_password",
          },

          role: {
            type: "string",
            description: "Admin default role",
            example: "admin",
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
          loginType: {
            type: "string",
            description: "User's login type",
            example: "google",
          },

          socialToken: {
            type: "string",
            description: "User's social token",
            example: "ACg8ocLUTXXr5TLqzC7MhpXGxaKmHOEa4zYx8jmdHEBk4zAZ=s96-c",
          },
          isMember: {
            type: "boolean",
            description:
              "Is this user is a member (He fill all his additional information)",
            example: "true / false",
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
          internal_videoURL: {
            type: "string",
            description: "internal video url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          external_videoURL: {
            type: "string",
            description: "external video url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "exercise part of this exercise",
            example: "shoulders",
          },
          method_of_performing: {
            type: "string",
            description: "Exercise method_of_performing",
            example: "First make your hand.......",
          },
          // duration: {
          //   type: "string",
          //   description: "Exercise duration",
          //   example: "10Min",
          // },
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
          usersCount: {
            type: "integer",
            description: "number of users who performed the exercise",
            example: 10,
          },
          tags: {
            type: "array",
            description: "Exercise tags",
            example: ["Leg", "Arm", "Hand"],
          },
        },
      },

      // Mission model(table)
      Mission: {
        // type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Mission identification number",
            example: 1, // example of an id
          },
          title: {
            type: "string",
            description: "Mission title",
            example: "Achieve 50 total calories",
          },
          subTitle: {
            type: "string",
            description: "Mission sub title",
            example: "This mission is....",
          },
          detailed_information: {
            type: "string",
            description: "mission's detailed_information",
            example: "This mission is...",
          },
          imageURL: {
            type: "string",
            description: "Mission's image url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },

          duration: {
            type: "string",
            description: "mission's duration",
            // example: "This mission is...",
          },

          point: {
            type: "number",
            format: "double",
            description: "The reward point when this mission completed",
            example: 80,
          },

          missionTheme: {
            type: "string",
            enum: [
              "Attendance",
              "TotalExercise",
              "TotalWeight",
              "TotalCalories",
            ],
            description: "Theme (type) of this mission",
            example: "TotalCalories",
          },

          targetValue: {
            type: "integer",
            description: "The targeted mission value",
            example: 34,
          },

          usersCount: {
            type: "integer",
            description: "number of users who completed this mission",
            example: 5,
          },

          startDate: {
            type: "string",
            format: "date",
            description: "The starting date of the mission",
            example: "03-10-2023",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "The end date of the mission ",
            example: "13-10-2023",
          },
        },
      },

      // userExercise model(table)
      UserExercise: {
        // type: "object",
        properties: {
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
          // point_Achieved: {
          //   type: "number",
          //   format: "double",
          //   description: "Point achieved by this user for this exercise",
          //   example: "30",
          // },
          performance: {
            type: "sting",
            enum: ["STANDARD", "ECCENTRIC", "CONCENTRIC"],
            description: "Performance of this user for this exercise",
            example: "10",
          },

          totalWeight: {
            type: "number",
            format: "double",
            description:
              "Total weight achieved by this user through this exercise",
            example: 58,
          },

          totalCalories: {
            type: "number",
            format: "double",
            description: "Total calories of this user for this exercise",
            example: 70,
          },

          exerciseTime: {
            type: "number",
            format: "double",
            description: "Total time spent in this exercise ",
            example: 20,
          },

          isSupported: {
            type: "boolean",
            description: "is supported",
            example: false,
          },

          totalCnt: {
            type: "integer",
            description: "totalCnt",
            example: 10,
          },

          startDate: {
            type: "string",
            format: "date",
            description: "The starting date of the mission",
            example: "03-10-2023",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "The end date of the mission ",
            example: "13-10-2023",
          },

          // completion_status: {
          //   type: "string",
          //   description: "Completion status of this user for this exercise",
          //   example: "Completed",
          // },
        },
      },

      UserMission: {
        properties: {
          User_ID: {
            type: "integer",
            description: "User id",
            example: "1",
          },
          Mission_ID: {
            type: "integer",
            description: "Mission id",
            example: "2",
          },

          title: {
            type: "string",
            description: "Mission title",
            example: "Achieve 50 calories",
          },

          subTitle: {
            type: "string",
            description: "Mission sub title",
            example: "This mission help.....",
          },

          point: {
            type: "number",
            format: "double",
            description: "The reward point when this mission completed",
            example: 80,
          },

          missionTheme: {
            type: "string",
            enum: [
              "Attendance",
              "TotalExercise",
              "TotalWeight",
              "TotalCalories",
            ],
            description: "Theme (type) of this mission",
            example: "TotalCalories",
          },

          achievedPoint: {
            type: "number",
            description: "Achieved point of this mission",
            example: 6,
          },

          completionStatus: {
            type: "string",
            description: "Completion status of this mission",
            enum: ["inProgress", "completed"],
            example: "completed",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "The starting date of the mission",
            example: "03-10-2023",
          },

          endDate: {
            type: "string",
            format: "date",
            description: "The end date of the mission ",
            example: "13-10-2023",
          },
        },
      },

      Notice: {
        properties: {
          id: {
            type: "integer",
            description: "Notice identification number",
            example: 1, // example of an id
          },

          title: {
            type: "string",
            description: "Notice title",
            example: "Mission 2 have an amazing reward",
          },

          thumbnailURL: {
            type: "string",
            description: "Notice thumbnail URL",
            example: "http://notice/../..",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "The start date",
            example: "2023-12-10",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "The end date",
            example: "2023-12-20",
          },
        },
      },

      bodyPartExercise: {
        properties: {
          id: {
            type: "integer",
            description: "body part exercise identification number",
            example: 1, // example of an id
          },

          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "Exercise part",
            example: "arms",
          },

          weight: {
            type: "integer",
            format: "double",
            description: "The weight this body part",
            example: 60,
          },

          gender: {
            type: "string",
            description: "The gender of the user",
            example: "male",
          },

          User_ID: {
            type: "integer",
            description: "The ID of the user",
            example: 3,
          },
        },
      },

      ONEtoONE: {
        properties: {
          id: {
            type: "integer",
            description: "Question identification number",
            example: 1, // example of an id
          },

          questionText: {
            type: "string",
            description: "Question text",
            example: "How to improve my exercise",
          },

          answerText: {
            type: "string",
            description: "Answer text",
            example: "You can improve your exercise by.....",
          },

          status: {
            type: "string",
            enum: ["Answer completed", "Not answered"],
            description: "The status of the question",
            example: "Answer completed",
          },

          User_ID: {
            type: "integer",
            description: "The ID of the asker",
            example: 3,
          },
        },
      },

      AdminLoginInput: {
        // type: "object",
        properties: {
          email: {
            type: "string",
            description: "Admin's email",
            example: "pom2398@gmail.com",
          },

          password: {
            type: "string",
            description: "Admin password",
            example: "admin_password",
          },
        },
      },

      userSignInput: {
        // type: "object",
        properties: {
          email: {
            type: "string",
            description: "User's email",
            example: "user@test.com",
          },

          loginType: {
            type: "string",
            description: "User's login type",
            example: "google",
          },
          socialToken: {
            type: "string",
            description: "User's social token",
            example: "dnoehgd8djkjmnbvfoE",
          },
        },
      },

      // Additional information input
      UserCompleteLoginInput: {
        // type: "object",
        properties: {
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

          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "exercise part of this exercise",
            example: "shoulders",
          },

          method_of_performing: {
            type: "string",
            description: "Exercise method_of_performing",
            example: "First make your hand.......",
          },

          pose_and_description: {
            type: "string",
            description: "Exercise pose and description",
            example: "Make sure to wear...",
          },

          internal_videoURL: {
            type: "string", // data type
            description: "The video URL of the exercise", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          external_videoURL: {
            type: "string", // data type
            description: "The video URL of the exercise", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },

          // duration: {
          //   type: "string",
          //   description: "Exercise duration",
          //   example: "10Min",
          // },

          precaution: {
            type: "string",
            description: "Exercise precaution",
            example: "Make sure to avoid...",
          },
          tags: {
            type: "array",
            description: "Exercise tags",
            example: ["Leg", "Arm", "Hand"],
          },
        },
      },

      // Report  input model
      ReportInput: {
        type: "object",
        properties: {
          // point_Achieved: {
          //   type: "number",
          //   format: "double",
          //   description: "Point achieved in report ",
          //   example: 30,
          // },

          performance: {
            type: "sting",
            enum: ["STANDARD", "ECCENTRIC", "CONCENTRIC"],
            description: "Performance of this user for this exercise",
            example: "10",
          },

          totalWeight: {
            type: "number",
            format: "double",
            description:
              "Total weight achieved by this user through this exercise",
            example: 58,
          },

          totalCalories: {
            type: "number",
            format: "double",
            description: "Total calories of this user for this exercise",
            example: 70,
          },

          exerciseTime: {
            type: "number",
            format: "double",
            description: "Total time spent in this exercise ",
            example: 20,
          },

          isSupported: {
            type: "boolean",
            description: "is supported",
            example: false,
          },

          totalCnt: {
            type: "integer",
            description: "totalCnt",
            example: 20,
          },

          startDate: {
            type: "string",
            description:
              "The started date of the exercise which the report is send for",
            example: "2023-11-28",
          },
        },
      },
      // Mission  input model
      MissionInput: {
        // type: "object",
        properties: {
          title: {
            type: "string",
            description: "Mission title",
            example: "Login for 10 days",
          },
          subTitle: {
            type: "string",
            description: "Mission sub title",
            example: "This mission is....",
          },
          imageURL: {
            type: "string",
            description: "Mission's image url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          duration: {
            type: "string",
            description: "mission's duration",
            example: "30Min",
          },
          detailed_information: {
            type: "string",
            description: "mission's detailed_information",
            example: "This mission is...",
          },
          // detailed_guide: {
          //   type: "string",
          //   description: "Mission's detailed_guide",
          //   example: "Before starting this mission...",
          // },
          point: {
            type: "number",
            format: "double",
            description: "Point assigned to this mission",
            example: 80,
          },
          missionTheme: {
            type: "string",
            enum: [
              "Attendance",
              "TotalExercise",
              "TotalWeight",
              "TotalCalories",
            ],
            description: "Theme (type) of this mission",
            example: "TotalCalories",
          },

          targetValue: {
            type: "integer",
            description: "The targeted mission value",
            example: 34,
          },
        },
      },

      NoticeInput: {
        properties: {
          title: {
            type: "string",
            description: "Notice title",
            example: "Mission 2 have an amazing reward",
          },

          thumbnailURL: {
            type: "string",
            description: "Notice thumbnail URL",
            example: "http://notice/../..",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "The start date",
            example: "2023-12-10",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "The end date",
            example: "2023-12-20",
          },
        },
      },
    },
  },
};
