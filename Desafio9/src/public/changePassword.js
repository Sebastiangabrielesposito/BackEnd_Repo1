document.addEventListener('DOMContentLoaded', () => {
    const changePasswordBtn = document.querySelector('#change-password-btn');
  
    changePasswordBtn.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const email = document.querySelector('#email').value;
      const oldPassword = document.querySelector('#oldPassword').value;
      const newPassword = document.querySelector('#newPassword').value;
  
      const response = await fetch('/users/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          oldPassword,
          newPassword
        })
      });
  
      if (response.ok) {
        window.location.href = '/views/login';
      } else {
        window.location.href = '/views/errorLogin';
        
      }

  
    });
  });