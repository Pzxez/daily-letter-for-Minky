document.addEventListener("DOMContentLoaded", () => {

// ===== CONFIG =====
const startDate = new Date("2025-10-07T00:00:00");
const meetDate = new Date("2025-10-14T00:00:00");
const messages = [
  "ฮาโหลอ้วนนน วันนี้อยากให้อ้วนเริ่มวันด้วยรอยยิ้มเล็ก ๆ จำไว้ว่าความพยายามของอ้วนมีค่าเสมอน้าา ไม่ว่าจะเล็กหรือใหญ่แค่อ้วนตั้งใจอ่านหนังสือทุกวัน เค้าก็ภูมิใจในตัวอ้วนมาก ๆ ขอให้เธอเริ่มเช้านี้ด้วยรอยยิ้มน้าา ☀️",
  "ถ้าวันนี้รู้สึกเหนื่อย ลองพักแป๊บนึง หายใจเข้าลึก ๆ อ้วนทำได้ดีแล้วน้าา การพักบ้างก็สำคัญไม่แพ้การอ่านหนังสือ เค้าเชื่อว่าอ้วนเก่งทีสุด อิอิ",
  "ต๊ะเอ๋ คนเก่งของเค้า 🌟 ทุกหน้ากระดาษที่อ้วนอ่าน คือก้าวเล็ก ๆ ของความสำเร็จ อย่าเพิ่งท้อน้าาา",
  "ถึงไอ่อ้วนที่ตั้งใจมาก ๆ 💫 อย่าลืมให้เวลาตัวเองได้พักสายตา ดื่มน้ำ หรือดูการ์ตูนบ้าง การดูแลตัวเองก็สำคัญน้าาา",
  "คนเก่งของเค้าาา 💛 อาจจะเหนื่อยบ้าง แต่อ้วนไม่จำเป็นต้องเข้าใจทุกอย่างในครั้งเดียวน้าา ค่อย ๆ ทำไปทีละอย่าง เธอทำได้แน่นอน แค่อ้วนตั้งใจและก็อดทน ก็ถือว่าประสบความสำเร็จแล้ววว",
  "หวัดดีจ้าอ้วนนน 🧡 จะเหนื่อยแค่ไหนก็อย่าลืมให้ตัวเองยิ้มบ้างน้าาา เค้าภูมิใจในตัวเธอทุกวัน 💫",
  "คนเก่งของเค้า ✨ พรุ่งนี้จะสอบแล้วน้าาา จำไว้ว่าอ้วนเตรียมตัวมาเต็มที่แล้ว ทุกความพยายามที่ผ่านมาไม่สูญเปล่า อ้วนมั่นใจในตัวเองเยอะ ๆ น้าา เค้าเชื่อว่าอ้วนทำได้แน่นอน 💪",
  "คนเก่งที่สุดของเค้า 🫶 วันนี้คือวันที่อ้วนจะได้โชว์ความเก่งให้โลกรู้แล้ว ฮ่าฮ่า ไม่ต้องกังวลกับผลลัพธ์ ขอแค่อ้วนทำเต็มที่ก็ถือว่าชนะแล้ววว ขอให้เธอสอบผ่าน ได้คะแนนเย้อ ๆ ไม่กดดันตอนสอบ เค้าภูมิใจในตัวอ้วนเสมอน้าา 💛✨"
];

// ===== ELEMENTS =====
const calendarEl = document.getElementById("calendar");
  const countdownEl = document.getElementById("countdown");
  const todayLetterEl = document.getElementById("todayLetter");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const modalTitle = document.getElementById("modalTitle");
  const closeModal = document.getElementById("closeModal");
  const closeBtn = document.getElementById("closeBtn");

  function daysBetween(a, b){
    return Math.floor((b - a)/(1000*60*60*24));
  }

  function buildCalendar(){
    if(!calendarEl) return;
    calendarEl.innerHTML = "";
    const today = new Date();
    const normToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    messages.forEach((msg,i)=>{
      const dt = new Date(startDate.getTime());
      dt.setDate(dt.getDate() + i);
      const tile = document.createElement("button");
      tile.className="tile";

      const dateLabel = dt.toLocaleDateString('th-TH',{day:'2-digit',month:'short'});
      const dateNum = document.createElement("div");
      dateNum.className="date-num";
      dateNum.textContent = dateLabel;

      const label = document.createElement("div");
      label.className="label";
      label.textContent = `Letter ${i+1}`;

      tile.appendChild(dateNum);
      tile.appendChild(label);

      const normDt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

      if(normDt <= normToday){
        tile.addEventListener("click",()=>openLetter(i));
      } else {
        tile.classList.add("locked");
        tile.addEventListener("click", ()=>{
          tile.animate([{transform:"translateY(0)"},{transform:"translateY(-6px)"},{transform:"translateY(0)"}],{duration:300});
        });
      }

      calendarEl.appendChild(tile);
    });
  }

  function updateCountdown(){
    if(!countdownEl) return;
    const now = new Date();
    const diff = Math.max(Math.ceil((meetDate - now)/(1000*60*60*24)),0);
    countdownEl.textContent = `อีก ${diff} วันจะได้เจอกัน 💛`;
  }

  function updateTodayLetter(){
    if(!todayLetterEl) return;
    const today = new Date();
    const diff = daysBetween(startDate, today);
    if(diff>=0 && diff<messages.length){
      todayLetterEl.textContent=`📬 วันนี้เบบี๋เปิด Letter #${diff+1} ได้!`;
    } else if(diff>=messages.length){
      todayLetterEl.textContent="📬 จดหมายสุดท้ายแล้ว! เตรียมเจอกันนะอ้วนนน!";
    } else {
      todayLetterEl.textContent="📬 Letter ยังไม่ปลดล็อกนะไอ่ตุ่ด";
    }
  }

  function openLetter(index){
    if(!modal || !modalBody || !modalTitle) return;
    const dt = new Date(startDate.getTime());
    dt.setDate(dt.getDate() + index);
    const labelDate = dt.toLocaleDateString('th-TH',{day:'2-digit',month:'long',year:'numeric'});
    modalTitle.textContent=`Letter ${index+1} — ${labelDate}`;
    modalBody.innerHTML = `<div class="emoji">📬</div><div>${messages[index]||"ไม่มีข้อความสำหรับวันนี้"}</div>`;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
  }

  function hideModal(){
    if(!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden","true");
  }

  if(closeModal) closeModal.addEventListener("click",hideModal);
  if(closeBtn) closeBtn.addEventListener("click",hideModal);
  if(modal) modal.addEventListener("click",(e)=>{if(e.target===modal) hideModal();});

  function setThemeByTime(){
    const hour = new Date().getHours();
    const badgeId = "themeBadge";
    let badge = document.getElementById(badgeId);
    if(!badge){
      badge = document.createElement("div");
      badge.id = badgeId;
      badge.style.position="fixed";
      badge.style.right="16px";
      badge.style.bottom="16px";
      badge.style.background="rgba(255,255,255,0.25)";
      badge.style.backdropFilter="blur(6px)";
      badge.style.padding="8px 12px";
      badge.style.borderRadius="12px";
      badge.style.fontSize="13px";
      badge.style.zIndex="100";
      document.body.appendChild(badge);
    }

    let badgeEmoji="📬";
    let badgeMsg="Letter Calendar";
    if(hour>=6 && hour<12){ badgeEmoji="☀️"; badgeMsg="กู๊ดมอนิ่งน้าเบบี๋"; }
    else if(hour>=12 && hour<18){ badgeEmoji="🌤️"; badgeMsg="Afternoon คับอ้วนนน"; }
    else if(hour>=18 && hour<20){ badgeEmoji="🌇"; badgeMsg="Sunset calm"; }
    else { badgeEmoji="🌙"; badgeMsg="Good night น้าไอ่ตุ่ด"; }
    badge.textContent=`${badgeEmoji} ${badgeMsg}`;
  }

  // INIT
  buildCalendar();
  updateCountdown();
  updateTodayLetter();
  setThemeByTime();

  // INTERVALS
  setInterval(updateCountdown,1000*60);
  setInterval(updateTodayLetter,1000*60);
  setInterval(setThemeByTime,1000*60*5);

});
function updateBackgroundByTime(){
  const hour = new Date().getHours();
  let bgColor, textColor;
  if(hour>=6 && hour<12){ // morning
    bgColor = "linear-gradient(180deg,var(--bgMorning),#fff2d1)";
    textColor = "var(--accent)";
  } else if(hour>=12 && hour<18){ // afternoon
    bgColor = "linear-gradient(180deg,var(--bgAfternoon),#ffe4b3)";
    textColor = "var(--accent)";
  } else if(hour>=18 && hour<20){ // evening
    bgColor = "linear-gradient(180deg,var(--bgEvening),#ffd49b)";
    textColor = "var(--accent)";
  } else { // night
    bgColor = "linear-gradient(180deg,#1e1e2b,#2c2c3a)";
    textColor = "#f3f3f3";
  }
  document.body.style.background = bgColor;
  document.body.style.color = textColor;
  document.querySelectorAll('.countdown,.lead,.today-letter,.tile').forEach(el=>{
    if(hour>=20 || hour<6){
      el.style.background = "rgba(50,50,70,0.85)";
      el.style.color = "#f3f3f3";
    } else {
      el.style.background = "rgba(255,255,255,0.85)";
      el.style.color = "var(--accent)";
    }
  });
}
setInterval(updateBackgroundByTime, 60000);
updateBackgroundByTime(); // เรียกตอนโหลดด้วย