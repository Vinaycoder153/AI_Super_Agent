/* ----------------------------- App Data Models -----------------------------
       Event: { id, title: {en,hi,kn}, type: {en,hi,kn}, description: {en,hi,kn}, deepOverview: {en,hi,kn}, capacity, participants: [userId], status: 'pending'|'approved'|'completed', prize, startDate, endDate, organizer, createdAt, googleFormLink }
       User: { id, name, email, role, eventsParticipated: number, rewards: number, badges: [] }
    --------------------------------------------------------------------------*/

    // Utilities
    function uid(prefix = '') { return prefix + Math.random().toString(36).slice(2, 9); }
    function save(key, v) { localStorage.setItem(key, JSON.stringify(v)); }
    function load(key, fallback) { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }

    // Keys
    const EVENTS_KEY = 'cem_events_v1';
    const USERS_KEY = 'cem_users_v1';
    const CURR_KEY = 'cem_current_v1';
    const LANG_KEY = 'cem_lang_v1';

    // Seed sample data if empty
    function seed() {
      let events = load(EVENTS_KEY, null);
      let users = load(USERS_KEY, null);
      let curr = load(CURR_KEY, null);

      if (!users) {
        users = [
          { id: 'u_alex', name: 'Alex Johnson', email: 'alex@college.edu', role: 'Student', eventsParticipated: 2, rewards: 1, badges: ['Bronze'] },
          { id: 'u_meera', name: 'Meera Rao', email: 'meera@college.edu', role: 'Student', eventsParticipated: 4, rewards: 2, badges: ['Silver'] },
          { id: 'u_organ', name: 'Organ Team', email: 'orga@college.edu', role: 'Organizer', eventsParticipated: 0, rewards: 0, badges: [] },
        ];
        save(USERS_KEY, users);
      }

      if (!events) {
        events = [
          { 
            id: 'e1', 
            title: { en: '24h Hackathon', hi: '24 घंटे का हैकथॉन', kn: '24 ಗಂಟೆಗಳ ಹ್ಯಾಕಥಾನ್' },
            type: { en: 'Hackathon', hi: 'हैकथॉन', kn: 'ಹ್ಯಾಕಥಾನ್' },
            description: { en: 'Build something awesome in 24 hours.', hi: '24 घंटे में कुछ अद्भुत बनाएं।', kn: '24 ಗಂಟೆಗಳಲ್ಲಿ ಅದ್ಭುತವಾದದ್ದನ್ನು ನಿರ್ಮಿಸಿ.' },
            deepOverview: {
              en: 'This 24-hour hackathon is an intense event where you will team up with other students to build a software or hardware project from scratch. We provide the food, drinks, and mentors. You bring your ideas and energy. At the end, you will present your project to a panel of judges for a chance to win exciting prizes.',
              hi: 'यह 24-घंटे का हैकथॉन एक गहन कार्यक्रम है जहाँ आप अन्य छात्रों के साथ मिलकर स्क्रैच से एक सॉफ्टवेयर या हार्डवेयर प्रोजेक्ट बनाएंगे। हम भोजन, पेय और संरक्षक प्रदान करते हैं। आप अपने विचार और ऊर्जा लाते हैं। अंत में, आप रोमांचक पुरस्कार जीतने का मौका पाने के लिए न्यायाधीशों के एक पैनल के सामने अपनी परियोजना प्रस्तुत करेंगे।',
              kn: 'ಈ 24-ಗಂಟೆಗಳ ಹ್ಯಾಕಥಾನ್ ಒಂದು ತೀವ್ರವಾದ ಕಾರ್ಯಕ್ರಮವಾಗಿದ್ದು, ಇದರಲ್ಲಿ ನೀವು ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಸೇರಿ ಮೊದಲಿನಿಂದ ಸಾಫ್ಟ್‌ವೇರ್ ಅಥವಾ ಹಾರ್ಡ್‌ವೇರ್ ಯೋಜನೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತೀರಿ. ನಾವು ಆಹಾರ, ಪಾನೀಯಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಆಲೋಚನೆಗಳು ಮತ್ತು ಶಕ್ತಿಯನ್ನು ನೀವು ತರುತ್ತೀರಿ. ಕೊನೆಯಲ್ಲಿ, ಅತ್ಯಾಕರ್ಷಕ ಬಹುಮಾನಗಳನ್ನು ಗೆಲ್ಲುವ ಅವಕಾಶಕ್ಕಾಗಿ ನೀವು ನಿಮ್ಮ ಯೋಜನೆಯನ್ನು ನ್ಯಾಯಾಧೀಶರ ಸಮಿತಿಯ ಮುಂದೆ ಪ್ರಸ್ತುತಪಡಿಸುತ್ತೀರಿ.'
            },
            capacity: 50, participants: ['u_alex','u_meera'], status: 'completed', prize: 'Cash Prize ₹10,000', startDate: '2025-09-10', endDate: '2025-09-11', organizer: 'Organ Team', createdAt: Date.now() - 86400000 * 10, googleFormLink: 'https://forms.gle/123456789' 
          },
          { 
            id: 'e2', 
            title: { en: 'UI/UX Workshop', hi: 'यूआई/यूएक्स कार्यशाला', kn: 'ಯುಐ/ಯುಎಕ್ಸ್ ಕಾರ್ಯಾಗಾರ' },
            type: { en: 'Workshop', hi: 'कार्यशाला', kn: 'ಕಾರ್ಯಾಗಾರ' },
            description: { en: 'Learn Figma & UX basics.', hi: 'फिग्मा और यूएक्स की मूल बातें जानें।', kn: 'ಫಿಗ್ಮಾ ಮತ್ತು ಯುಎಕ್ಸ್ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ಕಲಿಯಿರಿ.' },
            deepOverview: {
              en: 'Join our hands-on workshop to learn the fundamentals of UI/UX design using Figma. This session is perfect for beginners. We will cover user research, wireframing, prototyping, and creating a visually appealing design. By the end of the workshop, you will have designed your own mobile app screen.',
              hi: 'फिग्मा का उपयोग करके यूआई/यूएक्स डिजाइन के मूल सिद्धांतों को जानने के लिए हमारी व्यावहारिक कार्यशाला में शामिल हों। यह सत्र शुरुआती लोगों के लिए एकदम सही है। हम उपयोगकर्ता अनुसंधान, वायरफ्रेमिंग, प्रोटोटाइपिंग और एक आकर्षक डिजाइन बनाने को कवर करेंगे। कार्यशाला के अंत तक, आपने अपना खुद का मोबाइल ऐप स्क्रीन डिजाइन कर लिया होगा।',
              kn: 'ಫಿಗ್ಮಾವನ್ನು ಬಳಸಿಕೊಂಡು UI/UX ವಿನ್ಯಾಸದ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ತಿಳಿಯಲು ನಮ್ಮ ಕಾರ್ಯಾಗಾರಕ್ಕೆ ಸೇರಿ. ಈ ಅಧಿವೇಶನವು ಆರಂಭಿಕರಿಗಾಗಿ ಸೂಕ್ತವಾಗಿದೆ. ನಾವು ಬಳಕೆದಾರರ ಸಂಶೋಧನೆ, ವೈರ್‌ಫ್ರೇಮಿಂಗ್, ಮೂಲಮಾದರಿ ಮತ್ತು ದೃಷ್ಟಿಗೆ ಇಷ್ಟವಾಗುವ ವಿನ್ಯಾಸವನ್ನು ರಚಿಸುವುದನ್ನು ಒಳಗೊಳ್ಳುತ್ತೇವೆ. ಕಾರ್ಯಾಗಾರದ ಕೊನೆಯಲ್ಲಿ, ನೀವು ನಿಮ್ಮ ಸ್ವಂತ ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್ ಪರದೆಯನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಿರುತ್ತೀರಿ.'
            },
            capacity: 40, participants: [], status: 'approved', prize: 'Certificates & goodies', startDate: '2025-10-02', endDate: '2025-10-02', organizer: 'Organ Team', createdAt: Date.now() - 86400000 * 3, googleFormLink: 'https://forms.gle/abcdefghi'
          },
          { 
            id: 'e3', 
            title: { en: 'Algo Challenge', hi: 'एल्गो चैलेंज', kn: 'ಅಲ್ಗೋ ಚಾಲೆಂಜ್' },
            type: { en: 'Competition', hi: 'प्रतियोगिता', kn: 'ಸ್ಪರ್ಧೆ' },
            description: { en: 'Timed coding challenge.', hi: 'समयबद्ध कोडिंग चुनौती।', kn: 'ಸಮಯದ ಕೋಡಿಂಗ್ ಸವಾಲು.' },
            deepOverview: {
              en: 'Test your problem-solving and coding skills in this timed algorithmic challenge. You will be given a set of problems to solve within a specific time limit. This competition is a great way to prepare for technical interviews and compete with your peers. Top performers will receive prizes and recognition.',
              hi: 'इस समयबद्ध एल्गोरिथम चुनौती में अपनी समस्या-समाधान और कोडिंग कौशल का परीक्षण करें। आपको एक विशिष्ट समय सीमा के भीतर हल करने के लिए समस्याओं का एक सेट दिया जाएगा। यह प्रतियोगिता तकनीकी साक्षात्कारों की तैयारी करने और अपने साथियों के साथ प्रतिस्पर्धा करने का एक शानदार तरीका है। शीर्ष प्रदर्शन करने वालों को पुरस्कार और मान्यता मिलेगी।',
              kn: 'ಈ ಸಮಯದ ಅಲ್ಗಾರಿದಮಿಕ್ ಸವಾಲಿನಲ್ಲಿ ನಿಮ್ಮ ಸಮಸ್ಯೆ-ಪರಿಹರಿಸುವ ಮತ್ತು ಕೋಡಿಂಗ್ ಕೌಶಲ್ಯಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ. ನಿರ್ದಿಷ್ಟ ಸಮಯದ ಮಿತಿಯೊಳಗೆ ಪರಿಹರಿಸಲು ನಿಮಗೆ ಸಮಸ್ಯೆಗಳ ಗುಂಪನ್ನು ನೀಡಲಾಗುತ್ತದೆ. ತಾಂತ್ರಿಕ ಸಂದರ್ಶನಗಳಿಗೆ ತಯಾರಾಗಲು ಮತ್ತು ನಿಮ್ಮ ಗೆಳೆಯರೊಂದಿಗೆ ಸ್ಪರ್ಧಿಸಲು ಈ ಸ್ಪರ್ಧೆಯು ಉತ್ತಮ ಮಾರ್ಗವಾಗಿದೆ. ಉನ್ನತ ಪ್ರದರ್ಶನಕಾರರು ಬಹುಮಾನಗಳನ್ನು ಮತ್ತು ಮನ್ನಣೆಯನ್ನು ಪಡೆಯುತ್ತಾರೆ.'
            },
            capacity: 100, participants: [], status: 'pending', prize: 'Top coders get swags', startDate: '2025-11-12', endDate: '2025-11-12', organizer: 'Organ Team', createdAt: Date.now() - 86400000 * 1, googleFormLink: 'https://forms.gle/jklmnopqr'
          },
        ];
        save(EVENTS_KEY, events);
      }

      if (!curr) {
        // default demo user (Student). User can change 'role' using roleSelect to simulate.
        curr = { id: 'demo_student', name: 'Demo Student', email: 'demo@student.edu', role: 'Student' };
        save(CURR_KEY, curr);
      }
    }

    // App state
    let events = [];
    let users = [];
    let current = null;
    let lang = 'en';

    // Init
    function initApp() {
      seed();
      events = load(EVENTS_KEY, []);
      users = load(USERS_KEY, []);
      current = load(CURR_KEY, { id: 'demo_student', name: 'Demo Student', email: 'demo@student.edu', role: 'Student' });
      lang = load(LANG_KEY, 'en');

      // If current user not in users, add them
      if (!users.find(u => u.id === current.id)) {
        users.push({ id: current.id, name: current.name, email: current.email, role: current.role, eventsParticipated: 0, rewards: 0, badges: [] });
        save(USERS_KEY, users);
      }

      // UI bindings
      document.getElementById('roleSelect').value = current.role || 'Student';
      document.getElementById('roleSelect').addEventListener('change', (e) => {
        const role = e.target.value;
        current.role = role; save(CURR_KEY, current);
        renderRoleSensitive();
      });

      document.getElementById('langSelect').value = lang;
      document.getElementById('langSelect').addEventListener('change', (e) => {
        lang = e.target.value;
        save(LANG_KEY, lang);
        renderAll();
      });

      document.getElementById('createEventBtn').addEventListener('click', openCreateEventModal);
      document.getElementById('profileBtn').addEventListener('click', openProfileModal);
      document.getElementById('searchInput').addEventListener('input', renderEvents);

      renderAll();
    }

    /* ----------------------------- Rendering ----------------------------- */
    function renderAll() {
      renderRoleSensitive();
      renderStats();
      renderEvents();
      renderMyRegistrations();
      renderRewardsPanel();
      renderLeaderboard();
    }

    function renderRoleSensitive() {
      const role = current.role || document.getElementById('roleSelect').value;
      // show organizer controls
      document.getElementById('organizerControls').classList.toggle('hidden', role !== 'Organizer');
      document.getElementById('adminControls').classList.toggle('hidden', role !== 'Admin');
      // update profile button label
      document.getElementById('profileBtn').textContent = `${current.name.split(' ')[0]} (${role})`;
    }

    function renderStats() {
      const totalEvents = events.length;
      const totalParticipants = events.reduce((acc, e) => acc + (e.participants ? e.participants.length : 0), 0);
      const totalRewards = users.reduce((acc, u) => acc + (u.rewards || 0), 0);
      document.getElementById('statEvents').textContent = totalEvents;
      document.getElementById('statParticipants').textContent = totalParticipants;
      document.getElementById('statRewards').textContent = totalRewards;
    }

    function renderEvents() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const grid = document.getElementById('eventsGrid');
      grid.innerHTML = '';

      const filtered = events.filter(e => {
        const title = (e.title[lang] || e.title['en']).toLowerCase();
        const type = (e.type[lang] || e.type['en']).toLowerCase();
        const description = (e.description[lang] || e.description['en']).toLowerCase();
        return (title + ' ' + type + ' ' + description).includes(q);
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="text-slate-400 col-span-full">No events found.</div>';
        return;
      }

      filtered.forEach(e => {
        const card = document.createElement('div');
        card.className = 'p-4 rounded-xl neumo glass';
        const eventTitle = e.title[lang] || e.title['en'];
        const eventType = e.type[lang] || e.type['en'];
        const eventDescription = e.description[lang] || e.description['en'];

        card.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-600 to-emerald-400 text-black font-medium">${eventType[0] || 'E'}</div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-lg">${eventTitle}</h3>
                <div class="text-xs px-2 py-1 rounded-md ${e.status === 'pending' ? 'badge-pending' : e.status==='approved' ? 'badge-approved' : 'badge-completed'}">${e.status}</div>
              </div>
              <p class="text-slate-300 text-sm mt-1">${truncate(eventDescription, 120)}</p>
              <div class="mt-3 flex items-center justify-between text-sm text-slate-300">
                <div>📅 ${e.startDate} • 🧑‍🤝‍🧑 ${e.participants.length}/${e.capacity}</div>
                <div class="flex items-center gap-2">
                  <button class="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm" data-action="details" data-id="${e.id}">Details</button>
                  ${renderActionButtons(e)}
                </div>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });

      // attach listeners
      grid.querySelectorAll('button[data-action="details"]').forEach(btn => btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id; openEventDetails(id);
      }));

      grid.querySelectorAll('button[data-action="register"]').forEach(btn => btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id; registerToEvent(id);
      }));

      grid.querySelectorAll('button[data-action="approve"]').forEach(btn => btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id; approveEvent(id);
      }));

      grid.querySelectorAll('button[data-action="complete"]').forEach(btn => btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id; completeEvent(id);
      }));

      grid.querySelectorAll('button[data-action="edit"]').forEach(btn => btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id; openEditEventModal(id);
      }));
    }

    function renderActionButtons(e) {
      const role = current.role;
      // If student and event is approved -> show register if capacity not full
      if (role === 'Student') {
        const registered = e.participants.includes(current.id);
        if (e.status === 'approved') {
          if (registered) return `<button class="px-3 py-1 rounded-md bg-amber-500 text-black text-sm" data-action="details" data-id="${e.id}">Registered</button>`;
          if (e.participants.length >= e.capacity) return `<button class="px-3 py-1 rounded-md bg-slate-700 text-sm" disabled>Full</button>`;
          return `<button class="px-3 py-1 rounded-md bg-emerald-500 text-black" data-action="register" data-id="${e.id}">Register</button>`;
        }
        return '';
      }

      // Organizer: edit & mark completed
      if (role === 'Organizer') {
        // owner editing allowed for demonstration (all organizers)
        const editBtn = `<button class="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-sm" data-action="edit" data-id="${e.id}">Edit</button>`;
        const completeBtn = e.status === 'approved' ? `<button class="px-3 py-1 rounded-md bg-indigo-600 text-white" data-action="complete" data-id="${e.id}">Mark Completed</button>` : '';
        return editBtn + completeBtn;
      }

      // Admin
      if (role === 'Admin') {
        const approveBtn = e.status === 'pending' ? `<button class="px-3 py-1 rounded-md bg-amber-500 text-black" data-action="approve" data-id="${e.id}">Approve</button>` : '';
        const completeBtn = e.status === 'approved' ? `<button class="px-3 py-1 rounded-md bg-indigo-600 text-white" data-action="complete" data-id="${e.id}">Mark Completed</button>` : '';
        return approveBtn + completeBtn;
      }

      return '';
    }

    function truncate(s, n) { return s.length > n ? s.slice(0, n-1) + '…' : s; }

    /* ----------------------------- Modals & Forms ----------------------------- */
    function openCreateEventModal() {
      const html = `
        <div class="fixed inset-0 flex items-center justify-center z-40">
          <div class="absolute inset-0 bg-black/60" onclick="closeModal()"></div>
          <div class="relative max-w-3xl w-full p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl">
            <h3 class="text-lg font-semibold mb-4">Create Event</h3>
            <form id="createEventForm" class="space-y-3 text-sm">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (English)</label>
                  <input name="title_en" required placeholder="Event title" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (Hindi)</label>
                  <input name="title_hi" placeholder="इवेंट का शीर्षक" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (Kannada)</label>
                  <input name="title_kn" placeholder="ಈವೆಂಟ್ ಶೀರ್ಷಿಕೆ" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (English)</label>
                  <input name="type_en" required placeholder="Type (Hackathon/Workshop)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (Hindi)</label>
                  <input name="type_hi" placeholder="प्रकार (हैकथॉन/कार्यशाला)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (Kannada)</label>
                  <input name="type_kn" placeholder="ಪ್ರಕಾರ (ಹ್ಯಾಕಥಾನ್/ಕಾರ್ಯಾಗಾರ)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
              </div>
              <div>
                <label class="block text-xs text-slate-300 mb-1">Description (English)</label>
                <textarea name="description_en" placeholder="Short description" class="w-full p-2 rounded-md bg-slate-800 h-20"></textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Description (Hindi)</label>
                <textarea name="description_hi" placeholder="संक्षिप्त विवरण" class="w-full p-2 rounded-md bg-slate-800 h-20"></textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Description (Kannada)</label>
                <textarea name="description_kn" placeholder="ಸಣ್ಣ ವಿವರಣೆ" class="w-full p-2 rounded-md bg-slate-800 h-20"></textarea>
              </div>
              <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (English)</label>
                <textarea name="deepOverview_en" placeholder="Detailed explanation of the event" class="w-full p-2 rounded-md bg-slate-800 h-24"></textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (Hindi)</label>
                <textarea name="deepOverview_hi" placeholder="घटना का विस्तृत विवरण" class="w-full p-2 rounded-md bg-slate-800 h-24"></textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (Kannada)</label>
                <textarea name="deepOverview_kn" placeholder="ಈವೆಂಟ್‌ನ ವಿವರವಾದ ವಿವರಣೆ" class="w-full p-2 rounded-md bg-slate-800 h-24"></textarea>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <input name="capacity" type="number" placeholder="Capacity" class="p-2 rounded-md bg-slate-800" />
                <input name="startDate" placeholder="Start date (YYYY-MM-DD)" class="p-2 rounded-md bg-slate-800" />
                <input name="endDate" placeholder="End date (YYYY-MM-DD)" class="p-2 rounded-md bg-slate-800" />
              </div>
              <input name="prize" placeholder="Prize details" class="p-2 rounded-md bg-slate-800 w-full" />
              <input name="googleFormLink" placeholder="Google Form Link" class="p-2 rounded-md bg-slate-800 w-full" />

              <div class="flex items-center justify-end gap-2">
                <button type="button" onclick="closeModal()" class="px-3 py-2 rounded-md bg-slate-700">Cancel</button>
                <button type="submit" class="px-4 py-2 rounded-md bg-emerald-500 text-black">Create</button>
              </div>
            </form>
          </div>
        </div>
      `;
      showModal(html);
      document.getElementById('createEventForm').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const f = ev.target;
        const data = {
          id: uid('e_'),
          title: {
            en: f.title_en.value.trim(),
            hi: f.title_hi.value.trim(),
            kn: f.title_kn.value.trim(),
          },
          type: {
            en: f.type_en.value.trim(),
            hi: f.type_hi.value.trim(),
            kn: f.type_kn.value.trim(),
          },
          description: {
            en: f.description_en.value.trim(),
            hi: f.description_hi.value.trim(),
            kn: f.description_kn.value.trim(),
          },
          deepOverview: {
            en: f.deepOverview_en.value.trim(),
            hi: f.deepOverview_hi.value.trim(),
            kn: f.deepOverview_kn.value.trim(),
          },
          capacity: Number(f.capacity.value) || 50,
          participants: [],
          status: 'pending',
          prize: f.prize.value || '',
          startDate: f.startDate.value || '',
          endDate: f.endDate.value || '',
          organizer: current.name,
          createdAt: Date.now(),
          googleFormLink: f.googleFormLink.value.trim()
        };
        events.push(data); save(EVENTS_KEY, events); closeModal(); renderAll(); toast('Event created — pending approval');
      });
    }

    function openEditEventModal(id) {
      const e = events.find(x => x.id === id); if (!e) return toast('Event not found');
      const html = `
        <div class="fixed inset-0 flex items-center justify-center z-40">
          <div class="absolute inset-0 bg-black/60" onclick="closeModal()"></div>
          <div class="relative max-w-3xl w-full p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl">
            <h3 class="text-lg font-semibold mb-4">Edit Event</h3>
            <form id="editEventForm" class="space-y-3 text-sm">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (English)</label>
                  <input name="title_en" value="${escapeHtml(e.title.en)}" required placeholder="Event title" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (Hindi)</label>
                  <input name="title_hi" value="${escapeHtml(e.title.hi)}" placeholder="इवेंट का शीर्षक" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Title (Kannada)</label>
                  <input name="title_kn" value="${escapeHtml(e.title.kn)}" placeholder="ಈವೆಂಟ್ ಶೀರ್ಷಿಕೆ" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (English)</label>
                  <input name="type_en" value="${escapeHtml(e.type.en)}" required placeholder="Type (Hackathon/Workshop)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (Hindi)</label>
                  <input name="type_hi" value="${escapeHtml(e.type.hi)}" placeholder="प्रकार (हैकथॉन/कार्यशाला)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
                <div>
                  <label class="block text-xs text-slate-300 mb-1">Type (Kannada)</label>
                  <input name="type_kn" value="${escapeHtml(e.type.kn)}" placeholder="ಪ್ರಕಾರ (ಹ್ಯಾಕಥಾನ್/ಕಾರ್ಯಾಗಾರ)" class="p-2 rounded-md bg-slate-800 w-full" />
                </div>
              </div>
              <div>
                <label class="block text-xs text-slate-300 mb-1">Description (English)</label>
                <textarea name="description_en" placeholder="Short description" class="w-full p-2 rounded-md bg-slate-800 h-20">${escapeHtml(e.description.en)}</textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Description (Hindi)</label>
                <textarea name="description_hi" placeholder="संक्षिप्त विवरण" class="w-full p-2 rounded-md bg-slate-800 h-20">${escapeHtml(e.description.hi)}</textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Description (Kannada)</label>
                <textarea name="description_kn" placeholder="ಸಣ್ಣ ವಿವರಣೆ" class="w-full p-2 rounded-md bg-slate-800 h-20">${escapeHtml(e.description.kn)}</textarea>
              </div>
              <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (English)</label>
                <textarea name="deepOverview_en" placeholder="Detailed explanation of the event" class="w-full p-2 rounded-md bg-slate-800 h-24">${event.deepOverview.en || ''}</textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (Hindi)</label>
                <textarea name="deepOverview_hi" placeholder="घटना का विस्तृत विवरण" class="w-full p-2 rounded-md bg-slate-800 h-24">${event.deepOverview.hi || ''}</textarea>
              </div>
               <div>
                <label class="block text-xs text-slate-300 mb-1">Deep Overview (Kannada)</label>
                <textarea name="deepOverview_kn" placeholder="ಈವೆಂಟ್‌ನ ವಿವರವಾದ ವಿವರಣೆ" class="w-full p-2 rounded-md bg-slate-800 h-24">${event.deepOverview.kn || ''}</textarea>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <input name="capacity" type="number" value="${e.capacity}" placeholder="Capacity" class="p-2 rounded-md bg-slate-800" />
                <input name="startDate" value="${e.startDate}" placeholder="Start date (YYYY-MM-DD)" class="p-2 rounded-md bg-slate-800" />
                <input name="endDate" value="${e.endDate}" placeholder="End date (YYYY-MM-DD)" class="p-2 rounded-md bg-slate-800" />
              </div>
              <input name="prize" value="${escapeHtml(e.prize)}" placeholder="Prize details" class="p-2 rounded-md bg-slate-800 w-full" />
              <input name="googleFormLink" value="${escapeHtml(e.googleFormLink || '')}" placeholder="Google Form Link" class="p-2 rounded-md bg-slate-800 w-full" />

              <div class="flex items-center justify-end gap-2">
                <button type="button" onclick="closeModal()" class="px-3 py-2 rounded-md bg-slate-700">Cancel</button>
                <button type="submit" class="px-4 py-2 rounded-md bg-amber-500 text-black">Save</button>
              </div>
            </form>
          </div>
        </div>
      `;
      showModal(html);
      document.getElementById('editEventForm').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const f = ev.target;
        e.title = {
            en: f.title_en.value.trim(),
            hi: f.title_hi.value.trim(),
            kn: f.title_kn.value.trim(),
        };
        e.type = {
            en: f.type_en.value.trim(),
            hi: f.type_hi.value.trim(),
            kn: f.type_kn.value.trim(),
        };
        e.description = {
            en: f.description_en.value.trim(),
            hi: f.description_hi.value.trim(),
            kn: f.description_kn.value.trim(),
        };
        e.deepOverview = {
            en: f.deepOverview_en.value.trim(),
            hi: f.deepOverview_hi.value.trim(),
            kn: f.deepOverview_kn.value.trim(),
        };
        e.capacity = Number(f.capacity.value) || e.capacity; 
        e.prize = f.prize.value; 
        e.startDate = f.startDate.value; 
        e.endDate = f.endDate.value;
        e.googleFormLink = f.googleFormLink.value.trim();
        save(EVENTS_KEY, events); closeModal(); renderAll(); toast('Event updated');
      });
    }

    function openProfileModal() {
      const html = `
        <div class="fixed inset-0 flex items-center justify-center z-40">
          <div class="absolute inset-0 bg-black/60" onclick="closeModal()"></div>
          <div class="relative max-w-md w-full p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl">
            <h3 class="text-lg font-semibold mb-4">Profile</h3>
            <form id="profileForm" class="space-y-3 text-sm">
              <input name="name" value="${escapeHtml(current.name)}" class="p-2 rounded-md bg-slate-800 w-full" />
              <input name="email" value="${escapeHtml(current.email)}" class="p-2 rounded-md bg-slate-800 w-full" />
              <div class="flex items-center justify-between">
                <select name="role" class="p-2 rounded-md bg-slate-800">
                  <option ${current.role==='Student'?'selected':''}>Student</option>
                  <option ${current.role==='Organizer'?'selected':''}>Organizer</option>
                  <option ${current.role==='Admin'?'selected':''}>Admin</option>
                </select>
                <div>
                  <button type="button" onclick="closeModal()" class="px-3 py-2 rounded-md bg-slate-700">Cancel</button>
                  <button type="submit" class="px-3 py-2 rounded-md bg-indigo-600 ml-2">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;
      showModal(html);
      document.getElementById('profileForm').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const f = ev.target; current.name = f.name.value.trim(); current.email = f.email.value.trim(); current.role = f.role.value; save(CURR_KEY, current);
        // ensure in users list
        const u = users.find(x => x.id === current.id);
        if (u) { u.name = current.name; u.email = current.email; u.role = current.role; } else { users.push({ id: current.id, name: current.name, email: current.email, role: current.role, eventsParticipated: 0, rewards: 0, badges: [] }); }
        save(USERS_KEY, users); closeModal(); renderAll(); toast('Profile updated');
      });
    }

    function openEventDetails(id) {
      const e = events.find(x => x.id === id); if (!e) return toast('Event not found');
      const participantsHtml = e.participants.map(pid => {
        const u = users.find(x => x.id === pid);
        return `<div class="px-3 py-1 rounded-md bg-slate-800 text-sm">${u ? u.name : pid}</div>`;
      }).join('');

      const eventTitle = e.title[lang] || e.title['en'];
      const eventType = e.type[lang] || e.type['en'];
      const eventDescription = e.description[lang] || e.description['en'];

      const html = `
        <div class="fixed inset-0 flex items-center justify-center z-40">
          <div class="absolute inset-0 bg-black/60" onclick="closeModal()"></div>
          <div class="relative max-w-3xl w-full p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-2xl font-semibold">${escapeHtml(eventTitle)}</h3>
                <p class="text-sm text-slate-300">${escapeHtml(eventType)} • ${escapeHtml(e.startDate)} to ${escapeHtml(e.endDate)}</p>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-300">Organizer</div>
                <div class="font-semibold">${escapeHtml(e.organizer)}</div>
              </div>
            </div>
            <p class="mt-4 text-slate-200">${escapeHtml(eventDescription)}</p>

            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-semibold">Participants (${e.participants.length}/${e.capacity})</h4>
                <div class="mt-2 space-y-2">${participantsHtml || '<div class="text-slate-400">No participants yet.</div>'}</div>
              </div>
              <div>
                <h4 class="text-sm font-semibold">Prize</h4>
                <div class="mt-2 text-slate-200">${escapeHtml(e.prize || '—')}</div>
                <div class="mt-4">
                  ${current.role === 'Student' && e.status === 'approved' && !e.participants.includes(current.id) && e.participants.length < e.capacity ? `<button class="px-4 py-2 rounded-md bg-emerald-500 text-black" id="detailRegisterBtn">Register</button>` : ''}
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <button class="px-3 py-2 rounded-md bg-indigo-600" onclick="openDeepOverviewModal('${e.id}')">Deep Overview</button>
              <button onclick="closeModal()" class="px-3 py-2 rounded-md bg-slate-700">Close</button>
            </div>
          </div>
        </div>
      `;
      showModal(html);
      const btn = document.getElementById('detailRegisterBtn'); if (btn) btn.addEventListener('click', () => { registerToEvent(id); closeModal(); });
    }

    function openDeepOverviewModal(id) {
      const event = events.find(x => x.id === id); if (!event) return toast('Event not found');
      const overview = event.deepOverview[lang] || event.deepOverview['en'] || 'No deep overview available.';
      const title = event.title[lang] || event.title['en'];
      const html = `
        <div class="fixed inset-0 flex items-center justify-center z-50">
          <div class="absolute inset-0 bg-black/70" onclick="closeModal()"></div>
          <div class="relative max-w-3xl w-full p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl neumo-inset">
            <h3 class="text-xl font-semibold mb-2">Deep Overview: ${escapeHtml(title)}</h3>
            <div class="max-h-[60vh] overflow-y-auto pr-2 text-slate-300 space-y-4">
              ${
                // cheap markdown to html
                escapeHtml(overview)
                  .split('\\n\\n').map(p => `<p>${p.trim()}</p>`).join('')
                  .split('\\n').map(p => `<p>${p.trim()}</p>`).join('')
              }
            </div>
            <div class="mt-6 text-right">
              <button onclick="closeModal()" class="px-4 py-2 rounded-md bg-slate-700">Close</button>
            </div>
          </div>
        </div>
      `;
      showModal(html);
    }

    function showModal(html) { document.getElementById('modalRoot').innerHTML = html; }
    function closeModal() { document.getElementById('modalRoot').innerHTML = ''; }

    /* ----------------------------- Actions ----------------------------- */
    function registerToEvent(id) {
      const e = events.find(x => x.id === id); if (!e) return toast('Event not found');
      if (e.status !== 'approved') return toast('Event is not open for registration');
      if (e.participants.includes(current.id)) return toast('Already registered');
      if ((e.participants.length || 0) >= e.capacity) return toast('Event full');

      // Redirect to Google Form
      if (e.googleFormLink) {
        window.open(e.googleFormLink, '_blank');
        toast('Please fill out the registration form.');
        // Note: We don't add the participant here directly. 
        // This would be handled by a backend after form submission.
        // For this demo, we'll add them to show the UI change.
        e.participants.push(current.id);
        let u = users.find(x => x.id === current.id);
        if (!u) { u = { id: current.id, name: current.name, email: current.email, role: current.role, eventsParticipated: 0, rewards: 0, badges: [] }; users.push(u); }
        save(EVENTS_KEY, events);
        save(USERS_KEY, users);
        renderAll();
      } else {
        toast('Registration form not available.');
      }
    }

    function approveEvent(id) {
      const e = events.find(x => x.id === id); if (!e) return toast('Not found');
      e.status = 'approved'; save(EVENTS_KEY, events); renderAll(); toast('Event approved');
    }

    function completeEvent(id) {
      const e = events.find(x => x.id === id); if (!e) return toast('Not found');
      e.status = 'completed'; save(EVENTS_KEY, events);
      // distribute rewards: every participant gets 1 reward, and increment eventsParticipated
      e.participants.forEach(pid => {
        let u = users.find(x => x.id === pid);
        if (!u) {
          u = { id: pid, name: pid, email: '', role: 'Student', eventsParticipated: 0, rewards: 0, badges: [] };
          users.push(u);
        }
        u.eventsParticipated = (u.eventsParticipated || 0) + 1;
        u.rewards = (u.rewards || 0) + 1;
        // award badge based on total participated
        if (u.eventsParticipated >= 5 && !u.badges.includes('Gold')) { u.badges.push('Gold'); }
        else if (u.eventsParticipated >= 3 && !u.badges.includes('Silver')) { u.badges.push('Silver'); }
        else if (u.eventsParticiped >= 1 && !u.badges.includes('Bronze')) { if (!u.badges.includes('Bronze')) u.badges.push('Bronze'); }
      });
      save(USERS_KEY, users); renderAll(); toast('Event completed — rewards distributed');
    }

    /* ----------------------------- UI small pieces ----------------------------- */
    function escapeHtml(s) { return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

    function toast(msg) {
      const t = document.createElement('div'); t.className = 'px-4 py-2 rounded-md bg-black/40 border border-white/5 text-sm'; t.textContent = msg; document.getElementById('toast').appendChild(t);
      setTimeout(() => { t.remove(); }, 3500);
    }

    /* ----------------------------- My Registrations & Rewards ----------------------------- */
    function renderMyRegistrations() {
      const el = document.getElementById('myRegistrations'); el.innerHTML = '';
      const myEvents = events.filter(e => e.participants.includes(current.id));
      if (myEvents.length === 0) { el.innerHTML = '<div class="text-slate-400">You have no registrations yet.</div>'; return; }
      myEvents.forEach(e => {
        const d = document.createElement('div'); d.className = 'p-2 rounded-md bg-slate-800 flex items-center justify-between';
        const eventTitle = e.title[lang] || e.title['en'];
        d.innerHTML = `<div><div class="font-semibold">${escapeHtml(eventTitle)}</div><div class="text-xs text-slate-300">${escapeHtml(e.startDate)} • ${e.status}</div></div><div><button class="px-3 py-1 rounded-md bg-slate-700" onclick="openEventDetails('${e.id}')">Details</button></div>`;
        el.appendChild(d);
      });
    }

    function renderRewardsPanel() {
      const el = document.getElementById('rewardsPanel'); el.innerHTML = '';
      const u = users.find(x => x.id === current.id) || { eventsParticipated: 0, rewards: 0, badges: [] };
      el.innerHTML = `<div class="p-3 rounded-md bg-slate-800 neumo">
        <div class="text-sm">Events participated: <strong>${u.eventsParticipated}</strong></div>
        <div class="text-sm">Rewards earned: <strong>${u.rewards}</strong></div>
        <div class="text-sm mt-2">Badges: ${u.badges.length ? u.badges.map(b => `<span class='px-2 py-1 rounded-md bg-slate-700 mr-2'>${b}</span>`).join('') : '<span class="text-slate-400">None yet</span>'}</div>
      </div>`;
    }

    function renderLeaderboard() {
      const ol = document.getElementById('leaderboard'); ol.innerHTML = '';
      const sorted = [...users].sort((a,b) => (b.eventsParticipated||0) - (a.eventsParticipated||0)).slice(0,6);
      sorted.forEach(u => { const li = document.createElement('li'); li.innerHTML = `${escapeHtml(u.name)} — ${u.eventsParticipated || 0} events`; ol.appendChild(li); });
    }

    /* ----------------------------- Helpers & Save ----------------------------- */
    // ensure events and users saved at times
    window.addEventListener('beforeunload', () => { save(EVENTS_KEY, events); save(USERS_KEY, users); save(CURR_KEY, current); });

    // tiny keyboard shortcuts (for power use)
    document.addEventListener('keydown', (e) => { if (e.key === 'c' && current.role === 'Organizer') openCreateEventModal(); });

    // Start
    initApp();