import { useState } from "react";

// KGBA = 한국골프장경영협회 100대 (이미지 기준)
// GDK  = 골프다이제스트 코리아 2025-2026 50대 코스
// GMK  = 골프매거진 코리아 2025-2026 10대&5스타 (30위까지)
// AP   = GOLF.com 아시아퍼시픽 100대 코스 (2023-2024)
// W    = GOLF.com 세계 100대 코스 (2025-2026)

const courses = [
  { rank:1,  name:"클럽나인브릿지",             location:"제주",      region:"제주",    type:"세미퍼블릭", fee:"약 35~50만원", url:"www.ninebridges.co.kr",       gdk:2,  gmk:1,  ap:12,  world:"✅" },
  { rank:2,  name:"사우스케이프오너스클럽",       location:"경남 남해", region:"경상",    type:"세미퍼블릭", fee:"약 30~45만원", url:"www.southcape.co.kr",         gdk:9,  gmk:null, ap:14, world:null },
  { rank:3,  name:"잭니클라우스 골프클럽 코리아", location:"인천",      region:"인천/경기",type:"세미퍼블릭", fee:"약 25~40만원", url:"www.jacknicklausgolfclubkorea.com", gdk:1, gmk:3, ap:74, world:null },
  { rank:4,  name:"안양 컨트리클럽",             location:"경기 군포", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.benestgolf.com",          gdk:4,  gmk:4,  ap:97, world:null },
  { rank:5,  name:"휘슬링락 컨트리클럽",         location:"강원 춘천", region:"강원",    type:"세미퍼블릭", fee:"약 20~35만원", url:"www.whistlingrockcc.com",      gdk:15, gmk:null, ap:37, world:null },
  { rank:6,  name:"트리니티 클럽",               location:"경기 여주", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.trinityclub.co.kr",        gdk:8,  gmk:null, ap:null, world:null },
  { rank:7,  name:"제이드팰리스 골프클럽",       location:"강원 춘천", region:"강원",    type:"회원제",    fee:"회원 동반 필요", url:"www.jadepalacegc.com",         gdk:7,  gmk:null, ap:null, world:null },
  { rank:8,  name:"핀크스 골프클럽 (동·서코스)", location:"제주",      region:"제주",    type:"세미퍼블릭", fee:"약 25~40만원", url:"pinxgc.thepinx.co.kr",         gdk:12, gmk:null, ap:null, world:null },
  { rank:9,  name:"더헤븐 컨트리클럽",           location:"경기 안산", region:"인천/경기",type:"세미퍼블릭", fee:"약 25~38만원", url:"www.theheavenresort.com",      gdk:null,gmk:null, ap:null, world:null },
  { rank:10, name:"우정힐스 컨트리클럽",         location:"충남 천안", region:"충청",    type:"세미퍼블릭", fee:"약 20~30만원", url:"whcc.kolon.co.kr",             gdk:5,  gmk:null, ap:null, world:null },
  { rank:11, name:"웰링턴 컨트리클럽 (그리핀&피닉스)", location:"경기 이천", region:"인천/경기",type:"회원제", fee:"회원 동반 필요", url:"www.wellingtoncc.co.kr",    gdk:3,  gmk:null, ap:null, world:null },
  { rank:12, name:"파인비치 골프링크스",         location:"전남 해남", region:"전라",    type:"퍼블릭",    fee:"약 15~25만원", url:"www.pinebeachcc.co.kr",         gdk:13, gmk:null, ap:50, world:null },
  { rank:13, name:"블랙스톤 제주 (북·남코스)",   location:"제주",      region:"제주",    type:"세미퍼블릭", fee:"약 25~40만원", url:"www.blackstoneresort.com",     gdk:16, gmk:null, ap:null, world:null },
  { rank:14, name:"해슬리 나인브릿지",           location:"경기 여주", region:"인천/경기",type:"세미퍼블릭", fee:"약 25~38만원", url:"www.haesley.com",              gdk:6,  gmk:2,  ap:88, world:null },
  { rank:15, name:"아난티코드 (느티나무&자작나무)", location:"경기 가평", region:"인천/경기",type:"세미퍼블릭", fee:"약 20~35만원", url:"www.ananti.kr",             gdk:null,gmk:null, ap:null, world:null },
  { rank:16, name:"라비에벨 골프&리조트 (올드코스)", location:"강원 춘천", region:"강원",  type:"퍼블릭",  fee:"약 15~25만원", url:"www.lavieestbellegolfnresort.com", gdk:27, gmk:null, ap:null, world:null },
  { rank:17, name:"사우스스프링스 컨트리클럽",   location:"경기 이천", region:"인천/경기",type:"세미퍼블릭", fee:"약 18~30만원", url:"www.sscc.co.kr",               gdk:11, gmk:null, ap:null, world:null },
  { rank:18, name:"이스트밸리 컨트리클럽 (남·동코스)", location:"경기 광주", region:"인천/경기",type:"세미퍼블릭", fee:"약 18~28만원", url:"www.eastvalley.co.kr",  gdk:19, gmk:null, ap:null, world:null },
  { rank:19, name:"페럼클럽",                   location:"경기 여주", region:"인천/경기",type:"세미퍼블릭", fee:"약 20~32만원", url:"www.ferrumclub.com",            gdk:26, gmk:null, ap:null, world:null },
  { rank:20, name:"세이지우드 홍천 (드림&비전)", location:"강원 홍천", region:"강원",    type:"퍼블릭",    fee:"약 15~25만원", url:"www.sagewood.co.kr",            gdk:14, gmk:null, ap:null, world:null },
  { rank:21, name:"클럽72 (오션코스)",           location:"인천",      region:"인천/경기",type:"퍼블릭",    fee:"약 18~28만원", url:"www.onetheclub.com",            gdk:33, gmk:null, ap:null, world:null },
  { rank:22, name:"소노펠리체 컨트리클럽 (비발디파크 EAST)", location:"강원 홍천", region:"강원", type:"퍼블릭", fee:"약 15~22만원", url:"www.sonofelicecc.com", gdk:47, gmk:null, ap:null, world:null },
  { rank:23, name:"가평베네스트 골프클럽 (Maple&Pine)", location:"경기 가평", region:"인천/경기",type:"회원제", fee:"회원 동반 필요", url:"www.benestgolf.com",      gdk:42, gmk:null, ap:null, world:null },
  { rank:24, name:"설해원골프 (살몬&씨뷰)",      location:"강원 양양", region:"강원",    type:"퍼블릭",    fee:"약 18~28만원", url:"www.seolhaeone.com",            gdk:23, gmk:null, ap:null, world:null },
  { rank:25, name:"블루원 상주 골프리조트",      location:"경북 상주", region:"경상",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.blueone.com",               gdk:null,gmk:null, ap:null, world:null },
  { rank:26, name:"블랙스톤 이천 골프클럽 (북·서코스)", location:"경기 이천", region:"인천/경기",type:"세미퍼블릭", fee:"약 18~28만원", url:"www.blackstoneresort.com", gdk:43, gmk:null, ap:null, world:null },
  { rank:27, name:"롯데스카이힐 제주 (오션&스카이)", location:"제주",    region:"제주",    type:"퍼블릭",    fee:"약 18~30만원", url:"www.lotteskyhill.com",          gdk:21, gmk:null, ap:null, world:null },
  { rank:28, name:"동래베네스트 골프클럽",       location:"부산",      region:"경상",    type:"회원제",    fee:"회원 동반 필요", url:"www.benestgolf.com",           gdk:null,gmk:null, ap:null, world:null },
  { rank:29, name:"한성컨트리클럽 (블루&오렌지)", location:"경기 용인", region:"인천/경기",type:"회원제",  fee:"회원 동반 필요", url:"www.hansung-cc.co.kr",          gdk:null,gmk:null, ap:null, world:null },
  { rank:30, name:"렉스필드 컨트리클럽 (레이크·마운틴)", location:"경기 여주", region:"인천/경기",type:"세미퍼블릭", fee:"약 18~28만원", url:"www.rexfield.com",      gdk:35, gmk:null, ap:null, world:null },
  { rank:31, name:"성문안",                     location:"강원 원주", region:"강원",    type:"퍼블릭",    fee:"약 12~22만원", url:"www.seongmunan.com",            gdk:null,gmk:null, ap:null, world:null },
  { rank:32, name:"카스카디아 (스톤&워터)",      location:"강원 홍천", region:"강원",    type:"세미퍼블릭", fee:"약 25~40만원", url:"www.cascadia.kr",               gdk:null,gmk:"신규", ap:null, world:null },
  { rank:33, name:"서원밸리 컨트리클럽",         location:"경기 파주", region:"인천/경기",type:"세미퍼블릭", fee:"약 15~25만원", url:"www.seowongolf.co.kr",         gdk:17, gmk:null, ap:null, world:null },
  { rank:34, name:"베어크리크 춘천",             location:"강원 춘천", region:"강원",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.bearcreek.co.kr",           gdk:25, gmk:null, ap:null, world:null },
  { rank:35, name:"베어즈베스트청라 골프클럽 (아시아&미국)", location:"인천", region:"인천/경기",type:"퍼블릭", fee:"약 18~28만원", url:"www.bearsbestcheongnagc.com", gdk:32, gmk:null, ap:null, world:null },
  { rank:36, name:"드비치 골프클럽",             location:"경남 거제", region:"경상",    type:"퍼블릭",    fee:"약 15~25만원", url:"www.debeach.co.kr",             gdk:null,gmk:null, ap:null, world:null },
  { rank:37, name:"테디밸리 골프&리조트",        location:"제주",      region:"제주",    type:"퍼블릭",    fee:"약 15~25만원", url:"www.teddyvalley.com",           gdk:null,gmk:null, ap:null, world:null },
  { rank:38, name:"몽베르 컨트리클럽 (가을&겨울)", location:"경기 포천", region:"인천/경기",type:"세미퍼블릭", fee:"약 15~25만원", url:"www.montvertcc.com",          gdk:null,gmk:null, ap:null, world:null },
  { rank:39, name:"남촌골프클럽",               location:"경기 광주", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.namchoncc.co.kr",           gdk:10, gmk:null, ap:null, world:null },
  { rank:40, name:"세이지우드 여수경도 (금오도&돌산도)", location:"전남 여수", region:"전라", type:"퍼블릭", fee:"약 15~25만원", url:"www.sagewood.co.kr",           gdk:50, gmk:null, ap:null, world:null },
  { rank:41, name:"남서울 컨트리클럽",           location:"경기 성남", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.nscc.co.kr",               gdk:31, gmk:null, ap:null, world:null },
  { rank:42, name:"더스타휴 골프&리조트",        location:"경기 양평", region:"인천/경기",type:"세미퍼블릭", fee:"약 15~25만원", url:"www.thestarhue.com",           gdk:null,gmk:null, ap:null, world:null },
  { rank:43, name:"킹즈락 컨트리클럽 (동·남코스)", location:"충북 제천", region:"충청",  type:"퍼블릭",    fee:"약 12~20만원", url:"www.kingsrockcc.com",           gdk:null,gmk:null, ap:null, world:null },
  { rank:44, name:"마에스트로 컨트리클럽",       location:"경기 안성", region:"인천/경기",type:"퍼블릭",    fee:"약 15~22만원", url:"www.maestrocc.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:45, name:"휘닉스 평창 컨트리클럽",      location:"강원 평창", region:"강원",    type:"퍼블릭",    fee:"약 15~25만원", url:"phoenixhnr.co.kr",              gdk:null,gmk:null, ap:null, world:null },
  { rank:46, name:"송추 컨트리클럽",             location:"경기 양주", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.songchoo.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:47, name:"골든베이 골프&리조트 (오션&밸리)", location:"충남 태안", region:"충청", type:"퍼블릭",  fee:"약 12~22만원", url:"www.goldenbay.com",              gdk:49, gmk:null, ap:null, world:null },
  { rank:48, name:"크리스탈밸리 컨트리클럽",    location:"경기 가평", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.crystalvalley.co.kr",       gdk:null,gmk:null, ap:null, world:null },
  { rank:49, name:"일동레이크 골프클럽 (마운틴&힐)", location:"경기 포천", region:"인천/경기",type:"세미퍼블릭", fee:"약 13~22만원", url:"www.ildonglakes.co.kr",    gdk:null,gmk:null, ap:null, world:null },
  { rank:50, name:"웰리힐리 컨트리클럽",         location:"강원 횡성", region:"강원",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.wellihillpark.com",         gdk:null,gmk:null, ap:null, world:null },
  { rank:51, name:"화산 컨트리클럽",             location:"경기 용인", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.hwasancc.com",             gdk:18, gmk:null, ap:null, world:null },
  { rank:52, name:"베이사이드 골프클럽 (레이크&캐년)", location:"부산", region:"경상",   type:"퍼블릭",    fee:"약 12~22만원", url:"www.bayside.co.kr",              gdk:null,gmk:null, ap:null, world:null },
  { rank:53, name:"한양 컨트리클럽 (뉴코스)",    location:"경기 고양", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.hanyangcc.com",            gdk:null,gmk:null, ap:null, world:null },
  { rank:54, name:"골프존카운티 감포",            location:"경북 경주", region:"경상",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.golfzoncounty.com",         gdk:null,gmk:null, ap:null, world:null },
  { rank:55, name:"샌드파인 골프클럽",           location:"강원 강릉", region:"강원",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.lakaisandpine.co.kr",       gdk:48, gmk:null, ap:null, world:null },
  { rank:56, name:"오크밸리 컨트리클럽 (오크&메이플)", location:"강원 원주", region:"강원", type:"퍼블릭", fee:"약 13~22만원", url:"oakvalley.co.kr",               gdk:40, gmk:null, ap:null, world:null },
  { rank:57, name:"천룡 컨트리클럽 (청룡&해룡)", location:"충북 진천", region:"충청",    type:"세미퍼블릭", fee:"약 10~18만원", url:"www.crcc.co.kr",               gdk:29, gmk:null, ap:null, world:null },
  { rank:58, name:"힐드로씨 컨트리클럽",         location:"강원 춘천", region:"강원",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.hilldeloci.co.kr",          gdk:null,gmk:null, ap:null, world:null },
  { rank:59, name:"가야 컨트리클럽 (신이&낙동)", location:"경남 김해", region:"경상",    type:"세미퍼블릭", fee:"약 10~18만원", url:"www.gayacc.com",               gdk:null,gmk:null, ap:null, world:null },
  { rank:60, name:"레인보우힐스 컨트리클럽 (남·동코스)", location:"충북 음성", region:"충청", type:"퍼블릭", fee:"약 10~18만원", url:"www.rainbowhills.co.kr",     gdk:28, gmk:null, ap:null, world:null },
  { rank:61, name:"해내다컨트리클럽",            location:"경북 경산", region:"경상",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.haenaedac.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:62, name:"블루헤론 골프클럽",           location:"경기 여주", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.blueheron.co.kr",           gdk:22, gmk:null, ap:null, world:null },
  { rank:63, name:"아난티 클럽 제주 (한라)",     location:"제주",      region:"제주",    type:"세미퍼블릭", fee:"약 15~28만원", url:"ananti.kr/jeju",               gdk:null,gmk:null, ap:null, world:null },
  { rank:64, name:"갱리산 강촌 컨트리클럽 (밸리&레이크)", location:"강원 춘천", region:"강원", type:"퍼블릭", fee:"약 10~18만원", url:"www.elysian.co.kr",         gdk:null,gmk:null, ap:null, world:null },
  { rank:65, name:"곤지암 컨트리클럽",           location:"경기 광주", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.konjamgolfclub.co.kr",     gdk:36, gmk:null, ap:null, world:null },
  { rank:66, name:"파인리지 리조트 (파인&리지)", location:"강원 고성", region:"강원",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.pineridge.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:67, name:"미다스밸리 청평골프클럽",     location:"경기 가평", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.midasgolf.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:68, name:"버치힐 골프클럽",             location:"강원 평창", region:"강원",    type:"회원제",    fee:"회원 동반 필요", url:"www.yongpyong.co.kr",          gdk:30, gmk:null, ap:null, world:null },
  { rank:69, name:"베어크리크 포천 골프클럽",    location:"경기 포천", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.bearcreek.co.kr",           gdk:20, gmk:null, ap:null, world:null },
  { rank:70, name:"포어리즌 (스카이&베이)",      location:"경기 수원", region:"인천/경기",type:"퍼블릭",    fee:"약 12~20만원", url:"www.fourrizon.com",             gdk:37, gmk:null, ap:null, world:null },
  { rank:71, name:"에이원 컨트리클럽",           location:"경남 양산", region:"경상",    type:"세미퍼블릭", fee:"약 10~18만원", url:"www.a-onecc.co.kr",            gdk:null,gmk:null, ap:null, world:null },
  { rank:72, name:"라데나 골프클럽 (가든&네이처)", location:"강원 춘천", region:"강원",  type:"퍼블릭",    fee:"약 12~20만원", url:"www.ladena.co.kr",              gdk:39, gmk:null, ap:null, world:null },
  { rank:73, name:"골드레이크 컨트리클럽",       location:"전남 나주", region:"전라",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.goldlake.co.kr",            gdk:null,gmk:null, ap:null, world:null },
  { rank:74, name:"대구 컨트리클럽 (동·서코스)", location:"경북 경산", region:"경상",    type:"회원제",    fee:"회원 동반 필요", url:"www.dsegucc.co.kr",            gdk:null,gmk:null, ap:null, world:null },
  { rank:75, name:"골프존카운티 무주",            location:"전북 무주", region:"전라",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.golfzoncounty.com",         gdk:null,gmk:null, ap:null, world:null },
  { rank:76, name:"동푸산 컨트리클럽 (힐&리조트)", location:"경남 양산", region:"경상", type:"퍼블릭",    fee:"약 10~18만원", url:"www.dongpusancc.co.kr",          gdk:null,gmk:null, ap:null, world:null },
  { rank:77, name:"아시아나 컨트리클럽",         location:"경기 용인", region:"인천/경기",type:"회원제",    fee:"회원 동반 필요", url:"www.asianacc.com",             gdk:24, gmk:null, ap:null, world:null },
  { rank:78, name:"덕유산 컨트리클럽",           location:"전북 무주", region:"전라",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.mdysresort.com",            gdk:null,gmk:null, ap:null, world:null },
  { rank:79, name:"뉴서울 컨트리클럽 (Culture)", location:"경기 광주", region:"인천/경기",type:"세미퍼블릭", fee:"약 12~20만원", url:"www.newseoulgolf.co.kr",      gdk:null,gmk:null, ap:null, world:null },
  { rank:80, name:"정산 컨트리클럽 (선&문)",     location:"경남 김해", region:"경상",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.jeongsancc.com",            gdk:null,gmk:null, ap:null, world:null },
  { rank:81, name:"전주 상그릴라 컨트리클럽",    location:"전북 임실", region:"전라",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.jeonjucc.co.kr",            gdk:null,gmk:null, ap:null, world:null },
  { rank:82, name:"캐슬렉스 골프클럽",           location:"제주",      region:"제주",    type:"퍼블릭",    fee:"약 12~20만원", url:"www.castlexji.com",             gdk:null,gmk:null, ap:null, world:null },
  { rank:83, name:"스톤비치컨트리클럽",          location:"충남 태안", region:"충청",    type:"퍼블릭",    fee:"약 10~18만원", url:"stonebeach-cc.com",             gdk:null,gmk:null, ap:null, world:null },
  { rank:84, name:"센터리움 컨트리클럽 (잉글랜드&스코틀랜드)", location:"충북 충주", region:"충청", type:"퍼블릭", fee:"약 10~18만원", url:"www.centeriumcc.com",   gdk:null,gmk:null, ap:null, world:null },
  { rank:85, name:"서라벌 골프클럽 (힐&리조트)", location:"경북 경주", region:"경상",   type:"퍼블릭",    fee:"약 10~18만원", url:"www.seorabol.co.kr",             gdk:null,gmk:null, ap:null, world:null },
  { rank:86, name:"알펜시아 컨트리클럽",         location:"강원 평창", region:"강원",    type:"퍼블릭",    fee:"약 12~22만원", url:"www.alpensia.com",              gdk:44, gmk:null, ap:null, world:null },
  { rank:87, name:"유성컨트리클럽",              location:"대전",      region:"충청",    type:"회원제",    fee:"회원 동반 필요", url:"www.yscc.co.kr",               gdk:null,gmk:null, ap:null, world:null },
  { rank:88, name:"안성베네스트 골프클럽 (서&북코스)", location:"경기 안성", region:"인천/경기", type:"퍼블릭", fee:"약 12~20만원", url:"www.benestgolf.com",      gdk:null,gmk:null, ap:null, world:null },
  { rank:89, name:"보라 컨트리클럽 (Henry&William)", location:"울산",  region:"경상",    type:"세미퍼블릭", fee:"약 10~18만원", url:"boraacc.com",                  gdk:null,gmk:null, ap:null, world:null },
  { rank:90, name:"양평TPC 골프클럽 (솔라&루나)", location:"경기 양평", region:"인천/경기",type:"퍼블릭",  fee:"약 12~20만원", url:"www.tpcgolf.co.kr",             gdk:null,gmk:null, ap:null, world:null },
  { rank:91, name:"천안삼복컨트리클럽",          location:"충남 천안", region:"충청",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.sangnokresor.co.kr",        gdk:null,gmk:null, ap:null, world:null },
  { rank:92, name:"미다스이천 인 골프클럽",       location:"경기 이천", region:"인천/경기",type:"퍼블릭",  fee:"약 12~20만원", url:"www.midasgolf.co.kr",           gdk:null,gmk:null, ap:null, world:null },
  { rank:93, name:"아도니스 컨트리클럽 (중코스&동코스)", location:"경기 포천", region:"인천/경기", type:"퍼블릭", fee:"약 10~18만원", url:"www.adoniscc.co.kr",   gdk:null,gmk:null, ap:null, world:null },
  { rank:94, name:"내장산 골프&리조트",          location:"전북 정읍", region:"전라",    type:"퍼블릭",    fee:"약 10~18만원", url:"www.naejangsan.com",            gdk:null,gmk:null, ap:null, world:null },
  { rank:95, name:"아난티 남해 골프클럽",        location:"경남 남해", region:"경상",    type:"세미퍼블릭", fee:"약 15~25만원", url:"www.ananti.kr/namhae",         gdk:null,gmk:null, ap:null, world:null },
  { rank:96, name:"군산 골프&리조트 (토너먼트 인&아웃)", location:"전북 군산", region:"전라", type:"퍼블릭", fee:"약 10~18만원", url:"www.gunsancc.net",           gdk:null,gmk:null, ap:null, world:null },
  { rank:97, name:"센추리21 컨트리클럽 (레이크&파인)", location:"강원 원주", region:"강원", type:"퍼블릭", fee:"약 10~18만원", url:"www.century21cc.co.kr",        gdk:null,gmk:null, ap:null, world:null },
  { rank:98, name:"고창 컨트리클럽",             location:"전북 고창", region:"전라",    type:"퍼블릭",    fee:"약 10~16만원", url:"www.gochangcc.com",             gdk:null,gmk:null, ap:null, world:null },
  { rank:99, name:"백제 컨트리클럽 (웅인&나비)", location:"충남 부여", region:"충청",    type:"퍼블릭",    fee:"약 10~16만원", url:"www.baekjec.com",               gdk:null,gmk:null, ap:null, world:null },
  { rank:100,name:"장수골프리조트",              location:"전북 장수", region:"전라",    type:"퍼블릭",    fee:"약 8~15만원",  url:"www.jangsugolf.com",            gdk:null,gmk:null, ap:null, world:null },
];


const typeColor = {
  "회원제":    { bg:"#2d1b4e", text:"#e8b4f8", border:"#7c3aed" },
  "세미퍼블릭":{ bg:"#0c2340", text:"#7dd3fc", border:"#0369a1" },
  "퍼블릭":   { bg:"#052e16", text:"#86efac", border:"#16a34a" },
};
const regionColor = {
  "제주":"#f97316","경상":"#ec4899","인천/경기":"#3b82f6",
  "강원":"#10b981","충청":"#f59e0b","전라":"#8b5cf6",
};

const RankRow = ({ label, val, color }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
    <span style={{ fontSize:12, color:"#94a3b8" }}>{label}</span>
    <span style={{ fontSize:13, fontWeight:700, color: val ? color : "#374151" }}>
      {val ? `${val}위` : "—"}
    </span>
  </div>
);

function CourseCard({ c }) {
  const [open, setOpen] = useState(false);
  const tc = typeColor[c.type];
  const rc = regionColor[c.region];

  // count how many external rankings exist
  const hasRankings = c.gdk || c.gmk || c.ap || c.world;

  return (
    <div style={{
      background: open ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 12,
      overflow: "hidden",
      transition: "all 0.2s",
    }}>
      {/* Collapsed row — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display:"flex", alignItems:"center", padding:"10px 14px", gap:10, cursor:"pointer",
          width:"100%", background:"none", border:"none", textAlign:"left",
          touchAction:"manipulation", WebkitTapHighlightColor:"transparent",
          userSelect:"none", WebkitUserSelect:"none" }}
      >
        {/* Rank badge */}
        <div style={{
          minWidth:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
          borderRadius:8, flexShrink:0,
          background: c.rank<=10 ? "linear-gradient(135deg,#d97706,#92400e)"
                    : c.rank<=30 ? "linear-gradient(135deg,#4b5563,#1f2937)"
                    : "rgba(255,255,255,0.06)",
          fontWeight:700, fontSize: c.rank<=9 ? 15 : 13,
          color: c.rank<=10 ? "#fde68a" : "#6b7280",
        }}>{c.rank}</div>

        {/* Name + location */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:600, fontSize:14, color:"#f1f5f9", lineHeight:1.3,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
            {c.name}
            {c.world && <span style={{ marginLeft:6, fontSize:10, color:"#a78bfa" }}>🌍</span>}
          </div>
          <div style={{ fontSize:11, color: rc||"#64748b", marginTop:2 }}>
            📍 {c.location}
          </div>
        </div>

        {/* Type badge */}
        <div style={{
          padding:"3px 9px", borderRadius:20, flexShrink:0,
          background:tc.bg, border:`1px solid ${tc.border}`,
          color:tc.text, fontSize:10, fontWeight:600,
        }}>{c.type}</div>

        {/* Expand chevron */}
        <div style={{ color:"#475569", fontSize:12, flexShrink:0, transition:"transform 0.2s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</div>
      </button>

      {/* Expanded panel */}
      {open && (
        <div style={{ padding:"0 14px 14px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>

          {/* Grid: fee + url */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12, marginBottom:12 }}>
            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"10px 12px" }}>
              <div style={{ fontSize:10, color:"#64748b", marginBottom:3 }}>💰 그린피</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#fcd34d" }}>{c.fee}</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"10px 12px" }}>
              <div style={{ fontSize:10, color:"#64748b", marginBottom:3 }}>🔗 홈페이지</div>
              <a href={`https://${c.url}`} target="_blank" rel="noopener noreferrer"
                onClick={e=>e.stopPropagation()}
                style={{ fontSize:11, color:"#38bdf8", textDecoration:"none", wordBreak:"break-all" }}>
                {c.url}
              </a>
            </div>
          </div>

          {/* Rankings comparison */}
          <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:8, padding:"10px 12px" }}>
            <div style={{ fontSize:11, color:"#64748b", marginBottom:8, letterSpacing:"0.05em" }}>📊 랭킹 비교</div>
            <RankRow label="🏆 KGBA (한국골프장경영협회)"  val={c.rank} color="#fcd34d"/>
            <RankRow label="🔴 GDK (골프다이제스트 코리아 2025-26)"  val={c.gdk}  color="#f87171"/>
            <RankRow label="🟢 GMK (골프매거진 코리아 2025-26)"  val={c.gmk}  color="#34d399"/>
            <RankRow label="🔵 아시아태평양 (GOLF.com 2023-24)"  val={c.ap}   color="#60a5fa"/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:5 }}>
              <span style={{ fontSize:12, color:"#94a3b8" }}>🌍 세계 100대 (GOLF Magazine 2025-26)</span>
              <span style={{ fontSize:13, fontWeight:700, color: c.world ? "#a78bfa" : "#374151" }}>
                {c.world ? "✅ 선정" : "—"}
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function KoreaGolfTop100() {
  const [filter, setFilter]     = useState("전체");
  const [typeFilter, setType]   = useState("전체");
  const [search, setSearch]     = useState("");

  const regions = ["전체","인천/경기","강원","제주","경상","충청","전라"];
  const types   = ["전체","회원제","세미퍼블릭","퍼블릭"];

  const filtered = courses.filter(c => {
    const rm = filter === "전체" || c.region === filter;
    const tm = typeFilter === "전체" || c.type === typeFilter;
    const sm = search === "" || c.name.includes(search) || c.location.includes(search);
    return rm && tm && sm;
  });

  const isDefault = filter==="전체" && typeFilter==="전체" && search==="";

  // Group into chunks of 10
  const source = isDefault ? courses : filtered;
  const groups = [];
  for (let i=0; i<source.length; i+=10) groups.push(source.slice(i, i+10));

  return (
    <div style={{ fontFamily:"'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      background:"linear-gradient(135deg,#0a0a0f,#0d1117,#0a0f0a)",
      minHeight:"100vh", color:"#e2e8f0" }}>

      {/* Header */}
      <div style={{ background:"linear-gradient(180deg,#000,transparent)", padding:"32px 20px 16px",
        textAlign:"center", borderBottom:"1px solid rgba(255,255,255,0.06)", position:"relative" }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"radial-gradient(ellipse at 50% 0%,rgba(16,185,129,0.12) 0%,transparent 60%)",
          pointerEvents:"none" }}/>
        <div style={{ fontSize:10, letterSpacing:"0.3em", color:"#6ee7b7", fontFamily:"monospace", marginBottom:6 }}>
          KGBA · 골프다이제스트 · 골프매거진 · GOLF.com 비교
        </div>
        <h1 style={{ fontSize:"clamp(18px,5vw,30px)", fontWeight:700, margin:0, color:"#f1f5f9" }}>
          🏌️ 한국 100대 골프장
        </h1>
        <p style={{ color:"#64748b", fontSize:12, marginTop:6, marginBottom:0 }}>
          카드를 터치하면 그린피 · 홈페이지 · 랭킹 비교를 볼 수 있어요
        </p>
      </div>

      {/* Filters */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"14px 16px 0" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="골프장명 또는 지역 검색..."
          style={{ width:"100%", boxSizing:"border-box",
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:8, padding:"9px 14px", color:"#e2e8f0", fontSize:13,
            outline:"none", marginBottom:10 }}/>

        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:6 }}>
          <span style={{ fontSize:11, color:"#64748b", alignSelf:"center", marginRight:2 }}>지역</span>
          {regions.map(r=>(
            <button key={r} onClick={()=>setFilter(r)} style={{
              padding:"3px 10px", borderRadius:20, fontSize:11,
              border: filter===r ? `1px solid ${regionColor[r]||"#10b981"}` : "1px solid rgba(255,255,255,0.1)",
              background: filter===r ? `${regionColor[r]||"#10b981"}22` : "transparent",
              color: filter===r ? (regionColor[r]||"#10b981") : "#94a3b8", cursor:"pointer",
            }}>{r}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
          <span style={{ fontSize:11, color:"#64748b", alignSelf:"center", marginRight:2 }}>구분</span>
          {types.map(t=>(
            <button key={t} onClick={()=>setType(t)} style={{
              padding:"3px 10px", borderRadius:20, fontSize:11,
              border: typeFilter===t ? `1px solid ${typeColor[t]?.border||"#10b981"}` : "1px solid rgba(255,255,255,0.1)",
              background: typeFilter===t ? typeColor[t]?.bg : "transparent",
              color: typeFilter===t ? typeColor[t]?.text : "#94a3b8", cursor:"pointer",
            }}>{t}</button>
          ))}
        </div>

        <div style={{ fontSize:11, color:"#475569", textAlign:"right", marginBottom:10 }}>
          총 {filtered.length}개 골프장
        </div>
      </div>

      {/* Course List */}
      <div style={{ maxWidth:700, margin:"0 auto", padding:"0 16px 40px" }}>
        {groups.map((group, gi) => {
          const first = group[0].rank;
          const last  = group[group.length-1].rank;
          return (
            <div key={gi} style={{ marginBottom:28 }}>
              {/* Group divider */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{
                  background:"linear-gradient(135deg,#10b981,#065f46)",
                  borderRadius:6, padding:"2px 12px",
                  fontSize:11, fontWeight:700, color:"#fff",
                }}>{first}위 ~ {last}위</div>
                <div style={{ height:1, flex:1, background:"linear-gradient(90deg,rgba(16,185,129,0.3),transparent)" }}/>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {group.map(c => <CourseCard key={c.rank} c={c} />)}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#475569" }}>
            검색 결과가 없습니다
          </div>
        )}

        <div style={{ textAlign:"center", marginTop:8, padding:"14px",
          borderRadius:10, background:"rgba(255,255,255,0.02)",
          border:"1px solid rgba(255,255,255,0.05)",
          fontSize:10, color:"#475569", lineHeight:1.9 }}>
          KGBA: 한국골프장경영협회 &nbsp;|&nbsp; GDK: 골프다이제스트코리아 2025-2026<br/>
          GMK: 골프매거진코리아 2025-2026 &nbsp;|&nbsp; 아태: GOLF.com 아시아태평양 2023-2024<br/>
          ※ 그린피는 시즌·요일에 따라 변동 — 반드시 공식 사이트에서 확인하세요
        </div>
      </div>
    </div>
  );
}
