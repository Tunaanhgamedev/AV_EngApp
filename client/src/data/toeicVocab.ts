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
    id: "target500",
    title: "Target 500+ (Cơ Bản)",
    description: "Từ vựng thông dụng nhất về văn phòng, công việc hàng ngày và giao tiếp cơ bản.",
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
            meaningVi: "hành lý (không đếm được)",
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
      }
    ]
  },
  {
    id: "target700",
    title: "Target 700+ (Trung Cấp)",
    description: "Từ vựng chuyên sâu về quản lý, tài chính, hợp đồng và dịch vụ khách hàng.",
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
      }
    ]
  },
  {
    id: "target900",
    title: "Target 900+ (Nâng Cao)",
    description: "Từ vựng cấp độ quản lý cao cấp, thuật ngữ pháp lý, sáp nhập và phân tích thị trường.",
    difficulty: "Khó",
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
            meaningVi: "sự cố bất ngờ, dự phòng",
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
            meaningEn: "an official inspection of an individual's or organization's accounts, typically by an independent body",
            example: "The international consulting firm was hired to conduct an annual financial audit.",
            exampleVi: "Công ty tư vấn quốc tế đã được thuê để tiến hành một cuộc kiểm toán tài chính hàng năm."
          },
          {
            id: "t900_4",
            word: "franchise",
            phonetic: "/ˈfræn.tʃaɪz/",
            wordType: "noun",
            meaningVi: "nhượng quyền thương mại",
            meaningEn: "an authorization granted by a government or company to an individual or group enabling them to carry out specified commercial activities",
            example: "He plans to purchase a franchise of a popular fast-food restaurant chain.",
            exampleVi: "Anh ấy có kế hoạch mua nhượng quyền thương mại của một chuỗi nhà hàng thức ăn nhanh nổi tiếng."
          },
          {
            id: "t900_5",
            word: "leverage",
            phonetic: "/ˈliː.vər.ɪdʒ/",
            wordType: "verb/noun",
            meaningVi: "tận dụng, đòn bẩy",
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
            meaningEn: "to invest in stocks, property, or other ventures in the hope of gain but with the risk of loss",
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
      }
    ]
  },
  {
    id: "part1_photos",
    title: "Part 1 (Miêu Tả Tranh)",
    description: "Các hành động, tư thế và vị trí của người/vật thường xuyên xuất hiện nhất trong phần thi Tranh ảnh.",
    difficulty: "Dễ",
    color: "from-emerald-500 to-teal-400",
    lists: [
      {
        id: "part1_list1",
        name: "List 1: Common Actions",
        description: "Các động từ mô tả tư thế và hành động trong tranh.",
        words: [
          {
            id: "p1_1",
            word: "gesture",
            phonetic: "/ˈdʒes.tʃər/",
            wordType: "verb/noun",
            meaningVi: "ra cử chỉ, điệu bộ",
            meaningEn: "to make a movement with your hands or head to express an idea or feeling",
            example: "A speaker is gesturing with his hands in front of the audience.",
            exampleVi: "Một diễn giả đang ra cử chỉ bằng hai tay trước khán giả."
          },
          {
            id: "p1_2",
            word: "admire",
            phonetic: "/ədˈmaɪər/",
            wordType: "verb",
            meaningVi: "chiêm ngưỡng, nhìn ngắm",
            meaningEn: "to look at something with pleasure, appreciation, or respect",
            example: "A customer is admiring an artwork hanging on the gallery wall.",
            exampleVi: "Một khách hàng đang chiêm ngưỡng một bức tác phẩm nghệ thuật treo trên tường phòng trưng bày."
          },
          {
            id: "p1_3",
            word: "adjust",
            phonetic: "/əˈdʒʌst/",
            wordType: "verb",
            meaningVi: "điều chỉnh, sửa cho khớp",
            meaningEn: "to alter or move something slightly in order to achieve the desired fit or position",
            example: "The mechanic is adjusting a piece of machinery in the workshop.",
            exampleVi: "Người thợ cơ khí đang điều chỉnh một chi tiết máy móc trong xưởng làm việc."
          },
          {
            id: "p1_4",
            word: "stack",
            phonetic: "/stæk/",
            wordType: "verb/noun",
            meaningVi: "chất đống, xếp chồng lên nhau",
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
            meaningVi: "lắp ráp, tụ tập",
            meaningEn: "to fit together the separate component parts of a machine or other object",
            example: "Workers are assembling electronic devices along the production line.",
            exampleVi: "Các công nhân đang lắp ráp các thiết bị điện tử dọc theo dây chuyền sản xuất."
          },
          {
            id: "p1_7",
            word: "distribute",
            phonetic: "/dɪˈstrɪb.juːt/",
            wordType: "verb",
            meaningVi: "phát, phân phát",
            meaningEn: "to hand out or share items among a group of people",
            example: "A clerk is distributing flyers to people on the pedestrian walk.",
            exampleVi: "Một nhân viên đang phát tờ rơi cho mọi người trên lối đi bộ."
          },
          {
            id: "p1_8",
            word: "descend",
            phonetic: "/dɪˈsend/",
            wordType: "verb",
            meaningVi: "đi xuống, đi xuống cầu thang",
            meaningEn: "to move downward or fall, typically down stairs or a slope",
            example: "Passengers are descending the steps of the airplane.",
            exampleVi: "Hành khách đang đi xuống các bậc thềm của máy bay."
          },
          {
            id: "p1_9",
            word: "overlook",
            phonetic: "/ˌəʊ.vəˈlʊk/",
            wordType: "verb",
            meaningVi: "nhìn ra hướng, trông ra phía",
            meaningEn: "to have a view of a place from above",
            example: "The office windows overlook a busy city harbor.",
            exampleVi: "Các cửa sổ văn phòng trông ra một bến cảng thành phố tấp nập."
          },
          {
            id: "p1_10",
            word: "pavement",
            phonetic: "/ˈpeɪv.mənt/",
            wordType: "noun",
            meaningVi: "vỉa hè, lề đường",
            meaningEn: "a paved path for pedestrians at the side of a road",
            example: "A vendor has set up a small stand on the pavement.",
            exampleVi: "Một người bán hàng rong đã dựng một quầy hàng nhỏ trên vỉa hè."
          }
        ]
      }
    ]
  },
  {
    id: "collocations",
    title: "Collocations (Cụm Từ Cố Định)",
    description: "Các cụm động từ, giới từ cực kỳ phổ biến trong đề thi Part 5, 6 nhằm tăng tốc độ làm bài.",
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
            meaningVi: "tuân theo, tuân thủ",
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
            meaningVi: "phụ thuộc vào",
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
            meaningVi: "chuyên về, chuyên môn hóa",
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
            meaningVi: "tập trung vào",
            meaningEn: "to pay particular attention to one thing",
            example: "The meeting will focus on improving productivity and reducing cost.",
            exampleVi: "Cuộc họp sẽ tập trung vào việc nâng cao năng suất và giảm chi phí."
          },
          {
            id: "c1_9",
            word: "interfere with",
            phonetic: "/ˌɪn.təˈfɪər wɪð/",
            wordType: "phrase",
            meaningVi: "can thiệp vào, cản trở",
            meaningEn: "to prevent a process or activity from continuing smoothly",
            example: "Bad weather will interfere with the scheduled construction works.",
            exampleVi: "Thời tiết xấu sẽ cản trở các công trình xây dựng đã lên lịch trình."
          },
          {
            id: "c1_10",
            word: "comply with",
            phonetic: "/kəmˈplaɪ wɪð/",
            wordType: "phrase",
            meaningVi: "tuân thủ theo",
            meaningEn: "to act in accordance with a rules or requirements",
            example: "The restaurant failed to comply with hygiene standards.",
            exampleVi: "Nhà hàng đã không tuân thủ các tiêu chuẩn vệ sinh."
          }
        ]
      }
    ]
  }
];
