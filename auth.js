(function () {
    const sessionData = localStorage.getItem('admin_session');
    const isLoginPage = window.location.pathname.includes('login.html');

    if (!isLoginPage) {
        if (!sessionData) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const session = JSON.parse(sessionData);
            // Verify session is not empty and has a user
            if (!session || !session.user) {
                throw new Error('Invalid session');
            }

            // Optional: Expire session after 24 hours of inactivity
            const oneDay = 24 * 60 * 60 * 1000;
            if (Date.now() - session.time > oneDay) {
                localStorage.removeItem('admin_session');
                window.location.href = 'login.html';
            }
        } catch (e) {
            localStorage.removeItem('admin_session');
            window.location.href = 'login.html';
        }
    }

    // Global Logout Function
    window.logout = function () {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            localStorage.removeItem('admin_session');
            window.location.href = 'login.html';
        }
    };
})();
