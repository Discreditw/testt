
// Static demo data (no server)
const DEMO_USERS = [
  {id:1, username:'alice', role:'student'},
  {id:2, username:'bob', role:'student'},
  {id:3, username:'admin', role:'admin'}
];
const DEMO_GRADES = [
  {id:1, user_id:1, subject:'Math', grade:'5', date:'2025-11-01'},
  {id:2, user_id:1, subject:'Physics', grade:'4', date:'2025-11-05'},
  {id:3, user_id:2, subject:'Math', grade:'3', date:'2025-10-28'}
];
const DEMO_SCHEDULE = [
  {id:1, day:'Monday', time:'09:00', subject:'Math', room:'101'},
  {id:2, day:'Monday', time:'10:00', subject:'English', room:'102'},
  {id:3, day:'Tuesday', time:'09:00', subject:'Physics', room:'201'}
];

// Utility
function el(id){return document.getElementById(id);}

document.addEventListener('DOMContentLoaded', ()=>{
  // fill grades page
  if(el('gradesList')) renderGrades(DEMO_GRADES);

  // fill admin tables
  if(el('usersTable')) {
    const tbody = document.querySelector('#usersTable tbody');
    DEMO_USERS.forEach(u=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.id}</td><td>${u.username}</td><td>${u.role}</td><td><button onclick="alert('Только UI — не работает')">Редактировать</button> <button onclick="alert('Только UI — не работает')">Удалить</button></td>`;
      tbody.appendChild(tr);
    });
    const gt = document.querySelector('#gradesTable tbody');
    DEMO_GRADES.forEach(g=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${g.id}</td><td>${g.user_id}</td><td>${g.subject}</td><td>${g.grade}</td><td>${g.date}</td><td><button onclick="alert('Только UI — не работает')">Редактировать</button></td>`;
      gt.appendChild(tr);
    });
    const st = document.querySelector('#scheduleTable tbody');
    DEMO_SCHEDULE.forEach(s=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td><td>${s.day}</td><td>${s.time}</td><td>${s.subject}</td><td>${s.room}</td>`;
      st.appendChild(tr);
    });
  }

  // chat page initial messages
  if(el('chatBox')) {
    const box = el('chatBox');
    const messages = [
      {user:'alice', text:'Привет, кто готов к контрольной?'},
      {user:'bob', text:'Я!'},
      {user:'admin', text:'Напоминаю: завтра собрание.'}
    ];
    messages.forEach(m=>{
      const d = document.createElement('div');
      d.className='msg';
      d.innerHTML = `<b>${m.user}:</b> ${m.text}`;
      box.appendChild(d);
    });
  }
});

// Fake login - client side only
function fakeLogin(e){
  if(e) e.preventDefault();
  const u = el('username').value;
  el('loginMsg').innerText = 'Привет, ' + u + '. Это только визуальный вход (без сервера).';
}

// Fake chat send
function sendFakeMessage(){
  const text = el('chatInput').value;
  if(!text) return alert('Введите сообщение');
  const box = el('chatBox');
  const d = document.createElement('div');
  d.className='msg';
  d.innerHTML = `<b>you:</b> ${escapeHtml(text)}`;
  box.appendChild(d);
  el('chatInput').value='';
  box.scrollTop = box.scrollHeight;
  alert('Сообщение не отправлено на сервер — это только интерфейс.');
}

// Grades rendering & filtering (client-side)
function renderGrades(list){
  const ul = el('gradesList');
  ul.innerHTML = '';
  list.forEach(g=>{
    const li = document.createElement('li');
    li.textContent = `${g.date} — ${g.subject}: ${g.grade} (user ${g.user_id})`;
    ul.appendChild(li);
  });
}

function applyGradeFilter(){
  const subject = el('subjectFilter') ? el('subjectFilter').value.trim().toLowerCase() : '';
  const from = el('fromDate') ? el('fromDate').value : '';
  const to = el('toDate') ? el('toDate').value : '';
  let filtered = DEMO_GRADES.slice();
  if(subject) filtered = filtered.filter(g=>g.subject.toLowerCase().includes(subject));
  if(from) filtered = filtered.filter(g=>g.date >= from);
  if(to) filtered = filtered.filter(g=>g.date <= to);
  renderGrades(filtered);
}

function resetGradeFilter(){ el('subjectFilter').value=''; el('fromDate').value=''; el('toDate').value=''; renderGrades(DEMO_GRADES); }

// Simple escape
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}
