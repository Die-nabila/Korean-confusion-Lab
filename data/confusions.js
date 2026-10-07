// Add groups here. i(k, romanization, meaning, jamo "a+b+c" (optional), example, translation, emoji)
const i=(k,r,m,j,e,t,em)=>({k,r,m,j,e,t,em:em||''});
window.CONF=[
{id:'dal',type:'sound',lvl:'beginner',tags:['minimal pair','moon','daughter','mask'],note:'ㄷ / ㄸ / ㅌ differ in tension and breath (plain, tense, aspirated). 덜 changes the vowel instead.',items:[
i('달','dal','moon','ㄷ+ㅏ+ㄹ','달이 밝아요.','The moon is bright.','🌙'),
i('딸','ttal','daughter','ㄸ+ㅏ+ㄹ','딸이 집에 있어요.','My daughter is at home.','👧'),
i('탈','tal','mask','ㅌ+ㅏ+ㄹ','탈을 썼어요.','I wore a mask.','🎭'),
i('덜','deol','less','ㄷ+ㅓ+ㄹ','조금 덜 먹어요.','I eat a little less.','➖')]},
{id:'bul',type:'sound',lvl:'beginner',tags:['minimal pair','fire','grass','horn'],note:'Plain ㅂ, aspirated ㅍ (puff of air) and tense ㅃ (no air, tight throat).',items:[
i('불','bul','fire / light','ㅂ+ㅜ+ㄹ','불이 꺼졌어요.','The light went out.','🔥'),
i('풀','pul','grass','ㅍ+ㅜ+ㄹ','풀밭에 앉았어요.','I sat on the grass.','🌿'),
i('뿔','ppul','horn / antler','ㅃ+ㅜ+ㄹ','사슴은 뿔이 있어요.','Deer have antlers.','🦌')]},
{id:'bal',type:'sound',lvl:'beginner',tags:['foot','arm','eight'],note:'Only the first consonant changes: plain ㅂ vs aspirated ㅍ.',items:[
i('발','bal','foot','ㅂ+ㅏ+ㄹ','발이 아파요.','My foot hurts.','🦶'),
i('팔','pal','arm (also "eight", Sino-Korean)','ㅍ+ㅏ+ㄹ','팔이 아파요.','My arm hurts.','💪')]},
{id:'beol',type:'listen',lvl:'intermediate',tags:['bee','star','punishment'],note:'ㅓ is a relaxed "uh"; ㅕ adds a quick "y" glide in front of it.',items:[
i('벌','beol','bee / punishment','ㅂ+ㅓ+ㄹ','벌이 날아요.','A bee is flying.','🐝'),
i('별','byeol','star','ㅂ+ㅕ+ㄹ','별이 많아요.','There are many stars.','⭐')]},
{id:'nun',type:'sound',lvl:'beginner',tags:['eye','snow','rice paddy'],note:'눈 has two meanings (eye, snow); 논 changes the vowel ㅜ → ㅗ.',items:[
i('눈','nun','eye / snow','ㄴ+ㅜ+ㄴ','눈이 아파요.','My eyes hurt.','👁'),
i('논','non','rice paddy','ㄴ+ㅗ+ㄴ','논에서 일해요.','I work in the rice paddy.','🌾')]},
{id:'nae',type:'listen',lvl:'intermediate',tags:['my','yes','your','ㅐ','ㅔ'],note:'ㅐ and ㅔ sound almost the same in modern speech, so context decides.',items:[
i('내','nae','my / I (before 가)','ㄴ+ㅐ','내 가방이에요.','It is my bag.'),
i('네','ne','yes / your','ㄴ+ㅔ','네, 좋아요.','Yes, that is good.')]},
{id:'bae',type:'multi',lvl:'intermediate',tags:['pear','stomach','boat','cut','remove'],note:'배 has three common meanings. The verbs below are different words, not minimal pairs, but learners often mix them up.',items:[
i('배','bae','pear','','배가 달아요.','The pear is sweet.','🍐'),
i('배','bae','stomach / belly','','배가 고파요.','I am hungry.','🫃'),
i('배','bae','boat / ship','','배를 탔어요.','I got on a boat.','⛵'),
i('배다','bae-da','to soak in / to be ingrained','','냄새가 옷에 뱄어요.','The smell soaked into my clothes.'),
i('베다','be-da','to cut','','칼에 손을 베었어요.','I cut my hand with a knife.','✂️'),
i('빼다','ppae-da','to remove / to leave out','','소금을 빼 주세요.','Please leave out the salt.')]},
{id:'doe',type:'grammar',lvl:'intermediate',tags:['되다','돼','become','okay'],note:'Trick: 돼 = 되어. Try 하 / 해: if 하 fits use 되, if 해 fits use 돼.',items:[
i('되다','doe-da','to become','','의사가 되고 싶어요.','I want to become a doctor.'),
i('돼','dwae','is OK / works (되어)','','지금 가도 돼요?','May I go now?')]},
{id:'an',type:'grammar',lvl:'beginner',tags:['not','negation','안','않'],note:'안 goes before the verb. 않 appears in -지 않다.',items:[
i('안','an','not (before a verb)','','안 가요.','I am not going.'),
i('않','an(h)','not (in -지 않다)','','가지 않아요.','I do not go.')]},
{id:'garu',type:'meaning',lvl:'intermediate',tags:['teach','point'],note:'가르치다 teaches knowledge; 가리키다 points toward something.',items:[
i('가르치다','ga-reu-chi-da','to teach','','영어를 가르쳐요.','I teach English.'),
i('가리키다','ga-ri-ki-da','to point at','','손가락으로 가리켜요.','I point with my finger.')]}
];
