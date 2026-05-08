require('dotenv').config();
const { Pool } = require('pg');
const { randomUUID } = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const WORDS = [
  // A1
  ['able','ˈeɪbl','(adj)','having the skill/means to do sth','có khả năng','A1'],
  ['about','əˈbaʊt','(prep)','on the subject of','về, khoảng','A1'],
  ['above','əˈbʌv','(prep)','at a higher level','ở trên','A1'],
  ['accept','əkˈsept','(v)','agree to receive','chấp nhận','A1'],
  ['accident','ˈæksɪdənt','(n)','unplanned event causing damage','tai nạn','A1'],
  ['act','ækt','(v)','do something','hành động','A1'],
  ['add','æd','(v)','put with something else','thêm vào','A1'],
  ['address','əˈdres','(n)','where sb lives','địa chỉ','A1'],
  ['age','eɪdʒ','(n)','how old sb is','tuổi','A1'],
  ['agree','əˈɡriː','(v)','have the same opinion','đồng ý','A1'],
  ['air','eər','(n)','mixture of gases we breathe','không khí','A1'],
  ['all','ɔːl','(det)','the whole amount','tất cả','A1'],
  ['allow','əˈlaʊ','(v)','let sb do sth','cho phép','A1'],
  ['also','ˈɔːlsəʊ','(adv)','in addition','cũng, ngoài ra','A1'],
  ['always','ˈɔːlweɪz','(adv)','at all times','luôn luôn','A1'],
  ['animal','ˈænɪml','(n)','living creature','động vật','A1'],
  ['answer','ˈɑːnsər','(n)','reply to a question','câu trả lời','A1'],
  ['arm','ɑːrm','(n)','part of the body','cánh tay','A1'],
  ['ask','ɑːsk','(v)','put a question to sb','hỏi','A1'],
  ['baby','ˈbeɪbi','(n)','very young child','em bé','A1'],
  ['back','bæk','(n)','rear part','phía sau, lưng','A1'],
  ['bad','bæd','(adj)','not good','xấu, tệ','A1'],
  ['bag','bæɡ','(n)','container made of soft material','túi','A1'],
  ['ball','bɔːl','(n)','round object used in games','quả bóng','A1'],
  ['bank','bæŋk','(n)','place where money is kept','ngân hàng','A1'],
  ['bathroom','ˈbɑːθruːm','(n)','room with bath/shower','phòng tắm','A1'],
  ['beautiful','ˈbjuːtɪfl','(adj)','very attractive','đẹp','A1'],
  ['because','bɪˈkɒz','(conj)','for the reason that','bởi vì','A1'],
  ['bed','bed','(n)','furniture you sleep on','giường','A1'],
  ['before','bɪˈfɔːr','(prep)','at an earlier time','trước khi','A1'],
  ['begin','bɪˈɡɪn','(v)','start','bắt đầu','A1'],
  ['bird','bɜːrd','(n)','animal with wings and feathers','chim','A1'],
  ['black','blæk','(adj)','darkest colour','màu đen','A1'],
  ['book','bʊk','(n)','set of printed pages','sách','A1'],
  ['born','bɔːrn','(adj)','having come into existence','được sinh ra','A1'],
  ['both','bəʊθ','(det)','the two','cả hai','A1'],
  ['boy','bɔɪ','(n)','male child','con trai','A1'],
  ['break','breɪk','(v)','separate into pieces','phá vỡ','A1'],
  ['bring','brɪŋ','(v)','carry to a place','mang lại','A1'],
  ['build','bɪld','(v)','make by putting parts together','xây dựng','A1'],
  ['bus','bʌs','(n)','large road vehicle','xe buýt','A1'],
  ['buy','baɪ','(v)','get sth by paying money','mua','A1'],
  ['call','kɔːl','(v)','phone or shout to sb','gọi','A1'],
  ['car','kɑːr','(n)','road vehicle with an engine','ô tô','A1'],
  ['care','keər','(v)','feel concern','quan tâm','A1'],
  ['carry','ˈkæri','(v)','hold and move sth','mang, xách','A1'],
  ['cat','kæt','(n)','small furry pet animal','con mèo','A1'],
  ['centre','ˈsentər','(n)','middle part of sth','trung tâm','A1'],
  ['change','tʃeɪndʒ','(v)','make or become different','thay đổi','A1'],
  ['check','tʃek','(v)','examine to find out','kiểm tra','A1'],
  // A2
  ['achieve','əˈtʃiːv','(v)','succeed in doing sth difficult','đạt được','A2'],
  ['action','ˈækʃn','(n)','process of doing sth','hành động','A2'],
  ['affect','əˈfekt','(v)','produce a change in','ảnh hưởng','A2'],
  ['afraid','əˈfreɪd','(adj)','feeling fear','sợ hãi','A2'],
  ['agent','ˈeɪdʒənt','(n)','person who acts for another','đại lý','A2'],
  ['almost','ˈɔːlməʊst','(adv)','nearly but not completely','gần như','A2'],
  ['already','ɔːlˈredi','(adv)','before now','đã, rồi','A2'],
  ['although','ɔːlˈðəʊ','(conj)','in spite of the fact that','mặc dù','A2'],
  ['among','əˈmʌŋ','(prep)','in the middle of','trong số','A2'],
  ['angry','ˈæŋɡri','(adj)','feeling strong displeasure','tức giận','A2'],
  ['another','əˈnʌðər','(det)','one more','một cái nữa','A2'],
  ['apart','əˈpɑːrt','(adv)','separated','tách ra, riêng','A2'],
  ['appear','əˈpɪər','(v)','come into view','xuất hiện','A2'],
  ['apply','əˈplaɪ','(v)','make a formal request','nộp đơn, áp dụng','A2'],
  ['area','ˈeəriə','(n)','part of a place or surface','khu vực','A2'],
  ['arrive','əˈraɪv','(v)','reach a place','đến nơi','A2'],
  ['article','ˈɑːrtɪkl','(n)','piece of writing in a newspaper','bài báo, mạo từ','A2'],
  ['attention','əˈtenʃn','(n)','notice, thought, care','sự chú ý','A2'],
  ['available','əˈveɪləbl','(adj)','able to be used or obtained','có sẵn','A2'],
  ['average','ˈævərɪdʒ','(adj)','typical or ordinary','trung bình','A2'],
  ['avoid','əˈvɔɪd','(v)','keep away from','tránh','A2'],
  ['award','əˈwɔːrd','(n)','prize given for sth','giải thưởng','A2'],
  ['beach','biːtʃ','(n)','area of sand by the sea','bãi biển','A2'],
  ['benefit','ˈbenɪfɪt','(n)','advantage you get from sth','lợi ích','A2'],
  ['between','bɪˈtwiːn','(prep)','in the space separating two things','giữa','A2'],
  ['billion','ˈbɪljən','(num)','1,000,000,000','tỷ','A2'],
  ['block','blɒk','(n)','large piece of a hard substance','khối, chặn','A2'],
  ['blue','bluː','(adj)','colour of the sky','màu xanh dương','A2'],
  ['body','ˈbɒdi','(n)','physical structure of a person','cơ thể','A2'],
  ['boss','bɒs','(n)','person in charge','sếp','A2'],
  ['brother','ˈbrʌðər','(n)','male sibling','anh/em trai','A2'],
  ['brown','braʊn','(adj)','colour of chocolate','màu nâu','A2'],
  ['busy','ˈbɪzi','(adj)','having a lot to do','bận rộn','A2'],
  ['button','ˈbʌtn','(n)','small disc sewn on clothes','nút, cúc','A2'],
  ['cake','keɪk','(n)','sweet food made from flour','bánh','A2'],
  ['campaign','kæmˈpeɪn','(n)','series of planned activities','chiến dịch','A2'],
  ['capital','ˈkæpɪtl','(n)','city that is the seat of govt','thủ đô, vốn','A2'],
  ['captain','ˈkæptɪn','(n)','person in command','thuyền trưởng, đội trưởng','A2'],
  ['careful','ˈkeəfl','(adj)','giving attention to avoid mistakes','cẩn thận','A2'],
  ['century','ˈsentʃəri','(n)','period of 100 years','thế kỷ','A2'],
  ['certain','ˈsɜːrtn','(adj)','known for sure','chắc chắn','A2'],
  ['chance','tʃɑːns','(n)','possibility of sth happening','cơ hội','A2'],
  ['character','ˈkærəktər','(n)','qualities that make sb who they are','tính cách','A2'],
  ['cheap','tʃiːp','(adj)','low in price','rẻ','A2'],
  ['choose','tʃuːz','(v)','pick from a number of options','lựa chọn','A2'],
  ['city','ˈsɪti','(n)','large important town','thành phố','A2'],
  ['class','klɑːs','(n)','group of students','lớp học','A2'],
  ['clean','kliːn','(adj)','free from dirt','sạch','A2'],
  ['clear','klɪər','(adj)','easy to see/understand','rõ ràng','A2'],
  ['climb','klaɪm','(v)','go up using hands and feet','leo trèo','A2'],
  ['close','kləʊz','(v)','shut','đóng','A2'],
  // B1
  ['ability','əˈbɪləti','(n)','power or skill to do sth','khả năng','B1'],
  ['absence','ˈæbsəns','(n)','state of being away','sự vắng mặt','B1'],
  ['account','əˈkaʊnt','(n)','arrangement with a bank','tài khoản','B1'],
  ['accurate','ˈækjərət','(adj)','correct and exact','chính xác','B1'],
  ['achievement','əˈtʃiːvmənt','(n)','thing done successfully','thành tích','B1'],
  ['active','ˈæktɪv','(adj)','doing things, busy','năng động','B1'],
  ['adapt','əˈdæpt','(v)','change to suit new conditions','thích nghi','B1'],
  ['adequate','ˈædɪkwət','(adj)','enough for a purpose','đủ, thỏa đáng','B1'],
  ['administration','ədˌmɪnɪˈstreɪʃn','(n)','management of an organization','quản lý, hành chính','B1'],
  ['advance','ədˈvɑːns','(v)','move forward','tiến lên, tiến bộ','B1'],
  ['advantage','ədˈvɑːntɪdʒ','(n)','sth that helps you succeed','lợi thế','B1'],
  ['advertise','ˈædvətaɪz','(v)','tell people about a product','quảng cáo','B1'],
  ['advice','ədˈvaɪs','(n)','suggestion about what to do','lời khuyên','B1'],
  ['afford','əˈfɔːrd','(v)','have enough money for sth','đủ tiền để','B1'],
  ['afterwards','ˈɑːftəwədz','(adv)','later, after that','sau đó','B1'],
  ['agenda','əˈdʒendə','(n)','list of items to be discussed','chương trình nghị sự','B1'],
  ['ahead','əˈhed','(adv)','further forward','phía trước','B1'],
  ['aid','eɪd','(n)','help, support','viện trợ, trợ giúp','B1'],
  ['aim','eɪm','(n)','purpose, goal','mục tiêu','B1'],
  ['alternative','ɔːlˈtɜːrnətɪv','(n)','one of two or more choices','sự lựa chọn khác','B1'],
  ['ambitious','æmˈbɪʃəs','(adj)','having a strong desire to succeed','tham vọng','B1'],
  ['analysis','əˈnæləsɪs','(n)','detailed examination of sth','phân tích','B1'],
  ['annual','ˈænjuəl','(adj)','happening every year','hàng năm','B1'],
  ['anxiety','æŋˈzaɪəti','(n)','feeling of worry','lo lắng, lo âu','B1'],
  ['apologize','əˈpɒlədʒaɪz','(v)','say sorry','xin lỗi','B1'],
  ['approach','əˈprəʊtʃ','(v)','come near to','tiếp cận','B1'],
  ['appropriate','əˈprəʊpriət','(adj)','suitable for a situation','phù hợp','B1'],
  ['approve','əˈpruːv','(v)','officially agree to sth','chấp thuận','B1'],
  ['argument','ˈɑːɡjumənt','(n)','reason given to support an idea','lập luận, tranh cãi','B1'],
  ['arrange','əˈreɪndʒ','(v)','plan and organize sth','sắp xếp','B1'],
  ['assessment','əˈsesmənt','(n)','judgment about sb/sth','đánh giá','B1'],
  ['assign','əˈsaɪn','(v)','give sb a task','giao nhiệm vụ','B1'],
  ['assist','əˈsɪst','(v)','help sb do sth','hỗ trợ','B1'],
  ['assume','əˈsjuːm','(v)','think sth is true without proof','giả định','B1'],
  ['attitude','ˈætɪtjuːd','(n)','way of thinking or feeling','thái độ','B1'],
  ['attract','əˈtrækt','(v)','make sb interested','thu hút','B1'],
  ['audience','ˈɔːdiəns','(n)','people watching a performance','khán giả','B1'],
  ['authority','ɔːˈθɒrəti','(n)','power to give orders','thẩm quyền, cơ quan','B1'],
  ['aware','əˈweər','(adj)','knowing about sth','nhận thức được','B1'],
  ['background','ˈbækɡraʊnd','(n)','sb past experience/education','nền tảng, hậu cảnh','B1'],
  ['balance','ˈbæləns','(n)','equal distribution of weight','cân bằng','B1'],
  ['barrier','ˈbæriər','(n)','obstacle that prevents sth','rào cản','B1'],
  ['basis','ˈbeɪsɪs','(n)','underlying support for sth','cơ sở','B1'],
  ['behaviour','bɪˈheɪvjər','(n)','way sb acts','hành vi','B1'],
  ['belief','bɪˈliːf','(n)','strong feeling sth is true','niềm tin','B1'],
  ['belong','bɪˈlɒŋ','(v)','be owned by sb','thuộc về','B1'],
  ['blame','bleɪm','(v)','say sb is responsible for sth bad','đổ lỗi','B1'],
  ['border','ˈbɔːrdər','(n)','line between two countries','biên giới','B1'],
  ['bother','ˈbɒðər','(v)','make effort to do sth','làm phiền, bận tâm','B1'],
  ['budget','ˈbʌdʒɪt','(n)','amount of money available','ngân sách','B1'],
  // B2
  ['abandon','əˈbændən','(v)','leave sb/sth permanently','từ bỏ','B2'],
  ['absolute','ˈæbsəluːt','(adj)','complete, total','tuyệt đối','B2'],
  ['abstract','ˈæbstrækt','(adj)','existing in thought, not concrete','trừu tượng','B2'],
  ['academic','ˌækəˈdemɪk','(adj)','relating to education','học thuật','B2'],
  ['accumulate','əˈkjuːmjuleɪt','(v)','gather over time','tích lũy','B2'],
  ['acknowledge','əkˈnɒlɪdʒ','(v)','accept the truth of sth','thừa nhận','B2'],
  ['acquire','əˈkwaɪər','(v)','gain knowledge or skill','đạt được, thu nạp','B2'],
  ['adequate','ˈædɪkwət','(adj)','enough for the purpose','đủ','B2'],
  ['advocate','ˈædvəkeɪt','(v)','publicly support a policy','ủng hộ, bảo vệ','B2'],
  ['allocate','ˈæləkeɪt','(v)','give sth officially for a purpose','phân bổ','B2'],
  ['alter','ˈɔːltər','(v)','change sth','thay đổi','B2'],
  ['ambiguous','æmˈbɪɡjuəs','(adj)','having more than one meaning','mơ hồ','B2'],
  ['anticipate','ænˈtɪsɪpeɪt','(v)','expect sth to happen','dự đoán, lường trước','B2'],
  ['apparent','əˈpærənt','(adj)','seeming to be true','rõ ràng, có vẻ như','B2'],
  ['aspect','ˈæspekt','(n)','one feature of a situation','khía cạnh','B2'],
  ['assert','əˈsɜːrt','(v)','state clearly and firmly','khẳng định','B2'],
  ['atmosphere','ˈætməsfɪər','(n)','mixture of gases around earth','bầu không khí','B2'],
  ['attribute','əˈtrɪbjuːt','(v)','regard sth as caused by','quy cho, gán cho','B2'],
  ['bias','ˈbaɪəs','(n)','unfair preference for one view','định kiến, thiên vị','B2'],
  ['bond','bɒnd','(n)','link or connection','mối ràng buộc','B2'],
  ['capable','ˈkeɪpəbl','(adj)','having ability to do sth','có khả năng','B2'],
  ['category','ˈkætəɡɔːri','(n)','class of things with common feature','loại, nhóm','B2'],
  ['challenge','ˈtʃælɪndʒ','(n)','sth new and difficult','thách thức','B2'],
  ['circumstance','ˈsɜːrkəmstæns','(n)','conditions affecting a situation','hoàn cảnh','B2'],
  ['collaborate','kəˈlæbəreɪt','(v)','work together','hợp tác','B2'],
  ['commitment','kəˈmɪtmənt','(n)','promise to do sth','cam kết','B2'],
  ['complex','ˈkɒmpleks','(adj)','consisting of many parts','phức tạp','B2'],
  ['concept','ˈkɒnsept','(n)','idea or principle','khái niệm','B2'],
  ['conflict','ˈkɒnflɪkt','(n)','serious disagreement','xung đột','B2'],
  ['consequence','ˈkɒnsɪkwəns','(n)','result of an action','hậu quả','B2'],
  ['consistent','kənˈsɪstənt','(adj)','always behaving the same way','nhất quán','B2'],
  ['contrast','ˈkɒntrɑːst','(n)','difference between two things','sự tương phản','B2'],
  ['contribute','kənˈtrɪbjuːt','(v)','give sth to help achieve sth','đóng góp','B2'],
  ['controversial','ˌkɒntrəˈvɜːrʃl','(adj)','causing public disagreement','gây tranh cãi','B2'],
  ['convince','kənˈvɪns','(v)','make sb believe sth','thuyết phục','B2'],
  ['cope','kəʊp','(v)','deal successfully with difficulty','đương đầu, xoay sở','B2'],
  ['criteria','kraɪˈtɪəriə','(n)','standards for judging sth','tiêu chí','B2'],
  ['crucial','ˈkruːʃl','(adj)','extremely important','quan trọng, then chốt','B2'],
  ['culture','ˈkʌltʃər','(n)','customs of a society','văn hóa','B2'],
  ['debate','dɪˈbeɪt','(n)','formal discussion','cuộc tranh luận','B2'],
  ['decline','dɪˈklaɪn','(v)','become smaller or weaker','suy giảm, từ chối','B2'],
  ['define','dɪˈfaɪn','(v)','explain the meaning of sth','định nghĩa','B2'],
  ['demonstrate','ˈdemənstreɪt','(v)','show clearly','chứng minh, biểu diễn','B2'],
  ['despite','dɪˈspaɪt','(prep)','without being affected by','mặc dù','B2'],
  ['develop','dɪˈveləp','(v)','grow or cause to grow','phát triển','B2'],
  ['diverse','daɪˈvɜːrs','(adj)','very different from each other','đa dạng','B2'],
  ['dominant','ˈdɒmɪnənt','(adj)','most important or powerful','chiếm ưu thế','B2'],
  ['efficient','ɪˈfɪʃnt','(adj)','achieving results without waste','hiệu quả','B2'],
  ['eliminate','ɪˈlɪmɪneɪt','(v)','remove completely','loại bỏ','B2'],
  ['emerge','ɪˈmɜːrdʒ','(v)','come out or become known','nổi lên, xuất hiện','B2'],
  ['emphasize','ˈemfəsaɪz','(v)','give special importance to','nhấn mạnh','B2'],
];

async function seed() {
  const client = await pool.connect();
  try {
    // Ensure unique constraint exists
    await client.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'vocabulary_words_word_key'
        ) THEN
          ALTER TABLE vocabulary_words ADD CONSTRAINT vocabulary_words_word_key UNIQUE (word);
        END IF;
      END $$;
    `).catch(() => {}); // ignore if already exists

    let added = 0, skipped = 0;
    for (const [word, phonetic, wordType, meaningEn, meaningVi, cefrLevel] of WORDS) {
      // Check if exists first
      const exists = await client.query('SELECT id FROM vocabulary_words WHERE LOWER(word)=LOWER($1)', [word]);
      if (exists.rows.length > 0) { skipped++; continue; }
      const id = randomUUID();
      await client.query(
        `INSERT INTO vocabulary_words (id, word, phonetic, word_type, meaning_en, meaning_vi, cefr_level)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [id, word, phonetic, wordType, meaningEn, meaningVi, cefrLevel]
      );
      added++;
    }
    const { rows } = await client.query('SELECT COUNT(*) FROM vocabulary_words');
    console.log(`✅ Done! Added: ${added}, Skipped: ${skipped}, Total in DB: ${rows[0].count}`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);
