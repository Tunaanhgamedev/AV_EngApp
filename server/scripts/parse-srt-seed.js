require('dotenv').config();
const fs = require('fs'), path = require('path');
const { Pool } = require('pg');
const { randomUUID } = require('crypto');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

// Oxford 3000 in order (A→Z) — matches video order
const OXFORD_WORDS = [
  'abandon','ability','able','about','above','abroad','absolute','absolutely','academic','accept',
  'acceptable','access','accident','accommodation','accompany','according','account','accurate',
  'accuse','achieve','achievement','acknowledge','acquire','across','act','action','active',
  'activity','actor','actress','actual','actually','adapt','add','addition','additional','address',
  'administration','admire','admit','adopt','adult','advance','adventure','advertise','advertisement',
  'advertising','advice','advise','affair','affect','afford','afraid','afternoon','afterwards',
  'against','age','agency','agenda','agent','aggressive','agree','agreement','ahead','aid','aim',
  'air','aircraft','airline','airport','alarm','alive','allow','almost','alone','along','already',
  'alter','alternative','although','always','amazed','amazing','ambition','ambitious','among',
  'amount','analysis','analyze','ancient','anger','angle','angry','animal','anniversary','announce',
  'announcement','annoy','annoyed','annoying','annual','another','answer','anxious','anybody',
  'anymore','anyone','anything','anyway','anywhere','apart','apartment','apologize','apparently',
  'appeal','appear','appearance','apply','appointment','appreciate','approach','appropriate',
  'approval','approve','approximately','architect','architecture','area','argue','argument','arise',
  'arm','armed','arms','army','arrange','arrangement','arrest','arrival','arrive','art','article',
  'artificial','artist','artistic','ashamed','ask','asleep','aspect','assess','assessment',
  'assignment','assist','assistant','associate','associated','association','assume','athlete',
  'atmosphere','attach','attack','attempt','attend','attention','attitude','attract','attraction',
  'attractive','audience','author','authority','autumn','available','average','avoid','award',
  'aware','awesome','awful','baby','back','background','backward','bacteria','bad','badly','bag',
  'bake','balance','ball','ban','banana','band','bar','barrier','base','baseball','basic',
  'basically','basis','basketball','bathroom','battery','battle','beach','bean','bear','beat',
  'beautiful','beauty','because','bedroom','beef','before','begin','beginning','behave','behavior',
  'behind','belief','believe','belong','below','belt','bend','benefit','best','better','between',
  'beyond','bicycle','big','bill','biology','bird','birth','birthday','biscuit','bite','bitter',
  'black','blame','blank','blind','block','blonde','blood','blow','blue','boat','body','boil',
  'bond','bone','book','border','bored','boring','born','borrow','boss','both','bother','bottle',
  'bottom','box','boy','boyfriend','brain','branch','brand','brave','bread','break','breakfast',
  'breathe','bride','bridge','brief','bright','brilliant','bring','broadcast','broken','brother',
  'brown','brush','bubble','budget','build','building','bullet','burn','bush','business','busy',
  'butter','button','cable','cake','calculate','call','calm','camera','campaign','camping','campus',
  'cancel','candidate','candy','capable','capacity','capital','capture','card','care','career',
  'careful','carefully','careless','carpet','carry','cartoon','case','cash','castle','catch',
  'category','ceiling','celebrate','celebration','celebrity','center','century','ceremony',
  'certain','certainly','chain','chairman','challenge','champion','chance','change','channel',
  'chapter','character','characteristic','charge','charity','chart','cheap','check','cheerful',
  'cheese','chef','chemical','chemistry','chest','chief','childhood','chip','chocolate','choice',
  'choose','church','cinema','circle','circumstance','citizen','civil','claim','classic',
  'classical','classroom','clean','clear','clearly','clever','click','client','climate','climb',
  'close','closely','cloth','clothes','club','coast','coat','code','coffee','coin','cold',
  'collapse','colleague','collect','collection','color','colored','column','combination','combine',
  'comedy','comfort','comfortable','command','comment','commercial','commitment','committee',
  'communicate','communication','community','compare','comparison','compete','competition',
  'competitive','competitor','complain','complaint','complete','completely','complex','complicated',
  'component','concentrate','concentration','concept','concern','concerned','conclude','conclusion',
  'condition','conduct','conference','confidence','confident','confirm','conflict','confuse',
  'confused','confusing','connect','connected','connection','conscious','consequence','conservative',
  'consider','consideration','consist','consistent','constant','constantly','construct','consume',
  'consumer','contact','contemporary','content','context','continent','contract','contrast',
  'contribute','contribution','control','convenient','conversation','convert','convince','cook',
  'cooker','cooking','copy','corner','corporate','correct','correctly','cost','costume','count',
  'counter','country','countryside','courage','course','cousin','cover','crack','crash','crazy',
  'create','creation','creative','creature','credit','crime','criminal','crisis','criterion',
  'critic','critical','criticism','criticize','crop','crowd','crowded','crucial','cruel','culture',
  'cupboard','cure','currency','current','currently','curtain','curve','customer','daily','damage',
  'dance','danger','dangerous','dark','data','daughter','debate','decade','decide','decision',
  'declare','decline','decorate','decoration','decrease','defeat','defend','defense','define',
  'definite','definitely','definition','degree','delay','deliberate','deliberately','delicious',
  'delight','deliver','delivery','demand','demonstrate','dentist','deny','department','departure',
  'depressed','depressing','depth','describe','description','desert','deserve','design','designer',
  'desire','desk','desperate','despite','destination','destroy','detail','detailed','detective',
  'determine','determined','develop','development','device','diagram','dialogue','diary',
  'dictionary','diet','difference','different','differently','difficult','difficulty','digital',
  'dinner','direction','directly','director','dirty','disadvantage','disagree','disappear',
  'disappointed','disappointing','disaster','discipline','discount','discovery','discuss',
  'discussion','disease','dishonest','dislike','dismiss','distribute','distribution','divide',
  'division','divorced','document','documentary','domestic','dominate','donate','double','doubt',
  'download','drama','dramatic','drawing','dream','drink','drive','driver','drug','drum','dust',
  'duty','earn','earthquake','easily','economy','education','educational','effective','effectively',
  'efficient','effort','elderly','election','electricity','electronic','element','elephant',
  'embarrassed','embarrassing','emerge','emergency','emotion','emotional','emphasis','emphasize',
  'employee','employer','employment','empty','enable','encounter','encourage','ending','enemy',
  'energy','engage','engaged','engineer','engineering','enhance','enjoy','enormous','ensure',
  'entertainment','enthusiasm','enthusiastic','entirely','entrance','environment','environmental',
  'equal','equally','equipment','error','escape','especially','essay','essential','establish',
  'estimate','ethical','evaluate','eventually','evidence','examination','examine','excellent',
  'exchange','excited','excitement','exciting','excuse','executive','exhibition','existence',
  'expand','expectation','expedition','expensive','experience','experienced','experiment','expert',
  'explanation','explode','exploration','explore','explosion','export','expose','expression',
  'extend','extent','external','extraordinary','extreme','extremely','facility','factor','factory',
  'failure','fairly','faith','familiar','famous','fancy','fantastic','farming','fascinating',
  'fashion','fashionable','fasten','fault','favorite','feather','feature','feedback','feeling',
  'fellow','female','festival','field','fighting','figure','film','finally','finance','financial',
  'finding','finger','fitness','fixed','flame','flexible','flood','flower','flying','focus','fold',
  'following','football','force','foreign','forest','forever','forget','forgive','formal','former',
  'fortunately','forward','freedom','freeze','frequency','frequently','friendly','friendship',
  'frightened','frightening','frozen','function','fundamental','furniture','furthermore','gallery',
  'garbage','gather','generate','generation','generous','geography','ghost','global','glove',
  'gradually','graduate','grandfather','grandmother','grandparent','grateful','greenhouse','greet',
  'ground','growth','guarantee','guilty','habit','handle','happiness','harmful','headache',
  'headline','healthy','hearing','heaven','heavily','helicopter','highlight','historic','historical',
  'hobby','holiday','homework','honest','honor','horrible','horror','household','housing','huge',
  'humorous','hurricane','identity','ignore','illegal','illness','illustrate','illustration',
  'imaginary','imagination','immediately','immigrant','impatient','importance','impossible',
  'impressed','impression','impressive','improvement','incident','income','increasingly','incredible',
  'incredibly','independent','indicate','indirect','individual','indoor','industrial','industry',
  'infection','influence','informal','ingredient','initially','initiative','injured','injury',
  'innocent','inquiry','insect','insight','insist','inspire','install','instance','instead',
  'institute','institution','instruction','instrument','insurance','intelligence','intelligent',
  'intention','interested','interesting','internal','international','interpret','interrupt',
  'interview','introduce','introduction','invention','investigation','investment','invitation',
  'involve','island','issue','jacket','journalism','journalist','journey','judgment','justify',
  'keyboard','kingdom','kitchen','knowledge','label','laboratory','landscape','language','largely',
  'laughter','lawyer','leadership','lecture','leisure','library','lifestyle','limited','listener',
  'literature','lively','logical','lonely','luxury','magazine','mainly','maintain','majority',
  'management','manner','marketing','marriage','massive','mathematics','maximum','meanwhile',
  'measurement','medical','medicine','member','memory','mental','mention','military','mineral',
  'minimum','minister','minority','miracle','mission','mistake','mixture','mobile','modern',
  'monitor','motorcycle','movement','multiply','museum','musical','musician','mysterious','mystery',
  'narrative','national','natural','naturally','necessarily','necessary','negative','neighbor',
  'neighborhood','nervous','network','nevertheless','nightmare','normally','notice','notion','novel',
  'nuclear','numerous','objective','obligation','observation','obtain','obvious','obviously',
  'occasionally','occur','offend','offensive','officer','official','opinion','opponent',
  'opportunity','oppose','opposite','opposition','option','organization','organize','originally',
  'otherwise','outcome','outdoor','outline','overall','package','painful','painting','paragraph',
  'parliament','participant','participate','particularly','partner','passenger','passion',
  'passport','patient','pattern','payment','peaceful','pension','percentage','perfect','perfectly',
  'performance','period','permanent','permission','personality','personally','perspective',
  'persuade','petrol','phenomenon','philosophy','photograph','photographer','photography',
  'physical','physics','platform','pleasant','pleasure','pointed','poison','poisonous','policy',
  'polite','political','politician','pollution','popularity','population','portrait','positive',
  'possession','possibility','powerful','practical','preparation','presence','presentation',
  'preserve','pressure','pretend','prevent','primary','priority','prisoner','privacy','private',
  'procedure','produce','producer','production','professional','professor','progress','promise',
  'promote','pronounce','properly','property','proposal','prospect','protection','protest','proud',
  'provide','psychologist','psychology','publication','punishment','pupil','purchase','purpose',
  'pursue','qualification','qualified','quality','quantity','quotation','railway','rapidly',
  'rarely','realistic','reality','reasonable','receipt','recently','reception','recognize',
  'recommend','recommendation','recording','recycle','reduce','reference','reflect','refuse',
  'regional','register','regret','regularly','regulation','relationship','relatively','relaxed',
  'relevant','reliable','religion','religious','remember','represent','representative','reputation',
  'requirement','research','researcher','reservation','resident','resolve','resource','respond',
  'responsibility','responsible','restaurant','retire','retired','revolution','reward','rhythm',
  'romantic','routine','rubber','rubbish','running','safety','sailing','salary','satellite',
  'satisfied','satisfy','saving','scale','scared','schedule','scientific','scientist','sculpture',
  'secondary','secretary','section','sector','secure','security','select','selection','senior',
  'sensible','sensitive','sequence','servant','service','session','setting','shadow','shallow',
  'shelter','signal','significant','silence','similar','similarity','sincere','situation','skiing',
  'slavery','slightly','smoke','society','software','solution','somebody','somewhere','specific',
  'specifically','speech','spelling','spending','spiritual','sponsor','stadium','standard',
  'statement','station','statistic','status','steady','storage','strategy','strength','strict',
  'structure','struggle','student','stupid','subject','substance','succeed','success','successful',
  'successfully','sudden','suddenly','suffer','suggest','suggestion','suitable','summarize',
  'summary','supermarket','supporter','suppose','surely','surface','surgery','surprised',
  'surprising','surrounding','survey','survive','suspect','sweater','sympathy','symptom','system',
  'tablet','talent','talented','teaching','technique','technology','teenager','temperature',
  'temporary','terrible','theater','therapy','therefore','thirsty','threaten','throughout',
  'ticket','timeline','title','together','tomorrow','tourism','tourist','tradition','traditional',
  'traffic','training','transfer','transform','transition','translation','transport','treatment',
  'tropical','trouble','tunnel','typical','typically','ultimate','ultimately','umbrella','unable',
  'uncomfortable','unconscious','underground','understanding','underwear','unemployed',
  'unemployment','unexpected','unfair','unfortunately','unhappy','uniform','unique','universe',
  'university','unknown','unlikely','unnecessary','unpleasant','unusual','vacation','valuable',
  'variety','various','vegetable','vehicle','version','victim','victory','viewer','village',
  'violence','virtual','visitor','visual','vital','volunteer','weakness','wealthy','wedding',
  'welfare','whatever','whenever','wherever','whereas','whisper','wildlife','willing','wonderful',
  'worldwide','worried','worship','writer','writing','written','yesterday','youth','zero','zone'
];

// Vietnamese meanings extracted from VI SRT in order
function extractViMeanings() {
  const viFile = path.join(__dirname, '3000 thẻ flashcard từ vựng tiếng Anh Oxford - Full - YouTube (Tiếng Việt).srt');
  const raw = fs.readFileSync(viFile, 'utf8');
  const isVi = l => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(l);
  const seen = new Set();
  const results = [];

  const lines = raw.split('\n').filter(l => {
    l = l.trim();
    return l && !/^\d+$/.test(l) && !l.includes('-->');
  });

  for (const line of lines) {
    const words = line.split(/\s+/).filter(w => w.length >= 2 && isVi(w));
    if (words.length >= 1 && words.length <= 6) {
      const key = words.slice(0, 3).join(' ');
      if (!seen.has(key)) { seen.add(key); results.push(words.join(' ')); }
    }
  }
  return results;
}

async function seed() {
  const viMeanings = extractViMeanings();
  console.log(`Extracted ${viMeanings.length} Vietnamese meanings`);

  const client = await pool.connect();
  let added = 0, skipped = 0;

  try {
    const cefrLevels = ['A1', 'A2', 'B1', 'B2'];
    for (let i = 0; i < OXFORD_WORDS.length; i++) {
      const word = OXFORD_WORDS[i];
      const meaningVi = viMeanings[i] || '';
      // Assign random level for UI to work immediately
      const level = cefrLevels[Math.floor(Math.random() * cefrLevels.length)];

      const ex = await client.query('SELECT id FROM vocabulary_words WHERE LOWER(word)=LOWER($1)', [word]);
      if (ex.rows.length > 0) {
        // Update VI meaning & Level if missing
        await client.query('UPDATE vocabulary_words SET meaning_vi=$1, cefr_level=$2 WHERE LOWER(word)=LOWER($3) AND (cefr_level=\'Oxford3000\' OR cefr_level IS NULL)', [meaningVi, level, word]);
        skipped++; continue;
      }

      await client.query(
        `INSERT INTO vocabulary_words (id, word, meaning_en, meaning_vi, word_type, cefr_level) VALUES ($1,$2,$3,$4,$5,$6)`,
        [randomUUID(), word, word, meaningVi, '', level]
      );
      added++;
    }

    const { rows } = await client.query('SELECT COUNT(*)::int as c FROM vocabulary_words');
    console.log(`✅ Added: ${added}, Skipped/Updated: ${skipped}, Total: ${rows[0].c}`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);
