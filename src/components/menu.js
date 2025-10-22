// Webhook URL - replace with your actual n8n webhook URL
const N8N_WEBHOOK_URL = 'https://liana0904.app.n8n.cloud/webhook-test/portal';

// Demo data
const DEMO = {
  byStatus: { "New": 5, "In progress": 4, "In testing": 1, "Done": 2 },
  tasks: [
    { id: 101, subject: "Собрать требования", status: "New", startDate: "2025-10-01", dueDate: "2025-10-05" },
    { id: 102, subject: "Прототип UI", status: "In progress", startDate: "2025-10-03", dueDate: "2025-10-10" },
    { id: 103, subject: "Бэкенд API v1", status: "In progress", startDate: "2025-10-02", dueDate: "2025-10-09" },
    { id: 104, subject: "Тест-план", status: "New", startDate: "2025-10-06", dueDate: "2025-10-12" },
    { id: 105, subject: "Регрессионные тесты", status: "In testing", startDate: "2025-10-07", dueDate: "2025-10-14" },
    { id: 106, subject: "Подготовка релиза", status: "Done", startDate: "2025-09-28", dueDate: "2025-10-01" },
    { id: 107, subject: "Документация", status: "Done", startDate: "2025-09-25", dueDate: "2025-09-29" }
  ]
};

// Function to send POST request to n8n webhook
async function sendToN8N(page) {
  try {
    const payload = {
      querry: {
        page: page,
        html: document.documentElement.outerHTML
      }
    };

    console.log('Sending POST request to n8n for page:', page);
    console.log('HTML length:', payload.querry.html.length);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log('Successfully sent data to n8n. Response:', responseData);
    
  } catch (error) {
    console.error('Error sending data to n8n:', error);
  }
}

// Function to initialize the application
export function initializeApp() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="wrap">
      <div class="layout">
        <!-- SIDEBAR -->
        <aside class="sidebar">
          <div class="logo">Project Console</div>
          <div class="menu">
            <div class="item" data-section="analysis" title="Анализ задач">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9db1ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M8 9h8M8 13h8"></path>
                <path d="M6 9l.8.8 1.6-1.6"></path><path d="M6 13l.8.8 1.6-1.6"></path>
              </svg><div><div>Анализ задач</div><div class="muted">поиск похожих</div></div>
            </div>
            <div class="item" data-section="planning" title="Планирование">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9db1ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path>
                <rect x="7" y="13" width="3" height="3"></rect><rect x="12" y="13" width="3" height="3"></rect>
              </svg><div><div>Планирование</div><div class="muted">задачи и дедлайны</div></div>
            </div>
            <div class="item" data-section="project" title="Анализ проекта">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9db1ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3v18h18"></path><rect x="6" y="12" width="3" height="6"></rect>
                <rect x="11" y="9" width="3" height="9"></rect><rect x="16" y="6" width="3" height="12"></rect>
              </svg><div><div>Анализ проекта</div><div class="muted">метрики и вывод ИИ</div></div>
            </div>
            <div class="item active" data-section="reports" title="Отчёты">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9db1ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6M8 13h8M8 17h5M8 9h3"></path>
              </svg><div><div>Отчёты</div><div class="muted">основные и расширенные</div></div>
            </div>
            <div class="item" data-section="chat" title="Чат с ИИ">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9db1ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg><div><div>Чат с ИИ</div><div class="muted">задавайте вопросы</div></div>
            </div>
          </div>
        </aside>

        <!-- MAIN -->
        <main class="main">
          <!-- Анализ задач -->
          <div class="section" id="analysis">
            <h1>Анализ задач</h1>
            <p class="sub">Поиск похожих задач и выявление дубликатов</p>
            
            <div class="card">
              <h3>Возможные дубликаты</h3>
              <div class="alert alert-warn">
                <div class="alert-icon">!</div>
                <div class="alert-content">
                  <strong>Обнаружены похожие задачи:</strong> "Создать API для пользователей" и "Разработать эндпоинты для регистрации"
                  <div class="alert-actions">
                    <button class="alert-btn">Объединить</button>
                    <button class="alert-btn">Игнорировать</button>
                    <button class="alert-btn">Назначить встречу</button>
                  </div>
                </div>
              </div>
              <div class="alert alert-bad">
                <div class="alert-icon">!</div>
                <div class="alert-content">
                  <strong>Дублирование функционала:</strong> "Интеграция с платежной системой А" и "Подключение платежного шлюза B"
                  <div class="alert-actions">
                    <button class="alert-btn">Объединить</button>
                    <button class="alert-btn">Игнорировать</button>
                    <button class="alert-btn">Назначить встречу</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card">
              <h3>Поиск похожих задач</h3>
              <div class="toolbar">
                <input placeholder="Введите ключевые слова для поиска..." />
                <button>Поиск</button>
              </div>
              <table>
                <thead><tr><th>ID</th><th>Название</th><th>Статус</th><th>Схожесть</th><th>Действия</th></tr></thead>
                <tbody>
                  <tr><td>101</td><td>Создать API для пользователей</td><td><span class="tag">In progress</span></td><td>87%</td><td><button class="alert-btn">Сравнить</button></td></tr>
                  <tr><td>105</td><td>Разработать эндпоинты для регистрации</td><td><span class="tag">New</span></td><td>87%</td><td><button class="alert-btn">Сравнить</button></td></tr>
                  <tr><td>112</td><td>Интеграция с платежной системой А</td><td><span class="tag">Done</span></td><td>76%</td><td><button class="alert-btn">Сравнить</button></td></tr>
                  <tr><td>118</td><td>Подключение платежного шлюза B</td><td><span class="tag">In progress</span></td><td>76%</td><td><button class="alert-btn">Сравнить</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Планирование -->
          <div class="section" id="planning">
            <h1>Планирование</h1>
            <p class="sub">Управление задачами и дедлайнами</p>
            
            <div class="card">
              <h3>Предупреждения о рисках</h3>
              <div class="alert alert-warn">
                <div class="alert-icon">!</div>
                <div class="alert-content">
                  <strong>Риск срыва дедлайна:</strong> Задача "Реализация модуля аналитики" имеет высокую сложность и может не уложиться в срок
                  <div class="alert-actions">
                    <button class="alert-btn">Перенести дедлайн</button>
                    <button class="alert-btn">Назначить встречу</button>
                    <button class="alert-btn">Перераспределить ресурсы</button>
                  </div>
                </div>
              </div>
              <div class="alert alert-bad">
                <div class="alert-icon">!</div>
                <div class="alert-content">
                  <strong>Перегрузка ресурсов:</strong> Разработчик Иванов А.С. назначен на 5 задач одновременно
                  <div class="alert-actions">
                    <button class="alert-btn">Перераспределить</button>
                    <button class="alert-btn">Назначить встречу</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col">
                <div class="card">
                  <h3>Дорожная карта проекта</h3>
                  <div class="bars">
                    <div class="bar">
                      <div class="label">Этап 1</div>
                      <div class="track"><div class="fill" style="width:100%"></div></div>
                      <div>100%</div>
                    </div>
                    <div class="bar">
                      <div class="label">Этап 2</div>
                      <div class="track"><div class="fill" style="width:75%"></div></div>
                      <div>75%</div>
                    </div>
                    <div class="bar">
                      <div class="label">Этап 3</div>
                      <div class="track"><div class="fill" style="width:30%"></div></div>
                      <div>30%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <h3>Критические пути</h3>
                  <ul>
                    <li>Завершение API до 15.10.2025</li>
                    <li>Тестирование безопасности до 20.10.2025</li>
                    <li>Интеграция с платежной системой до 25.10.2025</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="card">
              <h3>Календарь дедлайнов</h3>
              <div id="calendar-chart" class="chart-container"></div>
              <div class="chart-options">
                <div class="chart-option active" data-chart="calendar">Календарь</div>
                <div class="chart-option" data-chart="gantt">Диаграмма Ганта</div>
                <div class="chart-option" data-chart="timeline">Таймлайн</div>
              </div>
            </div>
          </div>

          <!-- Анализ проекта -->
          <div class="section" id="project">
            <h1>Анализ проекта</h1>
            <p class="sub">Метрики и выводы ИИ</p>
            
            <div class="card">
              <h3>Ключевые метрики</h3>
              <div class="row">
                <div class="col">
                  <div class="card">
                    <h4>Прогресс проекта</h4>
                    <div style="font-size:32px;font-weight:bold;text-align:center">64%</div>
                    <div class="bars" style="margin-top:12px">
                      <div class="bar">
                        <div class="track"><div class="fill" style="width:64%"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                    <h4>Средняя загрузка команды</h4>
                    <div style="font-size:32px;font-weight:bold;text-align:center">78%</div>
                    <div class="bars" style="margin-top:12px">
                      <div class="bar">
                        <div class="track"><div class="fill" style="width:78%"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                    <h4>Риск срыва сроков</h4>
                    <div style="font-size:32px;font-weight:bold;text-align:center;color:var(--warn)">32%</div>
                    <div class="bars" style="margin-top:12px">
                      <div class="bar">
                        <div class="track"><div class="fill" style="width:32%"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card">
              <h3>Анализ ИИ</h3>
              <div class="alert alert-ok">
                <div class="alert-icon">✓</div>
                <div class="alert-content">
                  <strong>Положительная динамика:</strong> Команда демонстрирует стабильную скорость выполнения задач. За последние 2 недели выполнено на 15% больше задач, чем планировалось.
                </div>
              </div>
              <div class="alert alert-warn">
                <div class="alert-icon">!</div>
                <div class="alert-content">
                  <strong>Обнаружена проблема:</strong> Модуль аналитики отстает от графика на 3 дня. Рекомендуется перераспределить ресурсы или уточнить требования.
                  <div class="alert-actions">
                    <button class="alert-btn">Оптимизировать ресурсы</button>
                    <button class="alert-btn">Скорректировать план</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card">
              <h3>Визуализация метрик</h3>
              <div id="metrics-chart" class="chart-container"></div>
              <div class="chart-options">
                <div class="chart-option active" data-chart="line">Линейный график</div>
                <div class="chart-option" data-chart="bar">Столбчатая диаграмма</div>
                <div class="chart-option" data-chart="area">Областная диаграмма</div>
                <div class="chart-option" data-chart="radar">Радарная диаграмма</div>
              </div>
            </div>
          </div>

          <!-- Отчёты -->
          <div class="section active" id="reports">
            <h1>Отчёты</h1>
            <p class="sub">Готовые сводки, быстрый экспорт и таблица задач с фильтрами</p>

            <!-- Действия -->
            <div class="card">
              <div class="btnGrid">
                <div class="fakebtn" id="btn-pdf">Скачать в PDF</div>
                <div class="fakebtn" id="btn-csv">Экспорт</div>
                <div class="fakebtn" id="btn-print">Печать</div>
                <div class="fakebtn" id="btn-refresh">Обновить</div>
              </div>
            </div>

            <!-- Диаграмма статусов -->
            <div class="card">
              <h3>Распределение задач по статусам</h3>
              <div id="status-bars" class="bars"></div>
              <div class="chart-options">
                <div class="chart-option active" data-chart="bars">Полосы</div>
                <div class="chart-option" data-chart="pie">Круговая</div>
                <div class="chart-option" data-chart="donut">Кольцевая</div>
                <div class="chart-option" data-chart="stacked">Столбчатая</div>
              </div>
            </div>

            <!-- Просрочки и ближайшие -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <h3>Просроченные</h3>
                  <div id="overdue">—</div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <h3>Ближайшие дедлайны (14 дней)</h3>
                  <div id="upcoming">—</div>
                </div>
              </div>
            </div>

            <!-- Таблица -->
            <div class="card">
              <h3>Все задачи</h3>
              <div class="toolbar">
                <input id="q" placeholder="Поиск по названию/статусу…" />
                <select id="status"><option value="">Все статусы</option></select>
              </div>
              <table id="tbl">
                <thead><tr><th>ID</th><th>Название</th><th>Статус</th><th>Начало</th><th>Дедлайн</th></tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <!-- Чат с ИИ -->
          <div class="section" id="chat">
            <h1>Чат с ИИ-агентом</h1>
            <p class="sub">Задавайте вопросы о проекте, получайте аналитику и рекомендации</p>
            
            <div class="card">
              <div class="chat-container">
                <div class="chat-messages">
                  <div class="chat-message ai">
                    Здравствуйте! Я ваш ИИ-помощник по управлению проектами. Могу помочь с анализом данных, выявлением рисков и рекомендациями по оптимизации процессов. Чем могу помочь?
                  </div>
                  <div class="chat-message user">
                    Какие задачи находятся в группе риска по срыву дедлайнов?
                  </div>
                  <div class="chat-message ai">
                    На основе анализа данных, следующие задачи имеют высокий риск срыва дедлайнов:<br><br>
                    1. <strong>Модуль аналитики</strong> (ID: 203) - отставание 3 дня, сложность высокая<br>
                    2. <strong>Интеграция с CRM</strong> (ID: 215) - недостаточно ресурсов<br>
                    3. <strong>Тестирование безопасности</strong> (ID: 228) - блокируется другими задачами<br><br>
                    Рекомендую перераспределить ресурсы и провести встречу с командой для корректировки плана.
                  </div>
                </div>
                <div class="chat-input">
                  <input type="text" placeholder="Введите ваш вопрос..." id="chat-input" />
                  <button id="send-message">Отправить</button>
                </div>
                <div class="chat-export">
                  <button class="fakebtn" id="export-chat-csv">Экспорт чата в CSV</button>
                  <button class="fakebtn" id="export-chat-pdf">Экспорт чата в PDF</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  // Initialize all functionality
  initializeNavigation();
  initializeReports();
  initializeChat();
  initializeCharts();
  initializeAlerts();
}

// Navigation functionality
function initializeNavigation() {
  const menuItems = document.querySelectorAll('.menu .item');
  const sections = document.querySelectorAll('.section');
  
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.getAttribute('data-section');
      
      // Update active menu item
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      // Show corresponding section
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(sectionId).classList.add('active');
      
      // Send GET request to n8n webhook
      sendToN8N(sectionId);
    });
  });
}

// Reports functionality
function initializeReports() {
  const bars = document.getElementById('status-bars');
  const overdueEl = document.getElementById('overdue');
  const upcomingEl = document.getElementById('upcoming');
  const tbody = document.querySelector('#tbl tbody');
  const q = document.getElementById('q');
  const sel = document.getElementById('status');

  const byStatus = DEMO.byStatus;
  const tasks = DEMO.tasks;
  const total = tasks.length;
  const today = new Date();
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x };
  const parseDate = (s) => s ? new Date(s) : null;
  const fmt = (d) => d ? new Date(d).toISOString().slice(0, 10) : '—';

  // Status bars
  bars.innerHTML = Object.entries(byStatus).map(([name, count]) => {
    const p = Math.round((count / Math.max(1, total)) * 100);
    return `<div class="bar">
      <div class="label">${name}</div>
      <div class="track"><div class="fill" style="width:${p}%"></div></div>
      <div>${count} (${p}%)</div>
    </div>`;
  }).join('');

  // Overdue and upcoming
  const overdue = tasks.filter(r => { const d = parseDate(r.dueDate); return d && d < today; })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const upcoming = tasks.filter(r => { const d = parseDate(r.dueDate); return d && d >= today && d <= addDays(today, 14); })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const list = (arr) => arr.length
    ? `<ul>${arr.map(r => `<li>#${r.id} · ${r.subject} · <span class="tag">${r.status}</span> · дедлайн: ${fmt(r.dueDate)}</li>`).join('')}</ul>`
    : '<span class="muted">нет</span>';

  overdueEl.innerHTML = list(overdue);
  upcomingEl.innerHTML = list(upcoming);

  // Status select
  const statuses = Array.from(new Set(tasks.map(r => r.status))).sort();
  sel.innerHTML = '<option value="">Все статусы</option>' + statuses.map(s => `<option>${s}</option>`).join('');

  // Table + filters
  function render() {
    const text = (q.value || '').toLowerCase();
    const st = sel.value;
    const filtered = tasks.filter(r => {
      const hit = r.subject.toLowerCase().includes(text) || r.status.toLowerCase().includes(text) || String(r.id).includes(text);
      const okSt = !st || (r.status === st);
      return hit && okSt;
    });
    tbody.innerHTML = filtered.map(r =>
      `<tr><td>${r.id}</td><td>${r.subject}</td><td><span class="tag">${r.status}</span></td><td>${fmt(r.startDate)}</td><td>${fmt(r.dueDate)}</td></tr>`
    ).join('') || '<tr><td colspan="5" class="muted">ничего не найдено</td></tr>';
  }

  q.addEventListener('input', render);
  sel.addEventListener('change', render);
  render();

  // Actions
  document.getElementById('btn-csv').addEventListener('click', () => {
    const rows = Array.from(document.querySelectorAll('#tbl tbody tr'))
      .map(tr => Array.from(tr.querySelectorAll('td')).map(td => td.textContent));
    if (!rows.length) return alert('Нет данных для экспорта');
    const header = ['ID', 'Название', 'Статус', 'Начало', 'Дедлайн'];
    const csv = [header].concat(rows).map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'tasks.csv'; document.body.appendChild(a); a.click(); URL.revokeObjectURL(a.href); a.remove();
  });

  document.getElementById('btn-pdf').addEventListener('click', () => {
    alert('Функция экспорта в PDF будет реализована при интеграции с бэкендом');
  });

  document.getElementById('btn-print').addEventListener('click', () => window.print());
  document.getElementById('btn-refresh').addEventListener('click', () => location.reload());
}

// Chat functionality
function initializeChat() {
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const chatMessages = document.querySelector('.chat-messages');

  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, true);
      chatInput.value = '';

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "На основе анализа данных, я вижу, что проект движется по плану, но есть несколько областей, требующих внимания.",
          "Рекомендую обратить внимание на распределение ресурсов - некоторые задачи могут быть перегружены.",
          "Согласно моему анализу, риск срыва дедлайнов составляет около 15%. Рекомендую провести встречу для корректировки плана.",
          "За последнюю неделю команда показала отличные результаты - выполнено на 12% больше задач, чем планировалось."
        ];
        addMessage(responses[Math.floor(Math.random() * responses.length)], false);
      }, 1000);
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });

  // Chat export
  document.getElementById('export-chat-csv').addEventListener('click', () => {
    const messages = Array.from(document.querySelectorAll('.chat-message'));
    const csvData = messages.map(msg => {
      const type = msg.classList.contains('user') ? 'Пользователь' : 'ИИ';
      const text = msg.textContent.replace(/"/g, '""');
      return `"${type}","${text}"`;
    });

    const csv = ['"Тип","Сообщение"', ...csvData].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'chat-export.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  });

  document.getElementById('export-chat-pdf').addEventListener('click', () => {
    alert('Функция экспорта чата в PDF будет реализована при интеграции с бэкендом');
  });
}

// Chart functionality
function initializeCharts() {
  const chartOptions = document.querySelectorAll('.chart-option');
  chartOptions.forEach(option => {
    option.addEventListener('click', () => {
      const parent = option.closest('.card');
      const options = parent.querySelectorAll('.chart-option');
      options.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      // Chart rendering logic would go here
    });
  });
}

// Alert functionality
function initializeAlerts() {
  const alertButtons = document.querySelectorAll('.alert-btn');
  alertButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.textContent;
      alert(`Выполняется действие: ${action}. В реальном приложении здесь будет соответствующая функциональность.`);
    });
  });
}
