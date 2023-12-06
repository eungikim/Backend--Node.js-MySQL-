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
            description: "어드민 idx",
            example: "1",
          },

          email: {
            type: "string",
            description: "관리자 이메일",
            example: "pom2398@gmail.com",
          },

          password: {
            type: "string",
            description: "관리자 비밀번호",
            example: "admin_password",
          },

          role: {
            type: "string",
            description: "관리자 role",
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
            description: "유저 idx",
            example: 1, // example of an id
          },
          loginType: {
            type: "string",
            description: "유저 로그인 타입",
            example: "google",
          },

          socialToken: {
            type: "string",
            description: "유저 sns 토큰",
            example: "ACg8ocLUTXXr5TLqzC7MhpXGxaKmHOEa4zYx8jmdHEBk4zAZ=s96-c",
          },
          isMember: {
            type: "boolean",
            description:
              "멤버 여부(상세정보입력)",
            example: "true / false",
          },
          imageURL: {
            type: "string",
            description: "프로필 이미지 url",
            example:
              "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
          },
          totalPoint: {
            type: "number",
            format: "double",
            description: "토탈 포인트",
            example: 300,
          },
          nickName: {
            type: "string",
            description: "닉네임",
            example: "faye",
          },
          gender: {
            type: "string",
            description: "성별",
            example: "Male",
          },
          height: {
            type: "number",
            format: "double",
            description: "키",
            example: 1.3,
          },
          weight: {
            type: "number",
            format: "double",
            description: "몸무게",
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
            description: "운동 idx",
            example: 1, // example of an id
          },
          name: {
            type: "string",
            description: "운동 이름",
            example: "push-up",
          },
          imageURL: {
            type: "string",
            description: "운동 이미지 url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          internal_videoURL: {
            type: "string",
            description: "내부 영상 url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          external_videoURL: {
            type: "string",
            description: "외부 영상 url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "운동 부위",
            example: "shoulders",
          },
          method_of_performing: {
            type: "string",
            description: "수행 방법",
            example: "First make your hand.......",
          },
          // duration: {
          //   type: "string",
          //   description: "운동 시간",
          //   example: "10Min",
          // },
          pose_and_description: {
            type: "string",
            description: "운동 자세",
            example: "Make sure to wear...",
          },
          precaution: {
            type: "string",
            description: "주의사항",
            example: "Make sure to avoid...",
          },
          usersCount: {
            type: "integer",
            description: "수행하는 유저들 숫자",
            example: 10,
          },
          tags: {
            type: "array",
            description: "운동 태그",
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
            description: "미션 idx",
            example: 1, // example of an id
          },
          title: {
            type: "string",
            description: "미션 타이틀",
            example: "Achieve 50 total calories",
          },
          subTitle: {
            type: "string",
            description: "미션 서브 타이틀",
            example: "This mission is....",
          },
          detailed_information: {
            type: "string",
            description: "미션 상세정보",
            example: "This mission is...",
          },
          imageURL: {
            type: "string",
            description: "미션 이미지 url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },

          duration: {
            type: "string",
            description: "미션 시간",
            // example: "This mission is...",
          },

          point: {
            type: "number",
            format: "double",
            description: "획득 포인트",
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
            description: "미션 테마(타입)",
            example: "TotalCalories",
          },

          targetValue: {
            type: "integer",
            description: "목표 수치",
            example: 34,
          },

          usersCount: {
            type: "integer",
            description: "미션을 성공한 사람 수",
            example: 5,
          },

          startDate: {
            type: "string",
            format: "date",
            description: "시작 날짜",
            example: "03-10-2023",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "종료 날짜",
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
            description: "유저 idx",
            example: "1",
          },
          Exercise_ID: {
            type: "integer",
            description: "운동 idx",
            example: "2",
          },
          // point_Achieved: {
          //   type: "number",
          //   format: "double",
          //   description: "운동으로 획득할 수 있는 포인트",
          //   example: "30",
          // },
          performance: {
            type: "sting",
            enum: ["STANDARD", "ECCENTRIC", "CONCENTRIC"],
            description: "기기 퍼포먼스 모드",
            example: "10",
          },

          totalWeight: {
            type: "number",
            format: "double",
            description:
              "달성한 총 무게",
            example: 58,
          },

          totalCalories: {
            type: "number",
            format: "double",
            description: "총 소모 칼로리",
            example: 70,
          },

          exerciseTime: {
            type: "number",
            format: "double",
            description: "총 걸린 시간",
            example: 20,
          },

          isSupported: {
            type: "boolean",
            description: "도우미 여부",
            example: false,
          },

          totalCnt: {
            type: "integer",
            description: "총 횟수",
            example: 10,
          },

          startDate: {
            type: "string",
            format: "date",
            description: "시작 날짜",
            example: "03-10-2023",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "종료 날짜",
            example: "13-10-2023",
          },

          // completion_status: {
          //   type: "string",
          //   description: "완료 상태",
          //   example: "Completed",
          // },
        },
      },

      UserMission: {
        properties: {
          User_ID: {
            type: "integer",
            description: "유저 idx",
            example: "1",
          },
          Mission_ID: {
            type: "integer",
            description: "미션 idx",
            example: "2",
          },

          title: {
            type: "string",
            description: "미션 타이틀",
            example: "Achieve 50 calories",
          },

          subTitle: {
            type: "string",
            description: "미션 서브 타이틀",
            example: "This mission help.....",
          },

          point: {
            type: "number",
            format: "double",
            description: "획득 포인트",
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
            description: "미션 테마(타입)",
            example: "TotalCalories",
          },

          achievedPoint: {
            type: "number",
            description: "미션 획득 포인트",
            example: 6,
          },

          completionStatus: {
            type: "string",
            description: "완수 상태",
            enum: ["inProgress", "completed"],
            example: "completed",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "시작 날짜",
            example: "03-10-2023",
          },

          endDate: {
            type: "string",
            format: "date",
            description: "종료 날짜",
            example: "13-10-2023",
          },
        },
      },

      Notice: {
        properties: {
          id: {
            type: "integer",
            description: "공지사항 idx",
            example: 1, // example of an id
          },

          title: {
            type: "string",
            description: "공지사항 제목",
            example: "Mission 2 have an amazing reward",
          },

          thumbnailURL: {
            type: "string",
            description: "썸넬 url",
            example: "http://notice/../..",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "시작 날자",
            example: "2023-12-10",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "종료 날자",
            example: "2023-12-20",
          },
        },
      },

      bodyPartExercise: {
        properties: {
          id: {
            type: "integer",
            description: "운동부위 idx",
            example: 1, // example of an id
          },

          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "운동부위",
            example: "arms",
          },

          weight: {
            type: "integer",
            format: "double",
            description: "중량",
            example: 60,
          },

          gender: {
            type: "string",
            description: "성병",
            example: "male",
          },

          User_ID: {
            type: "integer",
            description: "유저 idx",
            example: 3,
          },
        },
      },

      ONEtoONE: {
        properties: {
          id: {
            type: "integer",
            description: "문의사항 idx",
            example: 1, // example of an id
          },

          questionText: {
            type: "string",
            description: "문의사항 내용",
            example: "How to improve my exercise",
          },

          answerText: {
            type: "string",
            description: "답변 내용",
            example: "You can improve your exercise by.....",
          },

          status: {
            type: "string",
            enum: ["Answer completed", "Not answered"],
            description: "답변 상태",
            example: "Answer completed",
          },

          User_ID: {
            type: "integer",
            description: "유저 idx",
            example: 3,
          },
        },
      },

      AdminLoginInput: {
        // type: "object",
        properties: {
          email: {
            type: "string",
            description: "관리자 이메일",
            example: "pom2398@gmail.com",
          },

          password: {
            type: "string",
            description: "관리자 비밀번호",
            example: "admin_password",
          },
        },
      },

      userSignInput: {
        // type: "object",
        properties: {
          email: {
            type: "string",
            description: "유저 이메일",
            example: "user@test.com",
          },

          loginType: {
            type: "string",
            description: "유저 로그인 타입",
            example: "google",
          },
          socialToken: {
            type: "string",
            description: "유저 sns 토큰",
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
            description: "닉네임",
            example: "faye",
          },
          gender: {
            type: "string",
            description: "성별",
            example: "Male",
          },
          height: {
            type: "number",
            format: "double",
            description: "키",
            example: 1.3,
          },
          weight: {
            type: "number",
            format: "double",
            description: "몸무게",
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
            description: "운동 이름",
            example: "Push-up",
          },
          imageURL: {
            type: "string", // data type
            description: "운동 이미지 url", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },

          exercise_part: {
            type: "string",
            enum: ["shoulders", "arms", "stomach", "back", "legs", "chest"],
            description: "운동 부위",
            example: "shoulders",
          },

          method_of_performing: {
            type: "string",
            description: "수행 방법",
            example: "First make your hand.......",
          },

          pose_and_description: {
            type: "string",
            description: "운동 자세",
            example: "Make sure to wear...",
          },

          internal_videoURL: {
            type: "string", // data type
            description: "내부 영상 url", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          external_videoURL: {
            type: "string", // data type
            description: "외부 영상 url", // desc
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },

          // duration: {
          //   type: "string",
          //   description: "운동 시간",
          //   example: "10Min",
          // },

          precaution: {
            type: "string",
            description: "주의사항",
            example: "Make sure to avoid...",
          },
          tags: {
            type: "array",
            description: "운동 태그",
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
          //   description: "포인트",
          //   example: 30,
          // },

          performance: {
            type: "sting",
            enum: ["STANDARD", "ECCENTRIC", "CONCENTRIC"],
            description: "기기 퍼포먼스 모드",
            example: "10",
          },

          totalWeight: {
            type: "number",
            format: "double",
            description:
              "달성한 총 무게",
            example: 58,
          },

          totalCalories: {
            type: "number",
            format: "double",
            description: "총 소모 칼로리",
            example: 70,
          },

          exerciseTime: {
            type: "number",
            format: "double",
            description: "총 걸린 시간",
            example: 20,
          },

          isSupported: {
            type: "boolean",
            description: "도우미 여부",
            example: false,
          },

          totalCnt: {
            type: "integer",
            description: "총 횟수",
            example: 20,
          },

          startDate: {
            type: "string",
            description:
              "관련 운동 시작 날자",
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
            description: "미션 타이틀",
            example: "Login for 10 days",
          },
          subTitle: {
            type: "string",
            description: "미션 서브 타이틀",
            example: "This mission is....",
          },
          imageURL: {
            type: "string",
            description: "미션 이미지 url",
            example:
              "https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          duration: {
            type: "string",
            description: "미션 시간",
            example: "30Min",
          },
          detailed_information: {
            type: "string",
            description: "미션 상세정보",
            example: "This mission is...",
          },
          // detailed_guide: {
          //   type: "string",
          //   description: "미션 상세 가이드",
          //   example: "Before starting this mission...",
          // },
          point: {
            type: "number",
            format: "double",
            description: "미션 획득 포인트",
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
            description: "미션 테마(타입)",
            example: "TotalCalories",
          },

          targetValue: {
            type: "integer",
            description: "목표 수치",
            example: 34,
          },
        },
      },

      NoticeInput: {
        properties: {
          title: {
            type: "string",
            description: "공지사항 제목",
            example: "Mission 2 have an amazing reward",
          },

          thumbnailURL: {
            type: "string",
            description: "썸넬 url",
            example: "http://notice/../..",
          },

          startDate: {
            type: "string",
            format: "date",
            description: "시작 날자",
            example: "2023-12-10",
          },

          dueDate: {
            type: "string",
            format: "date",
            description: "종료 날자",
            example: "2023-12-20",
          },
        },
      },
    },
  },
};
