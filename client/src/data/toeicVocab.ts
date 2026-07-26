export interface TOEICWord {
  id: string;
  word: string;
  phonetic: string;
  wordType: string;
  meaningVi: string;
  meaningEn: string;
  example: string;
  exampleVi: string;
}

export interface TOEICList {
  id: string;
  name: string;
  description: string;
  words: TOEICWord[];
}

export interface TOEICCategory {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  color: string;
  lists: TOEICList[];
}

export const TOEIC_VOCAB_DATA: TOEICCategory[] = [
  {
    id: "target300",
    title: "Target 300+ (Mới Bắt Đầu)",
    description: "Từ vựng sơ cấp nhất về các hoạt động đời thường, công sở cơ bản và đồ vật quen thuộc.",
    difficulty: "Rất Dễ",
    color: "from-teal-500 to-emerald-400",
    lists: [
      {
        id: "target300_list1",
        name: "List 1: Daily Activities",
        description: "Các hoạt động quen thuộc diễn ra hàng ngày tại nơi làm việc.",
        words: [
          {
            id: "t300_1",
            word: "commute",
            phonetic: "/kəˈmjuːt/",
            wordType: "verb/noun",
            meaningVi: "đi làm hàng ngày (bằng phương tiện công cộng)",
            meaningEn: "travel some distance between one's home and place of work on a regular basis",
            example: "She commutes to her office in downtown Hanoi by bus every morning.",
            exampleVi: "Cô ấy đi làm đến văn phòng ở trung tâm Hà Nội bằng xe buýt mỗi sáng."
          },
          {
            id: "t300_2",
            word: "prepare",
            phonetic: "/prɪˈpeər/",
            wordType: "verb",
            meaningVi: "chuẩn bị",
            meaningEn: "make something ready for use or consideration",
            example: "The assistant needs to prepare the room for the morning conference.",
            exampleVi: "Trợ lý cần chuẩn bị phòng cho cuộc hội nghị buổi sáng."
          },
          {
            id: "t300_3",
            word: "arrive",
            phonetic: "/əˈraɪv/",
            wordType: "verb",
            meaningVi: "đến nơi, tới nơi",
            meaningEn: "reach a destination at the end of a journey or stage",
            example: "The delivery truck is scheduled to arrive at the warehouse at 10 AM.",
            exampleVi: "Xe tải giao hàng dự kiến sẽ đến kho vào lúc 10 giờ sáng."
          },
          {
            id: "t300_4",
            word: "departure",
            phonetic: "/dɪˈpɑː.tʃər/",
            wordType: "noun",
            meaningVi: "sự khởi hành, sự xuất phát",
            meaningEn: "the action of leaving, especially to start a journey",
            example: "Passengers should check the screen for flight departure times.",
            exampleVi: "Hành khách nên kiểm tra màn hình để biết thời gian khởi hành chuyến bay."
          },
          {
            id: "t300_5",
            word: "lunch",
            phonetic: "/lʌntʃ/",
            wordType: "noun/verb",
            meaningVi: "bữa ăn trưa, ăn trưa",
            meaningEn: "a meal eaten in the middle of the day",
            example: "Our department usually has lunch together in the office cafeteria.",
            exampleVi: "Bộ phận của chúng tôi thường ăn trưa cùng nhau ở căn tin văn phòng."
          },
          {
            id: "t300_6",
            word: "discuss",
            phonetic: "/dɪˈskʌs/",
            wordType: "verb",
            meaningVi: "thảo luận, bàn bạc",
            meaningEn: "talk about something with another person or group in order to reach a decision",
            example: "We will discuss the new sales target during tomorrow's team meeting.",
            exampleVi: "Chúng ta sẽ thảo luận về mục tiêu doanh số mới trong cuộc họp nhóm ngày mai."
          },
          {
            id: "t300_7",
            word: "email",
            phonetic: "/ˈiː.meɪl/",
            wordType: "noun/verb",
            meaningVi: "thư điện tử, gửi email",
            meaningEn: "send a message using the internet to another person",
            example: "Please email me the final draft of the report by 5 PM today.",
            exampleVi: "Vui lòng gửi email cho tôi bản thảo cuối cùng của báo cáo trước 5 giờ chiều nay."
          },
          {
            id: "t300_8",
            word: "client",
            phonetic: "/ˈklaɪ.ənt/",
            wordType: "noun",
            meaningVi: "khách hàng (sử dụng dịch vụ)",
            meaningEn: "a person or organization using the services of a professional person or company",
            example: "The lawyer is preparing contracts for an important international client.",
            exampleVi: "Luật sư đang chuẩn bị hợp đồng cho một khách hàng quốc tế quan trọng."
          },
          {
            id: "t300_9",
            word: "project",
            phonetic: "/ˈprɒdʒ.ekt/",
            wordType: "noun",
            meaningVi: "dự án, đề án",
            meaningEn: "an individual or collaborative enterprise that is carefully planned to achieve a particular aim",
            example: "The construction project must be completed before the rainy season starts.",
            exampleVi: "Dự án xây dựng phải được hoàn thành trước khi mùa mưa bắt đầu."
          },
          {
            id: "t300_10",
            word: "report",
            phonetic: "/rɪˈpɔːt/",
            wordType: "noun/verb",
            meaningVi: "bản báo cáo, báo cáo",
            meaningEn: "a spoken or written description of something that you have done or investigated",
            example: "The accountant submitted the final financial report to the director.",
            exampleVi: "Kế toán đã nộp bản báo cáo tài chính cuối cùng cho giám đốc."
          }
        ]
      },
      {
        id: "target300_list2",
        name: "List 2: Common Office Items",
        description: "Các đồ vật, thiết bị văn phòng cơ bản thường gặp.",
        words: [
          {
            id: "t300_11",
            word: "desk",
            phonetic: "/desk/",
            wordType: "noun",
            meaningVi: "bàn làm việc",
            meaningEn: "a flat-topped piece of furniture at which one can write or work",
            example: "He placed the telephone and some files on his wooden desk.",
            exampleVi: "Anh ấy đặt điện thoại và một vài tệp tài liệu lên bàn làm việc bằng gỗ của mình."
          },
          {
            id: "t300_12",
            word: "computer",
            phonetic: "/kəmˈpjuː.tər/",
            wordType: "noun",
            meaningVi: "máy tính",
            meaningEn: "an electronic device for storing and processing data",
            example: "Every employee is provided with a modern computer connected to the network.",
            exampleVi: "Mỗi nhân viên được cung cấp một máy tính hiện đại kết nối với mạng."
          },
          {
            id: "t300_13",
            word: "phone",
            phonetic: "/fəʊn/",
            wordType: "noun",
            meaningVi: "điện thoại",
            meaningEn: "a device used to talk to someone who is in another place",
            example: "She picked up the phone to answer the customer's call.",
            exampleVi: "Cô ấy nhấc điện thoại lên để trả lời cuộc gọi của khách hàng."
          },
          {
            id: "t300_14",
            word: "scanner",
            phonetic: "/ˈskæn.ər/",
            wordType: "noun",
            meaningVi: "máy quét, máy scan",
            meaningEn: "a device for copying physical documents or pictures into digital format",
            example: "Use the scanner in the copy room to upload these invoices.",
            exampleVi: "Hãy sử dụng máy quét trong phòng sao chép để tải lên các hóa đơn này."
          },
          {
            id: "t300_15",
            word: "printer",
            phonetic: "/ˈprɪn.tər/",
            wordType: "noun",
            meaningVi: "máy in",
            meaningEn: "a machine that prints words or pictures from a computer onto paper",
            example: "The printer is currently out of paper, so please refill it.",
            exampleVi: "Máy in hiện đang hết giấy, vì vậy vui lòng nạp thêm."
          },
          {
            id: "t300_16",
            word: "document",
            phonetic: "/ˈdɒk.jə.mənt/",
            wordType: "noun",
            meaningVi: "tài liệu, văn kiện",
            meaningEn: "a written, printed, or electronic matter that provides information or evidence",
            example: "She signed the official document and returned it to the lawyer.",
            exampleVi: "Cô ấy đã ký tài liệu chính thức và gửi lại nó cho luật sư."
          },
          {
            id: "t300_17",
            word: "folder",
            phonetic: "/ˈfəʊl.dər/",
            wordType: "noun",
            meaningVi: "thư mục, bìa đựng hồ sơ",
            meaningEn: "a folding cover or holder for storing loose papers",
            example: "The documents are organized neatly inside the blue folder.",
            exampleVi: "Các tài liệu được sắp xếp gọn gàng bên trong bìa hồ sơ màu xanh."
          },
          {
            id: "t300_18",
            word: "calendar",
            phonetic: "/ˈkæl.ən.dər/",
            wordType: "noun",
            meaningVi: "lịch, tờ lịch",
            meaningEn: "a chart showing the days, weeks, and months of a particular year",
            example: "Mark the meeting date clearly on your office calendar.",
            exampleVi: "Hãy đánh dấu ngày họp rõ ràng trên lịch văn phòng của bạn."
          },
          {
            id: "t300_19",
            word: "keyboard",
            phonetic: "/ˈkiː.bɔːd/",
            wordType: "noun",
            meaningVi: "bàn phím",
            meaningEn: "a set of keys on a computer or typewriter used for typing",
            example: "The employee typed the client list using the new wireless keyboard.",
            exampleVi: "Nhân viên đã gõ danh sách khách hàng bằng bàn phím không dây mới."
          },
          {
            id: "t300_20",
            word: "envelope",
            phonetic: "/ˈen.və.ləʊp/",
            wordType: "noun",
            meaningVi: "phong bì, phong thư",
            meaningEn: "a flat paper container with a sealable flap, used to send letters",
            example: "He put the signed contract into the envelope and sent it by post.",
            exampleVi: "Anh ấy cho hợp đồng đã ký vào phong bì và gửi qua đường bưu điện."
          }
        ]
      }
    ]
  },
  {
    id: "target500",
    title: "Target 500+ (Cơ Bản)",
    description: "Từ vựng thông dụng nhất về văn phòng, công việc hàng ngày, đặt chỗ du lịch và dịch vụ khách hàng.",
    difficulty: "Dễ",
    color: "from-blue-500 to-cyan-400",
    lists: [
      {
        id: "target500_list1",
        name: "List 1: Office Basics",
        description: "Các thuật ngữ cơ bản dùng trong tuyển dụng và văn phòng.",
        words: [
          {
            id: "t500_1",
            word: "applicant",
            phonetic: "/ˈæp.lɪ.kənt/",
            wordType: "noun",
            meaningVi: "người nộp đơn, ứng viên",
            meaningEn: "a person who formally requests something, especially a job",
            example: "The HR department received over fifty applicants for the manager position.",
            exampleVi: "Bộ phận nhân sự đã nhận được hơn năm mươi hồ sơ ứng viên cho vị trí quản lý."
          },
          {
            id: "t500_2",
            word: "contract",
            phonetic: "/ˈkɒn.trækt/",
            wordType: "noun",
            meaningVi: "hợp đồng, giao kèo",
            meaningEn: "a written or spoken agreement, especially one concerning employment, sales, or tenancy",
            example: "Please read all the terms carefully before signing the employment contract.",
            exampleVi: "Vui lòng đọc kỹ tất cả các điều khoản trước khi ký hợp đồng lao động."
          },
          {
            id: "t500_3",
            word: "resume",
            phonetic: "/ˈrez.juː.meɪ/",
            wordType: "noun",
            meaningVi: "sơ yếu lý lịch, CV",
            meaningEn: "a brief account of a person’s education, qualifications, and previous experience",
            example: "She updated her resume to include her latest work achievements.",
            exampleVi: "Cô ấy đã cập nhật sơ yếu lý lịch để bổ sung những thành tựu công việc mới nhất."
          },
          {
            id: "t500_4",
            word: "submit",
            phonetic: "/səbˈmɪt/",
            wordType: "verb",
            meaningVi: "nộp, trình duyệt",
            meaningEn: "to hand in or present a document for consideration or judgment",
            example: "You must submit your monthly expense report by Friday afternoon.",
            exampleVi: "Bạn phải nộp báo cáo chi phí hàng tháng trước chiều thứ Sáu."
          },
          {
            id: "t500_5",
            word: "apply",
            phonetic: "/əˈplaɪ/",
            wordType: "verb",
            meaningVi: "nộp đơn ứng tuyển",
            meaningEn: "to make a formal application or request, typically in writing, for a job or position",
            example: "He plans to apply for the marketing assistant job next week.",
            exampleVi: "Anh ấy có kế hoạch nộp đơn ứng tuyển công việc trợ lý tiếp thị vào tuần tới."
          },
          {
            id: "t500_6",
            word: "hire",
            phonetic: "/haɪər/",
            wordType: "verb",
            meaningVi: "thuê, tuyển dụng",
            meaningEn: "to employ someone for wages or to rent something for short-term use",
            example: "The software firm decided to hire three new programmers.",
            exampleVi: "Công ty phần mềm đã quyết định tuyển dụng ba lập trình viên mới."
          },
          {
            id: "t500_7",
            word: "conduct",
            phonetic: "/kənˈdʌkt/",
            wordType: "verb",
            meaningVi: "tiến hành, thực hiện",
            meaningEn: "to organize and carry out an activity, research, or tour",
            example: "The research laboratory will conduct an investigation into the drug's side effects.",
            exampleVi: "Phòng thí nghiệm nghiên cứu sẽ thực hiện một cuộc điều tra về tác dụng phụ của thuốc."
          },
          {
            id: "t500_8",
            word: "delay",
            phonetic: "/dɪˈleɪ/",
            wordType: "verb",
            meaningVi: "trì hoãn, chậm trễ",
            meaningEn: "to make someone or something late or slow; to postpone",
            example: "Severe weather conditions will delay the delivery of the shipments.",
            exampleVi: "Điều kiện thời tiết khắc nghiệt sẽ làm chậm trễ việc giao các lô hàng."
          },
          {
            id: "t500_9",
            word: "notify",
            phonetic: "/ˈnəʊ.tɪ.faɪ/",
            wordType: "verb",
            meaningVi: "thông báo, khai báo",
            meaningEn: "to inform someone formally about something that has happened",
            example: "We will notify you by email as soon as the results are finalized.",
            exampleVi: "Chúng tôi sẽ thông báo cho bạn qua email ngay khi kết quả được hoàn thành."
          },
          {
            id: "t500_10",
            word: "signature",
            phonetic: "/ˈsɪɡ.nə.tʃər/",
            wordType: "noun",
            meaningVi: "chữ ký",
            meaningEn: "a person’s name written in a distinctive way as a form of identification or authorization",
            example: "The contract is not legally valid without the director's signature.",
            exampleVi: "Hợp đồng không có giá trị pháp lý nếu thiếu chữ ký của giám đốc."
          }
        ]
      },
      {
        id: "target500_list2",
        name: "List 2: Travel & Business Trips",
        description: "Từ vựng phổ biến trong các tình huống đi lại, đặt chỗ và công tác.",
        words: [
          {
            id: "t500_11",
            word: "luggage",
            phonetic: "/ˈlʌɡ.ɪdʒ/",
            wordType: "noun",
            meaningVi: "hành lý",
            meaningEn: "suitcases or bags containing personal belongings for a journey",
            example: "Passengers are allowed to carry one piece of hand luggage onto the plane.",
            exampleVi: "Hành khách được phép mang một kiện hành lý xách tay lên máy bay."
          },
          {
            id: "t500_12",
            word: "boarding",
            phonetic: "/ˈbɔː.dɪŋ/",
            wordType: "noun",
            meaningVi: "sự lên tàu/lên máy bay",
            meaningEn: "the action of getting on a ship, train, or plane",
            example: "Boarding for flight VN120 will begin at gate number five in ten minutes.",
            exampleVi: "Sự lên máy bay cho chuyến bay VN120 sẽ bắt đầu tại cổng số năm sau mười phút."
          },
          {
            id: "t500_13",
            word: "cancel",
            phonetic: "/ˈkæn.səl/",
            wordType: "verb",
            meaningVi: "hủy bỏ",
            meaningEn: "to decide that a planned event will not take place",
            example: "The client decided to cancel the meeting due to a scheduling conflict.",
            exampleVi: "Khách hàng đã quyết định hủy cuộc họp do xung đột lịch trình."
          },
          {
            id: "t500_14",
            word: "passenger",
            phonetic: "/ˈpæs.ən.dʒər/",
            wordType: "noun",
            meaningVi: "hành khách",
            meaningEn: "a traveler in a public or private conveyance other than the driver",
            example: "The bus driver asked all passengers to fasten their seatbelts.",
            exampleVi: "Tài xế xe buýt yêu cầu tất cả hành khách thắt dây an toàn."
          },
          {
            id: "t500_15",
            word: "confirm",
            phonetic: "/kənˈfɜːm/",
            wordType: "verb",
            meaningVi: "xác nhận, chứng thực",
            meaningEn: "to establish the truth or correctness of something; to verify",
            example: "You need to call the hotel to confirm your booking for tonight.",
            exampleVi: "Bạn cần gọi cho khách sạn để xác nhận việc đặt phòng cho tối nay."
          },
          {
            id: "t500_16",
            word: "refund",
            phonetic: "/ˈriː.fʌnd/",
            wordType: "noun",
            meaningVi: "tiền hoàn trả, sự hoàn tiền",
            meaningEn: "a repayment of a sum of money, typically to a dissatisfied customer",
            example: "If the concert is canceled, ticket holders will receive a full refund.",
            exampleVi: "Nếu buổi hòa nhạc bị hủy, những người giữ vé sẽ được hoàn tiền đầy đủ."
          },
          {
            id: "t500_17",
            word: "depart",
            phonetic: "/dɪˈpɑːt/",
            wordType: "verb",
            meaningVi: "khởi hành, xuất phát",
            meaningEn: "to leave, especially on a journey",
            example: "The express train to Da Nang is scheduled to depart at 8:00 AM.",
            exampleVi: "Tàu nhanh đi Đà Nẵng dự kiến sẽ khởi hành lúc 8:00 sáng."
          },
          {
            id: "t500_18",
            word: "schedule",
            phonetic: "/ˈʃedʒ.uːl/",
            wordType: "noun",
            meaningVi: "lịch trình, thời khóa biểu",
            meaningEn: "a plan for carrying out a process or procedure, giving a list of intended events and times",
            example: "Our project is running slightly ahead of schedule.",
            exampleVi: "Dự án của chúng tôi đang chạy nhanh hơn lịch trình một chút."
          },
          {
            id: "t500_19",
            word: "accommodation",
            phonetic: "/əˌkɒm.əˈdeɪ.ʃən/",
            wordType: "noun",
            meaningVi: "chỗ ở, nơi lưu trú",
            meaningEn: "a room, group of rooms, or building in which someone may live or stay",
            example: "The business trip expense cover includes travel and hotel accommodation.",
            exampleVi: "Kinh phí chuyến công tác bao gồm chi phí đi lại và chỗ ở khách sạn."
          },
          {
            id: "t500_20",
            word: "itinerary",
            phonetic: "/aɪˈtɪn.ər.ər.i/",
            wordType: "noun",
            meaningVi: "lịch trình chi tiết chuyến đi",
            meaningEn: "a planned route or journey description",
            example: "The travel agent sent us our full itinerary for the European tour.",
            exampleVi: "Đại lý du lịch đã gửi cho chúng tôi lịch trình chi tiết đầy đủ cho chuyến lưu diễn châu Âu."
          }
        ]
      },
      {
        id: "target500_list3",
        name: "List 3: Customer Service",
        description: "Từ vựng chuyên dùng trong bộ phận chăm sóc khách hàng.",
        words: [
          {
            id: "t500_21",
            word: "customer",
            phonetic: "/ˈkʌs.tə.mər/",
            wordType: "noun",
            meaningVi: "khách hàng (mua hàng hóa)",
            meaningEn: "a person or organization that buys goods or services from a store or business",
            example: "We strive to ensure every customer is fully satisfied with their purchase.",
            exampleVi: "Chúng tôi cố gắng đảm bảo mọi khách hàng đều hoàn toàn hài lòng với giao dịch mua hàng của họ."
          },
          {
            id: "t500_22",
            word: "complaint",
            phonetic: "/kəmˈpleɪnt/",
            wordType: "noun",
            meaningVi: "sự khiếu nại, phàn nàn",
            meaningEn: "a statement that something is unsatisfactory or unacceptable",
            example: "The customer filed a formal complaint regarding the defective computer screen.",
            exampleVi: "Khách hàng đã nộp một khiếu nại chính thức liên quan đến màn hình máy tính bị lỗi."
          },
          {
            id: "t500_23",
            word: "solve",
            phonetic: "/sɒlv/",
            wordType: "verb",
            meaningVi: "giải quyết, xử lý",
            meaningEn: "find an answer to, explanation for, or means of effectively dealing with a problem",
            example: "Our support representatives are trained to solve technical issues quickly.",
            exampleVi: "Các đại diện hỗ trợ của chúng tôi được đào tạo để giải quyết các sự cố kỹ thuật một cách nhanh chóng."
          },
          {
            id: "t500_24",
            word: "support",
            phonetic: "/səˈpɔːt/",
            wordType: "noun/verb",
            meaningVi: "sự hỗ trợ, hỗ trợ",
            meaningEn: "give assistance, approval, or comfort to someone",
            example: "If you have questions, please contact our customer support desk.",
            exampleVi: "Nếu bạn có thắc mắc, vui lòng liên hệ với bàn hỗ trợ khách hàng của chúng tôi."
          },
          {
            id: "t500_25",
            word: "polite",
            phonetic: "/pəˈlaɪt/",
            wordType: "adjective",
            meaningVi: "lịch sự, lễ phép",
            meaningEn: "having or showing behavior that is respectful and considerate of other people",
            example: "The receptionist was very polite and answered all of our queries.",
            exampleVi: "Nhân viên lễ tân rất lịch sự và đã trả lời tất cả các thắc mắc của chúng tôi."
          },
          {
            id: "t500_26",
            word: "feedback",
            phonetic: "/ˈfiːd.bæk/",
            wordType: "noun",
            meaningVi: "ý kiến phản hồi",
            meaningEn: "information about reactions to a product or a person's performance of a task",
            example: "We value constructive feedback from our clients to improve our services.",
            exampleVi: "Chúng tôi coi trọng phản hồi có tính xây dựng từ khách hàng để cải thiện dịch vụ của mình."
          },
          {
            id: "t500_27",
            word: "issue",
            phonetic: "/ˈɪʃ.uː/",
            wordType: "noun/verb",
            meaningVi: "vấn đề, sự cố",
            meaningEn: "an important topic or problem for debate or discussion",
            example: "There is a network connection issue in the main office today.",
            exampleVi: "Có một sự cố kết nối mạng tại văn phòng chính ngày hôm nay."
          },
          {
            id: "t500_28",
            word: "loyalty",
            phonetic: "/ˈlɔɪ.əl.ti/",
            wordType: "noun",
            meaningVi: "lòng trung thành",
            meaningEn: "the quality of being loyal to a brand, company, or cause",
            example: "Our customer loyalty program offers discounts to frequent shoppers.",
            exampleVi: "Chương trình tri ân khách hàng thân thiết của chúng tôi cung cấp giảm giá cho người mua sắm thường xuyên."
          },
          {
            id: "t500_29",
            word: "return",
            phonetic: "/rɪˈtɜːn/",
            wordType: "verb/noun",
            meaningVi: "trả lại hàng hóa, sự quay lại",
            meaningEn: "give, put, or send something back to a place or person",
            example: "Customers can return undamaged goods within thirty days for a full refund.",
            exampleVi: "Khách hàng có thể trả lại hàng hóa không bị hư hại trong vòng ba mươi ngày để được hoàn tiền đầy đủ."
          },
          {
            id: "t500_30",
            word: "satisfy",
            phonetic: "/ˈsæt.ɪs.faɪ/",
            wordType: "verb",
            meaningVi: "làm hài lòng, đáp ứng",
            meaningEn: "fulfill the expectations, needs, or desires of someone",
            example: "The new design aims to satisfy the high demands of professional gamers.",
            exampleVi: "Thiết kế mới nhằm đáp ứng yêu cầu cao của các game thủ chuyên nghiệp."
          }
        ]
      }
    ]
  },
  {
    id: "target700",
    title: "Target 700+ (Trung Cấp)",
    description: "Từ vựng chuyên sâu về quản lý, đàm phán cuộc họp, chiến lược tiếp thị và phân tích doanh thu.",
    difficulty: "Trung bình",
    color: "from-indigo-500 to-blue-400",
    lists: [
      {
        id: "target700_list1",
        name: "List 1: Meetings & Strategy",
        description: "Hội họp, đàm phán và lập kế hoạch kinh doanh.",
        words: [
          {
            id: "t700_1",
            word: "agenda",
            phonetic: "/əˈdʒen.də/",
            wordType: "noun",
            meaningVi: "chương trình nghị sự, nội dung cuộc họp",
            meaningEn: "a list of items to be discussed at a formal meeting",
            example: "The chairperson distributed the agenda three days before the meeting.",
            exampleVi: "Chủ tọa đã phân phát nội dung họp ba ngày trước cuộc họp."
          },
          {
            id: "t700_2",
            word: "negotiate",
            phonetic: "/nəˈɡəʊ.ʃi.eɪt/",
            wordType: "verb",
            meaningVi: "đàm phán, thương lượng",
            meaningEn: "to try to reach an agreement or compromise by discussion with others",
            example: "The union representatives met with management to negotiate a new wage scale.",
            exampleVi: "Đại diện công đoàn đã gặp ban quản lý để đàm phán một thang lương mới."
          },
          {
            id: "t700_3",
            word: "propose",
            phonetic: "/prəˈpəʊz/",
            wordType: "verb",
            meaningVi: "đề xuất, đưa ra ý kiến",
            meaningEn: "to put forward a plan or suggestion for consideration by others",
            example: "I would like to propose a compromise to resolve this debate.",
            exampleVi: "Tôi muốn đề xuất một sự thỏa hiệp để giải quyết cuộc tranh luận này."
          },
          {
            id: "t700_4",
            word: "unanimous",
            phonetic: "/juːˈnæn.ɪ.məs/",
            wordType: "adjective",
            meaningVi: "nhất trí, đồng lòng",
            meaningEn: "held or made by everyone in a group; fully in agreement",
            example: "The board members reached a unanimous decision to expand the business.",
            exampleVi: "Các thành viên hội đồng quản trị đã đạt được quyết định nhất trí để mở rộng kinh doanh."
          },
          {
            id: "t700_5",
            word: "revenue",
            phonetic: "/ˈrev.ən.juː/",
            wordType: "noun",
            meaningVi: "doanh thu, lợi tức",
            meaningEn: "income, especially when of a company or organization and of a substantial nature",
            example: "The company reported a 15 percent increase in annual revenue.",
            exampleVi: "Công ty báo cáo doanh thu hàng năm tăng 15 phần trăm."
          },
          {
            id: "t700_6",
            word: "budget",
            phonetic: "/ˈbʌdʒ.ɪt/",
            wordType: "noun",
            meaningVi: "ngân sách",
            meaningEn: "an estimate of income and expenditure for a set period of time",
            example: "We need to operate within the limits of our advertising budget.",
            exampleVi: "Chúng ta cần hoạt động trong giới hạn ngân sách quảng cáo của mình."
          },
          {
            id: "t700_7",
            word: "transaction",
            phonetic: "/trænˈzæk.ʃən/",
            wordType: "noun",
            meaningVi: "giao dịch",
            meaningEn: "an instance of buying or selling something; a business deal",
            example: "You will receive a confirmation receipt for each online transaction.",
            exampleVi: "Bạn sẽ nhận được hóa đơn xác nhận cho mỗi giao dịch trực tuyến."
          },
          {
            id: "t700_8",
            word: "merge",
            phonetic: "/mɜːdʒ/",
            wordType: "verb",
            meaningVi: "sáp nhập, hòa vào nhau",
            meaningEn: "to combine or cause to combine to form a single entity",
            example: "The two local banks planned to merge next quarter to increase market share.",
            exampleVi: "Hai ngân hàng địa phương có kế hoạch sáp nhập vào quý tới để tăng thị phần."
          },
          {
            id: "t700_9",
            word: "collaborate",
            phonetic: "/kəˈlæb.ə.reɪt/",
            wordType: "verb",
            meaningVi: "hợp tác, cộng tác",
            meaningEn: "to work jointly on an activity or project, especially to produce or create something",
            example: "Researchers from both universities will collaborate on the new project.",
            exampleVi: "Các nhà nghiên cứu từ cả hai trường đại học sẽ hợp tác trong dự án mới."
          },
          {
            id: "t700_10",
            word: "compromise",
            phonetic: "/ˈkɒm.prə.maɪz/",
            wordType: "noun",
            meaningVi: "sự thỏa hiệp, sự dàn xếp",
            meaningEn: "an agreement or a settlement of a dispute that is reached by each side making concessions",
            example: "After hours of discussion, they finally reached a compromise.",
            exampleVi: "Sau nhiều giờ thảo luận, cuối cùng họ đã đạt được sự thỏa hiệp."
          }
        ]
      },
      {
        id: "target700_list2",
        name: "List 2: Marketing & Sales",
        description: "Các thuật ngữ quảng cáo, truyền thông sản phẩm và bán hàng chuyên nghiệp.",
        words: [
          {
            id: "t700_11",
            word: "advertise",
            phonetic: "/ˈæd.və.taɪz/",
            wordType: "verb",
            meaningVi: "quảng cáo",
            meaningEn: "describe or draw attention to a product, service, or event in a public medium in order to promote sales",
            example: "We plan to advertise our new organic tea line on social media networks.",
            exampleVi: "Chúng tôi lên kế hoạch quảng cáo dòng trà hữu cơ mới trên các mạng xã hội."
          },
          {
            id: "t700_12",
            word: "strategy",
            phonetic: "/ˈstræt.ə.dʒi/",
            wordType: "noun",
            meaningVi: "chiến lược",
            meaningEn: "a plan of action or policy designed to achieve a major or overall aim",
            example: "The directors approved the long-term marketing strategy for East Asia.",
            exampleVi: "Các giám đốc đã phê duyệt chiến lược tiếp thị dài hạn cho khu vực Đông Á."
          },
          {
            id: "t700_13",
            word: "campaign",
            phonetic: "/kæmˈpeɪn/",
            wordType: "noun/verb",
            meaningVi: "chiến dịch",
            meaningEn: "an organized course of action to achieve a goal, especially commercial or political",
            example: "The email marketing campaign generated thousands of new leads.",
            exampleVi: "Chiến dịch tiếp thị qua email đã tạo ra hàng ngàn khách hàng tiềm năng mới."
          },
          {
            id: "t700_14",
            word: "sponsor",
            phonetic: "/ˈspɒn.sər/",
            wordType: "verb/noun",
            meaningVi: "tài trợ, nhà tài trợ",
            meaningEn: "provide funds for a project, activity, or person, typically in return for advertising rights",
            example: "Major sports brands decided to sponsor the national athletic games.",
            exampleVi: "Các thương hiệu thể thao lớn đã quyết định tài trợ cho đại hội thể thao quốc gia."
          },
          {
            id: "t700_15",
            word: "demographic",
            phonetic: "/ˌdem.əˈɡræf.ɪk/",
            wordType: "noun/adjective",
            meaningVi: "nhóm nhân khẩu học, phân khúc đối tượng",
            meaningEn: "a particular sector of a population, identified by age, income, or other data",
            example: "Our products target the young professional demographic aged 22 to 35.",
            exampleVi: "Sản phẩm của chúng tôi hướng tới nhóm nhân khẩu học trẻ tuổi đi làm từ 22 đến 35 tuổi."
          },
          {
            id: "t700_16",
            word: "coupon",
            phonetic: "/ˈkuː.pɒn/",
            wordType: "noun",
            meaningVi: "phiếu mua hàng, phiếu giảm giá",
            meaningEn: "a voucher entitling the holder to a discount or to an exchange for goods",
            example: "Present this discount coupon at the checkout counter to save twenty percent.",
            exampleVi: "Hãy xuất trình phiếu giảm giá này tại quầy thanh toán để được giảm hai mươi phần trăm."
          },
          {
            id: "t700_17",
            word: "competition",
            phonetic: "/ˌkɒm.pəˈtɪʃ.ən/",
            wordType: "noun",
            meaningVi: "sự cạnh tranh, cuộc thi đấu",
            meaningEn: "the activity or condition of competing against others for resources or customers",
            example: "Intense competition in the smartphone market leads to lower prices.",
            exampleVi: "Sự cạnh tranh gay gắt trong thị trường điện thoại thông minh dẫn đến giá cả thấp hơn."
          },
          {
            id: "t700_18",
            word: "target",
            phonetic: "/ˈtɑː.ɡɪt/",
            wordType: "noun/verb",
            meaningVi: "mục tiêu, hướng tới",
            meaningEn: "a person, object, or goal selected as the aim of an attack or focus",
            example: "The advertisement is carefully designed to target local homeowners.",
            exampleVi: "Quảng cáo được thiết kế cẩn thận để hướng tới những chủ sở hữu nhà ở địa phương."
          },
          {
            id: "t700_19",
            word: "billboard",
            phonetic: "/ˈbɪl.bɔːd/",
            wordType: "noun",
            meaningVi: "biển quảng cáo ngoài trời",
            meaningEn: "a large outdoor board for displaying advertisements",
            example: "A massive billboard promoting the film was installed along the highway.",
            exampleVi: "Một biển quảng cáo ngoài trời khổng lồ quảng bá cho bộ phim đã được lắp đặt dọc theo đường cao tốc."
          },
          {
            id: "t700_20",
            word: "flyer",
            phonetic: "/ˈflaɪ.ər/",
            wordType: "noun",
            meaningVi: "tờ rơi quảng cáo",
            meaningEn: "a small paper leaflet advertising an event, product, or service",
            example: "We distributed flyers in the neighborhood to advertise the supermarket's grand opening.",
            exampleVi: "Chúng tôi đã phát tờ rơi ở khu lân cận để quảng cáo cho lễ khai trương siêu thị."
          }
        ]
      }
    ]
  },
  {
    id: "target800",
    title: "Target 800+ (Khá Giỏi)",
    description: "Từ vựng nâng cao chuyên sâu về tái cơ cấu doanh nghiệp, chuỗi cung ứng và phân tích tài chính phức tạp.",
    difficulty: "Khó",
    color: "from-orange-500 to-amber-500",
    lists: [
      {
        id: "target800_list1",
        name: "List 1: Business Operations & Management",
        description: "Các thuật ngữ quản trị vận hành và cải tổ doanh nghiệp chuyên nghiệp.",
        words: [
          {
            id: "t800_1",
            word: "restructure",
            phonetic: "/ˌriːˈstrʌk.tʃər/",
            wordType: "verb",
            meaningVi: "tái cơ cấu, cải tổ",
            meaningEn: "organize key departments or operational frameworks of a company in a new way",
            example: "To prevent bankruptcy, the board decided to restructure the entire corporation.",
            exampleVi: "Để ngăn chặn sự phá sản, hội đồng quản trị đã quyết định tái cơ cấu toàn bộ tập đoàn."
          },
          {
            id: "t800_2",
            word: "implement",
            phonetic: "/ˈɪm.plɪ.ment/",
            wordType: "verb",
            meaningVi: "triển khai thực hiện, thi hành",
            meaningEn: "put a decision, plan, or agreement into effect",
            example: "We need to implement the new data security protocol immediately.",
            exampleVi: "Chúng ta cần triển khai giao thức bảo mật dữ liệu mới ngay lập tức."
          },
          {
            id: "t800_3",
            word: "streamline",
            phonetic: "/ˈstriːm.laɪn/",
            wordType: "verb",
            meaningVi: "tối ưu hóa quy trình (cho gọn nhẹ, hiệu quả hơn)",
            meaningEn: "make an organization or system more efficient by employing faster or simpler working methods",
            example: "By using automation tools, the logistics firm was able to streamline its packing process.",
            exampleVi: "Bằng cách sử dụng các công cụ tự động hóa, công ty hậu cần đã có thể tối ưu hóa quy trình đóng gói của mình."
          },
          {
            id: "t800_4",
            word: "evaluate",
            phonetic: "/ɪˈvæl.ju.eɪt/",
            wordType: "verb",
            meaningVi: "đánh giá, ước lượng giá trị",
            meaningEn: "form an idea of the amount, number, or value of something; assess",
            example: "Supervisors will evaluate performance based on sales results and customer ratings.",
            exampleVi: "Các giám sát viên sẽ đánh giá hiệu suất dựa trên kết quả bán hàng và đánh giá của khách hàng."
          },
          {
            id: "t800_5",
            word: "allocate",
            phonetic: "/ˈæl.ə.keɪt/",
            wordType: "verb",
            meaningVi: "phân bổ, cấp phát (ngân sách, nguồn lực)",
            meaningEn: "distribute resources or duties for a particular purpose",
            example: "The manager will allocate the budget for the new marketing campaign tomorrow.",
            exampleVi: "Quản lý sẽ phân bổ ngân sách cho chiến dịch tiếp thị mới vào ngày mai."
          },
          {
            id: "t800_6",
            word: "overhead",
            phonetic: "/ˈəʊ.və.hed/",
            wordType: "noun",
            meaningVi: "chi phí vận hành thường xuyên (điện, nước, thuê mặt bằng...)",
            meaningEn: "regular expenses involved in running a business, such as rent, utility bills, and salaries",
            example: "Moving to a smaller office helped the startup reduce its monthly overhead significantly.",
            exampleVi: "Chuyển sang một văn phòng nhỏ hơn đã giúp công ty khởi nghiệp giảm đáng kể chi phí vận hành hàng tháng."
          },
          {
            id: "t800_7",
            word: "subsidiary",
            phonetic: "/səbˈsɪd.i.ə.ri/",
            wordType: "noun",
            meaningVi: "công ty con",
            meaningEn: "a company controlled by a holding or parent company",
            example: "The Japanese automotive manufacturer has a subsidiary branch in Vietnam.",
            exampleVi: "Nhà sản xuất ô tô Nhật Bản có một chi nhánh công ty con tại Việt Nam."
          },
          {
            id: "t800_8",
            word: "liquidate",
            phonetic: "/ˈlɪk.wɪ.deɪt/",
            wordType: "verb",
            meaningVi: "thanh lý (tài sản), giải thể (công ty)",
            meaningEn: "wind up the affairs of a business by ascertaining liabilities and converting assets into cash",
            example: "The bank was forced to liquidate the firm's assets to recover the unpaid loans.",
            exampleVi: "Ngân hàng bị buộc phải thanh lý tài sản của công ty để thu hồi các khoản vay chưa trả."
          },
          {
            id: "t800_9",
            word: "downsize",
            phonetic: "/ˈdaʊn.saɪz/",
            wordType: "verb",
            meaningVi: "cắt giảm quy mô nhân sự",
            meaningEn: "make a company smaller by eliminating staff positions",
            example: "Due to the economic recession, the tech firm planned to downsize its workforce by ten percent.",
            exampleVi: "Do suy thoái kinh tế, công ty công nghệ có kế hoạch cắt giảm mười phần trăm lực lượng lao động."
          },
          {
            id: "t800_10",
            word: "optimize",
            phonetic: "/ˈɒp.tɪ.maɪz/",
            wordType: "verb",
            meaningVi: "tối ưu hóa",
            meaningEn: "make the best or most effective use of a situation or resource",
            example: "The software update helps optimize system speed and battery usage.",
            exampleVi: "Bản cập nhật phần mềm giúp tối ưu hóa tốc độ hệ thống và sử dụng pin."
          }
        ]
      }
    ]
  },
  {
    id: "target900",
    title: "Target 900+ (Nâng Cao)",
    description: "Từ vựng cấp độ quản lý cao cấp, thuật ngữ pháp lý, các tình huống thâu tóm và rủi ro bất ngờ.",
    difficulty: "Rất Khó",
    color: "from-purple-500 to-pink-400",
    lists: [
      {
        id: "target900_list1",
        name: "List 1: Corporate Governance",
        description: "Quản trị doanh nghiệp và tài chính vĩ mô.",
        words: [
          {
            id: "t900_1",
            word: "acquire",
            phonetic: "/əˈkwaɪər/",
            wordType: "verb",
            meaningVi: "thâu tóm, mua lại (doanh nghiệp)",
            meaningEn: "to buy or obtain an asset or objects; to take over a company",
            example: "The technological conglomerate decided to acquire the small artificial intelligence start-up.",
            exampleVi: "Tập đoàn công nghệ đã quyết định mua lại công ty khởi nghiệp trí tuệ nhân tạo nhỏ."
          },
          {
            id: "t900_2",
            word: "contingency",
            phonetic: "/kənˈtɪn.dʒən.si/",
            wordType: "noun",
            meaningVi: "sự cố bất ngờ, kế hoạch dự phòng",
            meaningEn: "a future event or circumstance that is possible but cannot be predicted with certainty",
            example: "Every financial department must establish a contingency fund for emergency situations.",
            exampleVi: "Mỗi bộ phận tài chính phải thiết lập một quỹ dự phòng cho các tình huống khẩn cấp."
          },
          {
            id: "t900_3",
            word: "audit",
            phonetic: "/ˈɔː.dɪt/",
            wordType: "noun/verb",
            meaningVi: "kiểm toán, sự thanh tra tài chính",
            meaningEn: "an official inspection of an organization's accounts, typically by an independent body",
            example: "The international consulting firm was hired to conduct an annual financial audit.",
            exampleVi: "Công ty tư vấn quốc tế đã được thuê để tiến hành một cuộc kiểm toán tài chính hàng năm."
          },
          {
            id: "t900_4",
            word: "franchise",
            phonetic: "/ˈfræn.tʃaɪz/",
            wordType: "noun",
            meaningVi: "nhượng quyền thương mại",
            meaningEn: "an authorization granted by a company to an individual enabling them to carry out commercial activities",
            example: "He plans to purchase a franchise of a popular fast-food restaurant chain.",
            exampleVi: "Anh ấy có kế hoạch mua nhượng quyền thương mại của một chuỗi nhà hàng thức ăn nhanh nổi tiếng."
          },
          {
            id: "t900_5",
            word: "leverage",
            phonetic: "/ˈliː.vər.ɪdʒ/",
            wordType: "verb/noun",
            meaningVi: "tận dụng, dùng làm đòn bẩy",
            meaningEn: "to use something to maximum advantage; or strategic financial debt tool",
            example: "We should leverage our brand reputation to capture the rural market.",
            exampleVi: "Chúng ta nên tận dụng danh tiếng thương hiệu của mình để chiếm lĩnh thị trường nông thôn."
          },
          {
            id: "t900_6",
            word: "monopoly",
            phonetic: "/məˈnɒp.əl.i/",
            wordType: "noun",
            meaningVi: "sự độc quyền",
            meaningEn: "the exclusive possession or control of the supply of or trade in a commodity or service",
            example: "The state-owned corporation holds a legal monopoly over domestic electricity supply.",
            exampleVi: "Tập đoàn nhà nước nắm giữ sự độc quyền hợp pháp đối với việc cung cấp điện trong nước."
          },
          {
            id: "t900_7",
            word: "speculate",
            phonetic: "/ˈspek.jə.leɪt/",
            wordType: "verb",
            meaningVi: "đầu cơ, suy đoán tích trữ",
            meaningEn: "to invest in stocks or property in the hope of gain but with the risk of loss",
            example: "Financial analysts warn investors not to speculate heavily in cryptocurrency.",
            exampleVi: "Các nhà phân tích tài chính cảnh báo các nhà đầu tư không nên đầu cơ mạnh vào tiền điện tử."
          },
          {
            id: "t900_8",
            word: "diversify",
            phonetic: "/daɪˈvɜː.sɪ.faɪ/",
            wordType: "verb",
            meaningVi: "đa dạng hóa (danh mục đầu tư)",
            meaningEn: "to make or become more diverse or varied; enlarge range of products",
            example: "The investment fund advised us to diversify our portfolio to minimize risk.",
            exampleVi: "Quỹ đầu tư đã khuyên chúng tôi nên đa dạng hóa danh mục đầu tư của mình để giảm thiểu rủi ro."
          },
          {
            id: "t900_9",
            word: "consolidate",
            phonetic: "/kənˈsɒl.ɪ.deɪt/",
            wordType: "verb",
            meaningVi: "hợp nhất, củng cố",
            meaningEn: "to combine a number of financial accounts or businesses into a single stronger one",
            example: "They plan to consolidate their administrative offices into one central building.",
            exampleVi: "Họ có kế hoạch hợp nhất các văn phòng hành chính của mình vào một tòa nhà trung tâm."
          },
          {
            id: "t900_10",
            word: "unprecedented",
            phonetic: "/ʌnˈpres.ɪ.den.tɪd/",
            wordType: "adjective",
            meaningVi: "chưa từng có tiền lệ",
            meaningEn: "never done or known before; completely novel",
            example: "The current global inflation spike is unprecedented in recent history.",
            exampleVi: "Sự gia tăng lạm phát toàn cầu hiện nay là chưa từng có trong lịch sử gần đây."
          }
        ]
      },
      {
        id: "target900_list2",
        name: "List 2: Legal & Regulations",
        description: "Thuật ngữ pháp lý doanh nghiệp, quy định luật pháp và giải quyết tranh chấp.",
        words: [
          {
            id: "t900_11",
            word: "regulation",
            phonetic: "/ˌreɡ.jəˈleɪ.ʃən/",
            wordType: "noun",
            meaningVi: "quy định, điều lệ",
            meaningEn: "a rule or directive made and maintained by an authority",
            example: "New environmental regulations force car manufacturers to reduce exhaust emissions.",
            exampleVi: "Các quy định môi trường mới buộc các nhà sản xuất ô tô phải giảm lượng khí thải."
          },
          {
            id: "t900_12",
            word: "liability",
            phonetic: "/ˌlaɪ.əˈbɪl.ə.ti/",
            wordType: "noun",
            meaningVi: "trách nhiệm pháp lý, nghĩa vụ nợ",
            meaningEn: "the state of being responsible for something, especially by law",
            example: "The company accepted full financial liability for the accidental chemical spill.",
            exampleVi: "Công ty đã chấp nhận hoàn toàn trách nhiệm pháp lý tài chính đối với vụ tràn hóa chất vô tình."
          },
          {
            id: "t900_13",
            word: "clause",
            phonetic: "/klɔːz/",
            wordType: "noun",
            meaningVi: "điều khoản (trong hợp đồng)",
            meaningEn: "a particular and separate article, stipulation, or provision in a treaty, bill, or contract",
            example: "The penalty clause in the contract details fines for late project delivery.",
            exampleVi: "Điều khoản phạt trong hợp đồng nêu chi tiết tiền phạt nếu bàn giao dự án trễ hạn."
          },
          {
            id: "t900_14",
            word: "lawsuit",
            phonetic: "/ˈlɔː.suːt/",
            wordType: "noun",
            meaningVi: "vụ kiện tụng, vụ án",
            meaningEn: "a claim or dispute brought to a court of law for adjudication",
            example: "The former employee filed a lawsuit against the firm for unfair dismissal.",
            exampleVi: "Cựu nhân viên đã đệ đơn kiện công ty vì tội sa thải không công bằng."
          },
          {
            id: "t900_15",
            word: "arbitration",
            phonetic: "/ˌɑː.bɪˈtreɪ.ʃən/",
            wordType: "noun",
            meaningVi: "sự hòa giải, sự phân xử tranh chấp",
            meaningEn: "the hearing and determining of a dispute by an impartial referee chosen by both parties",
            example: "The two corporations agreed to resolve their dispute through international arbitration.",
            exampleVi: "Hai tập đoàn đã đồng ý giải quyết tranh chấp của họ thông qua trọng tài quốc tế."
          },
          {
            id: "t900_16",
            word: "breach",
            phonetic: "/briːtʃ/",
            wordType: "verb/noun",
            meaningVi: "sự vi phạm (hợp đồng, quy định)",
            meaningEn: "an act of breaking or failing to observe a law, agreement, or code of conduct",
            example: "Failing to deliver the materials on time is a clear breach of contract.",
            exampleVi: "Không giao vật liệu đúng hạn là một sự vi phạm hợp đồng rõ ràng."
          },
          {
            id: "t900_17",
            word: "patent",
            phonetic: "/ˈpeɪ.tənt/",
            wordType: "noun/verb",
            meaningVi: "bằng sáng chế, bằng độc quyền",
            meaningEn: "a government authority or license conferring a right or title for a set period",
            example: "The biotechnology firm filed a patent application for their newly developed vaccine.",
            exampleVi: "Công ty công nghệ sinh học đã nộp đơn đăng ký bằng sáng chế cho loại vắc-xin mới phát triển của họ."
          },
          {
            id: "t900_18",
            word: "trademark",
            phonetic: "/ˈtreɪd.mɑːk/",
            wordType: "noun/verb",
            meaningVi: "nhãn hiệu đã được bảo hộ độc quyền",
            meaningEn: "a symbol, word, or words legally registered or established by use as representing a company",
            example: "Our logo is a registered trademark and cannot be copied without permission.",
            exampleVi: "Biểu trưng của chúng tôi là một nhãn hiệu đã được đăng ký và không được sao chép nếu không có sự cho phép."
          },
          {
            id: "t900_19",
            word: "jurisdiction",
            phonetic: "/ˌdʒʊə.rɪsˈdɪk.ʃən/",
            wordType: "noun",
            meaningVi: "thẩm quyền pháp lý, quyền hạn xét xử",
            meaningEn: "the official power to make legal decisions and judgments",
            example: "This legal matter falls under the jurisdiction of the federal court.",
            exampleVi: "Vấn đề pháp lý này thuộc thẩm quyền xét xử của tòa án liên bang."
          },
          {
            id: "t900_20",
            word: "compliance",
            phonetic: "/kəmˈplaɪ.əns/",
            wordType: "noun",
            meaningVi: "sự tuân thủ đúng luật",
            meaningEn: "the action or fact of complying with a wish or command, laws or regulations",
            example: "The firm works closely with inspectors to ensure full compliance with waste treatment laws.",
            exampleVi: "Công ty hợp tác chặt chẽ với các thanh tra viên để đảm bảo tuân thủ đầy đủ các luật xử lý chất thải."
          }
        ]
      }
    ]
  },
  {
    id: "part1_photos",
    title: "Part 1 (Miêu Tả Tranh)",
    description: "Hành động của người, tư thế và vị trí sắp xếp của vật thể xuất hiện nhiều nhất trong phần tranh ảnh.",
    difficulty: "Dễ",
    color: "from-emerald-500 to-teal-400",
    lists: [
      {
        id: "part1_list1",
        name: "List 1: Common Actions",
        description: "Các động từ mô tả tư thế và hành động của nhân vật trong tranh.",
        words: [
          {
            id: "p1_1",
            word: "gesture",
            phonetic: "/ˈdʒes.tʃər/",
            wordType: "verb/noun",
            meaningVi: "ra cử chỉ, điệu bộ bằng tay",
            meaningEn: "to make a movement with your hands or head to express an idea or feeling",
            example: "A speaker is gesturing with his hands in front of the audience.",
            exampleVi: "Một diễn giả đang ra cử chỉ bằng hai tay trước khán giả."
          },
          {
            id: "p1_2",
            word: "admire",
            phonetic: "/ədˈmaɪər/",
            wordType: "verb",
            meaningVi: "ngắm nhìn, chiêm ngưỡng",
            meaningEn: "to look at something with pleasure, appreciation, or respect",
            example: "A customer is admiring an artwork hanging on the gallery wall.",
            exampleVi: "Một khách hàng đang chiêm ngưỡng một bức tác phẩm nghệ thuật treo trên tường phòng trưng bày."
          },
          {
            id: "p1_3",
            word: "adjust",
            phonetic: "/əˈdʒʌst/",
            wordType: "verb",
            meaningVi: "điều chỉnh, sửa cho vừa vặn",
            meaningEn: "to alter or move something slightly in order to achieve the desired fit or position",
            example: "The mechanic is adjusting a piece of machinery in the workshop.",
            exampleVi: "Người thợ cơ khí đang điều chỉnh một chi tiết máy móc trong xưởng làm việc."
          },
          {
            id: "p1_4",
            word: "stack",
            phonetic: "/stæk/",
            wordType: "verb/noun",
            meaningVi: "xếp chồng lên nhau, chất đống",
            meaningEn: "to arrange objects in a neat pile, one on top of the other",
            example: "Wooden chairs are stacked in the corner of the conference room.",
            exampleVi: "Những chiếc ghế gỗ đang được xếp chồng lên nhau trong góc phòng hội nghị."
          },
          {
            id: "p1_5",
            word: "lean",
            phonetic: "/liːn/",
            wordType: "verb",
            meaningVi: "tựa vào, nghiêng người",
            meaningEn: "to slope in one direction, or support body weight against a wall or counter",
            example: "The bicycle is leaning against the stone wall near the entrance.",
            exampleVi: "Chiếc xe đạp đang tựa vào bức tường đá gần lối ra vào."
          },
          {
            id: "p1_6",
            word: "assemble",
            phonetic: "/əˈsem.bəl/",
            wordType: "verb",
            meaningVi: "lắp ráp linh kiện",
            meaningEn: "to fit together the separate component parts of a machine or other object",
            example: "Workers are assembling electronic devices along the production line.",
            exampleVi: "Các công nhân đang lắp ráp các thiết bị điện tử dọc theo dây chuyền sản xuất."
          },
          {
            id: "p1_7",
            word: "distribute",
            phonetic: "/dɪˈstrɪb.juːt/",
            wordType: "verb",
            meaningVi: "phân phát tài liệu",
            meaningEn: "to hand out or share items among a group of people",
            example: "A clerk is distributing flyers to people on the pedestrian walk.",
            exampleVi: "Một nhân viên đang phát tờ rơi cho mọi người trên lối đi bộ."
          },
          {
            id: "p1_8",
            word: "descend",
            phonetic: "/dɪˈsend/",
            wordType: "verb",
            meaningVi: "đi xuống, bước xuống (cầu thang)",
            meaningEn: "to move downward or fall, typically down stairs or a slope",
            example: "Passengers are descending the steps of the airplane.",
            exampleVi: "Hành khách đang đi xuống các bậc thềm của máy bay."
          },
          {
            id: "p1_9",
            word: "overlook",
            phonetic: "/ˌəʊ.vəˈlʊk/",
            wordType: "verb",
            meaningVi: "trông ra phía, nhìn ra hướng",
            meaningEn: "to have a view of a place from above",
            example: "The office windows overlook a busy city harbor.",
            exampleVi: "Các cửa sổ văn phòng trông ra một bến cảng thành phố tấp nập."
          },
          {
            id: "p1_10",
            word: "pavement",
            phonetic: "/ˈpeɪv.mənt/",
            wordType: "noun",
            meaningVi: "vỉa hè, lề đường đi bộ",
            meaningEn: "a paved path for pedestrians at the side of a road",
            example: "A vendor has set up a small stand on the pavement.",
            exampleVi: "Một người bán hàng rong đã dựng một quầy hàng nhỏ trên vỉa hè."
          }
        ]
      },
      {
        id: "part1_list2",
        name: "List 2: Office & Outdoors",
        description: "Các đồ vật và cảnh vật tĩnh vật xung quanh không gian làm việc ngoài trời.",
        words: [
          {
            id: "p1_11",
            word: "monitor",
            phonetic: "/ˈmɒn.ɪ.tər/",
            wordType: "noun/verb",
            meaningVi: "màn hình máy tính",
            meaningEn: "a screen which displays an image from a computer; or observe progress",
            example: "Some monitors have been placed on desks side by side.",
            exampleVi: "Một vài màn hình máy tính đã được đặt song song trên bàn."
          },
          {
            id: "p1_12",
            word: "whiteboard",
            phonetic: "/ˈwaɪt.bɔːd/",
            wordType: "noun",
            meaningVi: "bảng viết bút lông màu trắng",
            meaningEn: "a large board with a smooth white surface, used for writing with dry-erase markers",
            example: "The speaker is writing notes on a whiteboard in the meeting room.",
            exampleVi: "Người nói đang viết ghi chú trên bảng trắng trong phòng họp."
          },
          {
            id: "p1_13",
            word: "sidewalk",
            phonetic: "/ˈsaɪd.wɔːk/",
            wordType: "noun",
            meaningVi: "vỉa hè đi bộ",
            meaningEn: "a paved path for pedestrians at the side of a road (American English)",
            example: "A row of trees has been planted along the sidewalk.",
            exampleVi: "Một hàng cây đã được trồng dọc theo vỉa hè đi bộ."
          },
          {
            id: "p1_14",
            word: "staircase",
            phonetic: "/ˈsteə.keɪs/",
            wordType: "noun",
            meaningVi: "cầu thang, lối cầu thang bộ",
            meaningEn: "a set of stairs and its surrounding walls or structure",
            example: "A metal handrail is fixed to the wall along the staircase.",
            exampleVi: "Một lan can kim loại được gắn cố định vào tường dọc theo cầu thang."
          },
          {
            id: "p1_15",
            word: "patio",
            phonetic: "/ˈpæt.i.əʊ/",
            wordType: "noun",
            meaningVi: "khoảng sân ngoài trời (kề bên nhà)",
            meaningEn: "a paved outdoor area adjoining a house, used for dining or recreation",
            example: "Several tables and chairs are set up on the outdoor patio.",
            exampleVi: "Nhiều bàn ghế được thiết lập trên khoảng sân ngoài trời."
          },
          {
            id: "p1_16",
            word: "lawn",
            phonetic: "/lɔːn/",
            wordType: "noun",
            meaningVi: "thảm cỏ, bãi cỏ",
            meaningEn: "an area of short, regularly mown grass in the yard of a house or park",
            example: "A worker is mowing the lawn near the office entrance.",
            exampleVi: "Một công nhân đang cắt cỏ gần lối vào văn phòng."
          },
          {
            id: "p1_17",
            word: "vehicle",
            phonetic: "/ˈvɪə.kəl/",
            wordType: "noun",
            meaningVi: "xe cộ, phương tiện giao thông",
            meaningEn: "a thing used for transporting people or goods, especially on land",
            example: "Some vehicles are parked along the curb of the street.",
            exampleVi: "Một số phương tiện giao thông đang đỗ dọc theo mép đường."
          },
          {
            id: "p1_18",
            word: "pedestrian",
            phonetic: "/pəˈdes.tri.ən/",
            wordType: "noun/adjective",
            meaningVi: "người đi bộ",
            meaningEn: "a person walking along a road or in a developed area",
            example: "Pedestrians are crossing the street at the designated crosswalk.",
            exampleVi: "Người đi bộ đang băng qua đường tại vạch kẻ đường được quy định."
          },
          {
            id: "p1_19",
            word: "shelves",
            phonetic: "/ʃelvz/",
            wordType: "noun (plural)",
            meaningVi: "kệ sách, các ngăn kệ đựng đồ",
            meaningEn: "flat horizontal boards fixed to a wall or cabinet to store things",
            example: "Goods have been arranged neatly on the wooden shelves.",
            exampleVi: "Hàng hóa đã được sắp xếp gọn gàng trên các ngăn kệ gỗ."
          },
          {
            id: "p1_20",
            word: "wheelbarrow",
            phonetic: "/ˈwiːl.bær.əʊ/",
            wordType: "noun",
            meaningVi: "xe rùa, xe cút kít (chở đất đá)",
            meaningEn: "a small cart with a single wheel in front and handles behind, used for gardening or building works",
            example: "The construction worker is pushing a wheelbarrow filled with dirt.",
            exampleVi: "Công nhân xây dựng đang đẩy một chiếc xe rùa chứa đầy đất."
          }
        ]
      }
    ]
  },
  {
    id: "part2_qr",
    title: "Part 2 (Hỏi Đáp Phản Xạ)",
    description: "Từ vựng chỉ danh từ, chức danh và địa điểm giúp nghe nhanh câu hỏi Who, Where, When.",
    difficulty: "Trung bình",
    color: "from-pink-500 to-rose-450",
    lists: [
      {
        id: "part2_list1",
        name: "List 1: Who & Where Keywords",
        description: "Các chức danh và phòng ban doanh nghiệp xuất hiện nhiều nhất.",
        words: [
          {
            id: "p2_1",
            word: "coordinator",
            phonetic: "/kəʊˈɔː.dɪ.neɪ.tər/",
            wordType: "noun",
            meaningVi: "điều phối viên, người tổ chức",
            meaningEn: "a person who organizes and integrates various elements of a project or activity",
            example: "Please contact our event coordinator to confirm details of the dinner.",
            exampleVi: "Vui lòng liên hệ với điều phối viên sự kiện của chúng tôi để xác nhận chi tiết bữa tối."
          },
          {
            id: "p2_2",
            word: "representative",
            phonetic: "/ˌrep.rɪˈzen.tə.tɪv/",
            wordType: "noun",
            meaningVi: "người đại diện (bán hàng/chăm sóc khách hàng)",
            meaningEn: "a person chosen or appointed to act or speak for another, client or firm",
            example: "A customer service representative will help you solve this connection problem.",
            exampleVi: "Một đại diện dịch vụ khách hàng sẽ giúp bạn giải quyết vấn đề kết nối này."
          },
          {
            id: "p2_3",
            word: "appointment",
            phonetic: "/əˈpɔɪnt.mənt/",
            wordType: "noun",
            meaningVi: "cuộc hẹn (làm việc)",
            meaningEn: "an arrangement to meet someone at a particular time and place",
            example: "I need to make an appointment with the dental hygienist for next Monday.",
            exampleVi: "Tôi cần đặt một cuộc hẹn với kỹ thuật viên vệ sinh răng miệng vào thứ Hai tới."
          },
          {
            id: "p2_4",
            word: "supervisor",
            phonetic: "/ˈsuː.pə.vaɪ.zər/",
            wordType: "noun",
            meaningVi: "người giám sát, tổ trưởng",
            meaningEn: "a person who stands over or directs workers or the execution of work",
            example: "The supervisor must approve all overtime work hours in writing.",
            exampleVi: "Người giám sát phải phê duyệt bằng văn bản cho tất cả số giờ làm việc tăng ca."
          },
          {
            id: "p2_5",
            word: "division",
            phonetic: "/dɪˈvɪʒ.ən/",
            wordType: "noun",
            meaningVi: "phòng ban, bộ phận lớn (trong tập đoàn)",
            meaningEn: "a major section or department of a large business organization",
            example: "Our marketing division is launching the campaign across East Asia next month.",
            exampleVi: "Bộ phận tiếp thị của chúng tôi đang triển khai chiến dịch khắp Đông Á vào tháng tới."
          },
          {
            id: "p2_6",
            word: "branch",
            phonetic: "/brɑːntʃ/",
            wordType: "noun",
            meaningVi: "chi nhánh (ngân hàng, cửa hàng)",
            meaningEn: "a conceptual division or localized office of a larger business",
            example: "The bank is opening a new branch in downtown Da Nang next week.",
            exampleVi: "Ngân hàng đang mở một chi nhánh mới ở trung tâm Đà Nẵng vào tuần tới."
          },
          {
            id: "p2_7",
            word: "executive",
            phonetic: "/ɪɡˈzek.jə.tɪv/",
            wordType: "noun/adjective",
            meaningVi: "giám đốc điều hành, ủy viên ban quản trị",
            meaningEn: "a person with senior managerial responsibility in a business organization",
            example: "Senior executives gathered in the boardroom to discuss merger options.",
            exampleVi: "Các giám đốc điều hành cấp cao đã tập trung tại phòng họp để thảo luận về các phương án sáp nhập."
          },
          {
            id: "p2_8",
            word: "headquarters",
            phonetic: "/ˌhedˈkwɔː.təz/",
            wordType: "noun",
            meaningVi: "trụ sở chính",
            meaningEn: "the main office or center of operations of a business organization",
            example: "The technological company decided to move its headquarters from Tokyo to Seoul.",
            exampleVi: "Công ty công nghệ đã quyết định chuyển trụ sở chính từ Tokyo sang Seoul."
          },
          {
            id: "p2_9",
            word: "assistant",
            phonetic: "/əˈsɪs.tənt/",
            wordType: "noun",
            meaningVi: "trợ lý, người giúp việc",
            meaningEn: "a person who helps or aids another, especially in a junior or subordinate capacity",
            example: "The administrative assistant is copying some documents in the staff room.",
            exampleVi: "Trợ lý hành chính đang sao chép một số tài liệu trong phòng nhân viên."
          },
          {
            id: "p2_10",
            word: "receptionist",
            phonetic: "/rɪˈsep.ʃən.ɪst/",
            wordType: "noun",
            meaningVi: "nhân viên lễ tân",
            meaningEn: "a person who greets visitors and answers phone calls at the entrance of a hotel or office",
            example: "The receptionist asked me to fill out this registration form.",
            exampleVi: "Nhân viên lễ tân yêu cầu tôi điền vào mẫu đăng ký này."
          }
        ]
      }
    ]
  },
  {
    id: "collocations",
    title: "Collocations (Cụm Từ Cố Định)",
    description: "Động từ + giới từ, tính từ + giới từ cực kỳ phổ biến trong đề thi Part 5 giúp làm nhanh.",
    difficulty: "Trung bình",
    color: "from-amber-500 to-orange-400",
    lists: [
      {
        id: "colloc_list1",
        name: "List 1: Verb + Preposition",
        description: "Các động từ luôn đi kèm với giới từ cố định.",
        words: [
          {
            id: "c1_1",
            word: "comply with",
            phonetic: "/kəmˈplaɪ wɪð/",
            wordType: "phrase",
            meaningVi: "tuân theo, tuân thủ (luật lệ)",
            meaningEn: "to act in accordance with a wish, rule, or command",
            example: "All factory personnel must comply with the new safety regulations.",
            exampleVi: "Tất cả nhân viên nhà máy phải tuân thủ các quy định an toàn mới."
          },
          {
            id: "c1_2",
            word: "provide with",
            phonetic: "/prəˈvaɪd wɪð/",
            wordType: "phrase",
            meaningVi: "cung cấp cái gì cho ai",
            meaningEn: "to make available for use; supply someone with something they need",
            example: "The company will provide all recruits with laptop computers.",
            exampleVi: "Công ty sẽ cung cấp máy tính xách tay cho tất cả nhân viên mới tuyển."
          },
          {
            id: "c1_3",
            word: "depend on",
            phonetic: "/dɪˈpend ɒn/",
            wordType: "phrase",
            meaningVi: "phụ thuộc vào, tùy thuộc",
            meaningEn: "to rely on or be controlled by someone or something",
            example: "Our marketing success depends on customer feedback.",
            exampleVi: "Sự thành công của chiến dịch tiếp thị phụ thuộc vào phản hồi của khách hàng."
          },
          {
            id: "c1_4",
            word: "refrain from",
            phonetic: "/rɪˈfreɪn frɒm/",
            wordType: "phrase",
            meaningVi: "kiềm chế, kiêng, tránh làm gì",
            meaningEn: "to stop oneself from doing something",
            example: "Please refrain from using mobile phones during the performance.",
            exampleVi: "Vui lòng tránh sử dụng điện thoại di động trong suốt buổi biểu diễn."
          },
          {
            id: "c1_5",
            word: "specialize in",
            phonetic: "/ˈspeʃ.əl.aɪz ɪn/",
            wordType: "phrase",
            meaningVi: "chuyên về lĩnh vực gì",
            meaningEn: "to concentrate on and become an expert in a particular subject or skill",
            example: "Our accounting law firm specializes in tax audits for international corporations.",
            exampleVi: "Công ty luật kế toán của chúng tôi chuyên về kiểm toán thuế cho các tập đoàn quốc tế."
          },
          {
            id: "c1_6",
            word: "deal with",
            phonetic: "/diːl wɪð/",
            wordType: "phrase",
            meaningVi: "giải quyết, đối phó",
            meaningEn: "to take action on; to handle a problem or client request",
            example: "The customer service agent is trained to deal with angry callers.",
            exampleVi: "Nhân viên dịch vụ khách hàng được đào tạo để giải quyết các cuộc gọi tức giận."
          },
          {
            id: "c1_7",
            word: "contribute to",
            phonetic: "/kənˈtrɪb.juːt tuː/",
            wordType: "phrase",
            meaningVi: "đóng góp vào, góp phần",
            meaningEn: "to give something in order to help achieve or provide something",
            example: "We hope this new advertising campaign will contribute to higher sales.",
            exampleVi: "Chúng tôi hy vọng chiến dịch quảng cáo mới này sẽ góp phần thúc đẩy doanh thu cao hơn."
          },
          {
            id: "c1_8",
            word: "focus on",
            phonetic: "/ˈfəʊ.kəs ɒn/",
            wordType: "phrase",
            meaningVi: "tập trung vào điều gì",
            meaningEn: "to pay particular attention to one thing",
            example: "The meeting will focus on improving productivity and reducing cost.",
            exampleVi: "Cuộc họp sẽ tập trung vào việc nâng cao năng suất và giảm chi phí."
          },
          {
            id: "c1_9",
            word: "interfere with",
            phonetic: "/ˌɪn.təˈfɪər wɪð/",
            wordType: "phrase",
            meaningVi: "can thiệp vào, gây cản trở",
            meaningEn: "to prevent a process or activity from continuing smoothly",
            example: "Bad weather will interfere with the scheduled construction works.",
            exampleVi: "Thời tiết xấu sẽ cản trở các công trình xây dựng đã lên lịch trình."
          },
          {
            id: "c1_10",
            word: "collaborate with",
            phonetic: "/kəˈlæb.ə.reɪt wɪð/",
            wordType: "phrase",
            meaningVi: "hợp tác làm việc cùng ai",
            meaningEn: "to work jointly on a project or task with others",
            example: "Our department must collaborate with designers to finalize the product.",
            exampleVi: "Bộ phận của chúng tôi phải hợp tác với các nhà thiết kế để hoàn thiện sản phẩm."
          }
        ]
      },
      {
        id: "colloc_list2",
        name: "List 2: Adjective + Preposition",
        description: "Các tính từ thường gặp đi kèm giới từ đặc trưng.",
        words: [
          {
            id: "c1_11",
            word: "responsible for",
            phonetic: "/rɪˈspɒn.sə.bəl fɔːr/",
            wordType: "phrase",
            meaningVi: "chịu trách nhiệm cho việc gì",
            meaningEn: "having a duty to be in charge of or look after something",
            example: "The project manager is responsible for allocating final budget funds.",
            exampleVi: "Quản lý dự án chịu trách nhiệm phân bổ nguồn ngân sách cuối cùng."
          },
          {
            id: "c1_12",
            word: "capable of",
            phonetic: "/ˈkeɪ.pə.bəl ɒv/",
            wordType: "phrase",
            meaningVi: "có khả năng làm gì",
            meaningEn: "having the ability, fitness, or quality necessary to do something",
            example: "The new server hardware is capable of processing millions of queries per second.",
            exampleVi: "Phần cứng máy chủ mới có khả năng xử lý hàng triệu truy vấn mỗi giây."
          },
          {
            id: "c1_13",
            word: "familiar with",
            phonetic: "/fəˈmɪl.i.ər wɪð/",
            wordType: "phrase",
            meaningVi: "quen thuộc, am hiểu về cái gì",
            meaningEn: "having a good knowledge or understanding of something",
            example: "Are you familiar with the accounting software used in our department?",
            exampleVi: "Bạn có quen thuộc với phần mềm kế toán được sử dụng trong bộ phận của chúng tôi không?"
          },
          {
            id: "c1_14",
            word: "interested in",
            phonetic: "/ˈɪn.trəs.tɪd ɪn/",
            wordType: "phrase",
            meaningVi: "hứng thú, quan tâm đến việc gì",
            meaningEn: "showing curiosity or concern about something; wanting to know more",
            example: "Many candidates are interested in the senior marketing position.",
            exampleVi: "Nhiều ứng viên quan tâm đến vị trí tiếp thị cấp cao."
          },
          {
            id: "c1_15",
            word: "satisfied with",
            phonetic: "/ˈsæt.ɪs.faɪd wɪð/",
            wordType: "phrase",
            meaningVi: "hài lòng với cái gì",
            meaningEn: "contented; pleased with the outcome of something",
            example: "The management is extremely satisfied with the sales results of this quarter.",
            exampleVi: "Ban quản lý vô cùng hài lòng với kết quả doanh số của quý này."
          },
          {
            id: "c1_16",
            word: "aware of",
            phonetic: "/əˈweər ɒv/",
            wordType: "phrase",
            meaningVi: "nhận thức được, ý thức về điều gì",
            meaningEn: "having knowledge or perception of a situation or fact",
            example: "Staff must be fully aware of the evacuation routes during emergency drills.",
            exampleVi: "Nhân viên phải ý thức đầy đủ về các lối thoát hiểm trong các cuộc diễn tập khẩn cấp."
          },
          {
            id: "c1_17",
            word: "eligible for",
            phonetic: "/ˈel.ɪ.dʒə.bəl fɔːr/",
            wordType: "phrase",
            meaningVi: "đủ điều kiện cho cái gì",
            meaningEn: "having the right to do or obtain something; satisfying the appropriate conditions",
            example: "Full-time workers are eligible for paid sick leave and health benefits.",
            exampleVi: "Công nhân làm việc toàn thời gian đủ điều kiện nhận thời gian nghỉ bệnh có lương và các lợi ích sức khỏe."
          },
          {
            id: "c1_18",
            word: "similar to",
            phonetic: "/ˈsɪm.ɪ.lər tuː/",
            wordType: "phrase",
            meaningVi: "tương tự với cái gì",
            meaningEn: "having a resemblance in appearance, character, or quantity",
            example: "The interface of the new application is quite similar to our previous web app.",
            exampleVi: "Giao diện của ứng dụng mới khá tương tự với ứng dụng web trước đây của chúng tôi."
          },
          {
            id: "c1_19",
            word: "different from",
            phonetic: "/ˈdɪf.ər.ənt frɒm/",
            wordType: "phrase",
            meaningVi: "khác biệt với cái gì",
            meaningEn: "not the same as another or each other; unlike",
            example: "This year's promotional model is entirely different from the previous one.",
            exampleVi: "Mẫu sản phẩm quảng cáo năm nay hoàn toàn khác biệt so với mẫu trước đó."
          },
          {
            id: "c1_20",
            word: "vital to",
            phonetic: "/ˈvaɪ.təl tuː/",
            wordType: "phrase",
            meaningVi: "quan trọng, cốt yếu đối với cái gì",
            meaningEn: "absolutely necessary or important; essential to something",
            example: "Consistent market research is vital to the success of product branding.",
            exampleVi: "Nghiên cứu thị trường nhất quán là điều cốt yếu đối với sự thành công của định vị thương hiệu sản phẩm."
          }
        ]
      }
    ]
  },
  {
    id: "target990",
    title: "Target 990 (Master & Executive)",
    description: "Bộ từ vựng và cụm từ chuyên sâu dành cho cấp điều hành, sáp nhập doanh nghiệp và phân tích tài chính quốc tế.",
    difficulty: "Thách Thức",
    color: "from-amber-600 to-rose-600",
    lists: [
      {
        id: "target990_list1",
        name: "List 1: Corporate Governance & Mergers",
        description: "Từ vựng về quản trị doanh nghiệp, sáp nhập & thâu tóm (M&A) và chiến lược cấp cao.",
        words: [
          {
            id: "t990_1",
            word: "acquisition",
            phonetic: "/ˌæk.wɪˈzɪʃ.ən/",
            wordType: "noun",
            meaningVi: "sự thâu tóm, mua lại doanh nghiệp",
            meaningEn: "an asset or object bought or obtained, typically by a business",
            example: "The board unanimously approved the acquisition of the rival tech firm.",
            exampleVi: "Hội đồng quản trị đã nhất trí thông qua việc mua lại công ty công nghệ đối thủ."
          },
          {
            id: "t990_2",
            word: "amalgamation",
            phonetic: "/əˌmæl.ɡəˈmeɪ.ʃən/",
            wordType: "noun",
            meaningVi: "sự hợp nhất, liên kết nhiều doanh nghiệp",
            meaningEn: "the action, process, or result of combining or uniting multiple organizations",
            example: "The amalgamation of the two logistics giants resulted in a 40% increase in market share.",
            exampleVi: "Sự hợp nhất của hai gã khổng lồ vận tải đã dẫn đến mức tăng 40% thị phần."
          },
          {
            id: "t990_3",
            word: "conglomerate",
            phonetic: "/kənˈɡlɒm.ər.ət/",
            wordType: "noun",
            meaningVi: "tập đoàn đa ngành",
            meaningEn: "a corporation that is made up of a number of different, seemingly unrelated businesses",
            example: "The multinational conglomerate operates divisions in energy, retail, and telecommunications.",
            exampleVi: "Tập đoàn đa quốc gia này vận hành các chi nhánh trong ngành năng lượng, bán lẻ và viễn thông."
          },
          {
            id: "t990_4",
            word: "fiduciary",
            phonetic: "/fɪˈdʒuː.ʃər.i/",
            wordType: "adjective/noun",
            meaningVi: "ủy thác, thuộc về trách nhiệm tài chính",
            meaningEn: "involving trust, especially with regard to the relationship between a trustee and a beneficiary",
            example: "Executives have a fiduciary duty to act in the best financial interest of shareholders.",
            exampleVi: "Các giám đốc điều hành có trách nhiệm ủy thác phải hành động vì lợi ích tài chính tốt nhất của cổ đông."
          },
          {
            id: "t990_5",
            word: "remuneration",
            phonetic: "/rɪˌmjuː.nərˈeɪ.ʃən/",
            wordType: "noun",
            meaningVi: "thù lao, tiền thù lao quản lý",
            meaningEn: "money paid for work or a service",
            example: "Executive remuneration packages often include stock options and annual bonuses.",
            exampleVi: "Các gói thù lao điều hành thường bao gồm quyền chọn cổ phiếu và thưởng hàng năm."
          },
          {
            id: "t990_6",
            word: "discrepancy",
            phonetic: "/dɪˈskrep.ən.si/",
            wordType: "noun",
            meaningVi: "sự sai lệch, không thống nhất",
            meaningEn: "an illogical or surprising lack of compatibility between two or more facts",
            example: "Auditors uncovered a minor discrepancy between reported revenue and bank deposits.",
            exampleVi: "Các kiểm toán viên đã phát hiện một sự sai lệch nhỏ giữa doanh thu báo cáo và tiền gửi ngân hàng."
          },
          {
            id: "t990_7",
            word: "insolvency",
            phonetic: "/ɪnˈsɒl.vən.si/",
            wordType: "noun",
            meaningVi: "tình trạng mất khả năng thanh toán",
            meaningEn: "the state of being unable to pay the money owed, by a person or company",
            example: "The company avoided insolvency by restructuring its debt repayment schedule.",
            exampleVi: "Công ty đã tránh được tình trạng mất khả năng thanh toán bằng cách tái cấu trúc lịch trả nợ."
          },
          {
            id: "t990_8",
            word: "depreciation",
            phonetic: "/dɪˌpriː.ʃiˈeɪ.ʃən/",
            wordType: "noun",
            meaningVi: "sự khấu hao tài sản",
            meaningEn: "a reduction in the value of an asset with the passage of time",
            example: "Machinery depreciation must be factored into the annual financial statements.",
            exampleVi: "Khấu hao máy móc phải được tính vào báo cáo tài chính hàng năm."
          },
          {
            id: "t990_9",
            word: "subsidiary",
            phonetic: "/səbˈsɪd.i.ə.ri/",
            wordType: "noun/adjective",
            meaningVi: "công ty con, phụ thuộc",
            meaningEn: "a company controlled by a holding or parent company",
            example: "The European subsidiary contributed nearly half of total global sales.",
            exampleVi: "Công ty con tại Châu Âu đã đóng góp gần một nửa tổng doanh số toàn cầu."
          },
          {
            id: "t990_10",
            word: "synergy",
            phonetic: "/ˈsɪn.ə.dʒi/",
            wordType: "noun",
            meaningVi: "sự cộng hưởng, hiệu ứng kết hợp",
            meaningEn: "the interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects",
            example: "The partnership created substantial financial synergy across both distribution networks.",
            exampleVi: "Mối quan hệ hợp tác đã tạo ra sự cộng hưởng tài chính đáng kể trên cả hai mạng lưới phân phối."
          }
        ]
      },
      {
        id: "target990_list2",
        name: "List 2: Financial Auditing & Trade Protocols",
        description: "Từ vựng kiểm toán nâng cao, thỏa thuận thương mại và đàm phán hợp đồng.",
        words: [
          {
            id: "t990_11",
            word: "stipulate",
            phonetic: "/ˈstɪp.jə.leɪt/",
            wordType: "verb",
            meaningVi: "quy định, quy ước rõ ràng trong hợp đồng",
            meaningEn: "specify a requirement, typically as part of a bargain or agreement",
            example: "Clause 5 stipulates that payments must be settled within 30 business days.",
            exampleVi: "Điều 5 quy định rằng các khoản thanh toán phải được thanh toán trong vòng 30 ngày làm việc."
          },
          {
            id: "t990_12",
            word: "indemnify",
            phonetic: "/ɪnˈdem.nɪ.faɪ/",
            wordType: "verb",
            meaningVi: "bồi thường, bảo đảm thiệt hại",
            meaningEn: "compensate someone for harm or loss",
            example: "The supplier agreed to indemnify the buyer against any shipping damages.",
            exampleVi: "Nhà cung cấp đã đồng ý bồi thường cho bên mua đối với bất kỳ thiệt hại vận chuyển nào."
          },
          {
            id: "t990_13",
            word: "default on",
            phonetic: "/dɪˈfɒlt ɒn/",
            wordType: "phrase/verb",
            meaningVi: "vỡ nợ, không trả đúng hạn khoản nợ",
            meaningEn: "fail to fulfill an obligation, especially to repay a loan",
            example: "If the firm defaults on its bond payments, its credit rating will drop drastically.",
            exampleVi: "Nếu công ty vỡ nợ các khoản thanh toán trái phiếu, xếp hạng tín dụng sẽ giảm mạnh."
          },
          {
            id: "t990_14",
            word: "benchmark",
            phonetic: "/ˈbentʃ.mɑːk/",
            wordType: "noun/verb",
            meaningVi: "tiêu chuẩn so sánh, chuẩn mực",
            meaningEn: "a standard or point of reference against which things may be compared or assessed",
            example: "Our customer retention rate serves as an industry benchmark for quality service.",
            exampleVi: "Tỷ lệ giữ chân khách hàng của chúng tôi đóng vai trò là chuẩn mực ngành về chất lượng dịch vụ."
          },
          {
            id: "t990_15",
            word: "liquidate",
            phonetic: "/ˈlɪk.wɪ.deɪt/",
            wordType: "verb",
            meaningVi: "thanh lý tài sản, giải thể",
            meaningEn: "wind up the affairs of a business or cause to be dissolved, turning assets into cash",
            example: "The retailer was forced to liquidate its physical stores after declaring bankruptcy.",
            exampleVi: "Nhà bán lẻ buộc phải thanh lý các cửa hàng vật lý sau khi tuyên bố phá sản."
          }
        ]
      }
    ]
  }
];
