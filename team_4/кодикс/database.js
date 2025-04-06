// Database handler
const Database = {
    // Initialize database
    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('admin')) {
            localStorage.setItem('admin', JSON.stringify({
                username: 'admin',
                password: 'admin'
            }));
        }
        console.log('Database initialized'); // Debug log
    },

    // User management
    addUser(user) {
        const users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },

    getUser(email) {
        const users = JSON.parse(localStorage.getItem('users'));
        return users.find(user => user.email === email);
    },

    // Admin management
    verifyAdmin(username, password) {
        const admin = JSON.parse(localStorage.getItem('admin'));
        console.log('Verifying admin:', admin); // Debug log
        const isValid = admin.username === username && admin.password === password;
        console.log('Admin verification result:', isValid); // Debug log
        return isValid;
    },

    // Content management
    saveContent(content) {
        localStorage.setItem('siteContent', JSON.stringify(content));
    },

    getContent() {
        return JSON.parse(localStorage.getItem('siteContent')) || {
            mainTitle: 'Лаборатория логических игр СПО РАНХиГС',
            mainSubtitle: 'Развиваем логическое мышление через игры',
            aboutText: 'Лаборатория логических игр СПО РАНХиГС - это пространство для развития логического мышления, стратегического планирования и творческого подхода к решению задач. Мы проводим регулярные мероприятия, турниры и мастер-классы для студентов и всех желающих.',
            // Add other content fields as needed
        };
    }
};

// Initialize database on load
Database.init(); 