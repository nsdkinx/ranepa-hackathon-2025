document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    // Функция для перехода к определенному слайду
    function goToSlide(index) {
        if (index < 0) {
            index = itemCount - 1;
        } else if (index >= itemCount) {
            index = 0;
        }
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // кнопки
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // автопрокрутка    
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Обработка формы обратной связи
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // В реальном проекте здесь был бы код для отправки данных на сервер
            // Например, с использованием fetch API или FormData
            
            // Имитация отправки
            alert(`Спасибо, ${name}! Ваше сообщение отправлено на games@ranepa.ru`);
            contactForm.reset();
        });
    }
    
    // Добавление кнопки "Вступить в сообщество" в секцию "О нас"
    const aboutSection = document.querySelector('section:first-of-type');
    if (aboutSection) {
        const joinButton = document.createElement('a');
        joinButton.href = 'https://t.me/s/mainranepa';
        joinButton.className = 'join-button';
        joinButton.textContent = 'Вступить в сообщество';
        joinButton.target = '_blank';
        aboutSection.appendChild(joinButton);
        
        // Альтернативный вариант с модальным окном
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const confirmed = confirm('Хотите присоединиться к нашему Сообществу?');
            if (confirmed) {
                window.open('https://vk.com/ranepa', '_blank');
            }
        });
    }

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Update header based on login status
    updateHeader(currentUser, isAdmin);

    // Handle registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        const passwordInput = document.getElementById('reg-password');
        const confirmPasswordInput = document.getElementById('reg-confirm-password');
        const messageDiv = document.getElementById('registration-message');
        
        function updatePasswordValidation() {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Clear previous messages
            messageDiv.className = 'message';
            messageDiv.textContent = '';
            
            // Reset styles
            passwordInput.classList.remove('error', 'success');
            confirmPasswordInput.classList.remove('error', 'success');
            
            if (password && confirmPassword) {
                if (password !== confirmPassword) {
                    passwordInput.classList.add('error');
                    confirmPasswordInput.classList.add('error');
                    messageDiv.textContent = 'Пароли не совпадают';
                    messageDiv.className = 'message error';
                    return false;
                } else {
                    passwordInput.classList.add('success');
                    confirmPasswordInput.classList.add('success');
                    return true;
                }
            }
            return true;
        }

        // Add event listeners for real-time password checking
        [passwordInput, confirmPasswordInput].forEach(input => {
            input.addEventListener('input', updatePasswordValidation);
            input.addEventListener('blur', updatePasswordValidation);
        });

        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validate form
            if (!updatePasswordValidation()) {
                return;
            }

            if (password.length < 6) {
                passwordInput.classList.add('error');
                messageDiv.textContent = 'Пароль должен содержать минимум 6 символов';
                messageDiv.className = 'message error';
                return;
            }

            // Create user object
            const user = {
                name,
                email,
                password
            };

            // Save user to database
            Database.addUser(user);

            // Show success message and redirect
            messageDiv.textContent = 'Регистрация успешно завершена!';
            messageDiv.className = 'message success';
            
            setTimeout(() => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Handle admin login
    const adminForm = document.getElementById('adminForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            const messageDiv = document.getElementById('admin-message');

            if (Database.verifyAdmin(username, password)) {
                localStorage.setItem('isAdmin', 'true');
                window.location.href = 'index.html';
            } else {
                messageDiv.textContent = 'Неверный логин или пароль';
                messageDiv.className = 'message error';
            }
        });
    }

    // Handle logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        });
    }

    // Initialize content editing if admin is logged in
    if (isAdmin) {
        initializeContentEditing();
    }

    // Helper functions
    function showMessage(text, type) {
        const messageDiv = document.getElementById('registration-message');
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
        }
    }

    function updateHeader(user, isAdmin) {
        const header = document.querySelector('header .container');
        const registerBtn = document.querySelector('.register-btn');

        if (user) {
            if (registerBtn) {
                registerBtn.remove();
            }
        } else if (!isAdmin) {
            if (!registerBtn) {
                const registerLink = document.createElement('a');
                registerLink.href = 'registration.html';
                registerLink.className = 'register-btn';
                registerLink.textContent = 'Регистрация';
                header.appendChild(registerLink);
            }
        }
    }

    function initializeContentEditing() {
        const editableElements = document.querySelectorAll('h1, h2, h3, p, p:not(.news-date)');
        
        editableElements.forEach(element => {
            element.addEventListener('click', function() {
                if (this.contentEditable !== 'true') {
                    this.contentEditable = 'true';
                    this.classList.add('edit-mode');
                    
                    const controls = document.createElement('div');
                    controls.className = 'edit-controls';
                    controls.innerHTML = `
                        <button class="save-btn">Сохранить</button>
                        <button class="cancel-btn">Отменить</button>
                    `;
                    
                    this.appendChild(controls);
                    
                    controls.querySelector('.save-btn').addEventListener('click', function() {
                        saveContent();
                    });
                    
                    controls.querySelector('.cancel-btn').addEventListener('click', function() {
                        cancelEdit(element);
                    });
                }
            });
        });
    }

    function saveContent() {
        const content = {
            mainTitle: document.querySelector('header h1').textContent,
            mainSubtitle: document.querySelector('header p').textContent,
            aboutText: document.querySelector('section:nth-child(1) p').textContent
        };
        
        Database.saveContent(content);
        location.reload();
    }

    function cancelEdit(element) {
        element.contentEditable = 'false';
        element.classList.remove('edit-mode');
        const controls = element.querySelector('.edit-controls');
        if (controls) {
            controls.remove();
        }
    }
});