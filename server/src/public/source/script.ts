document.addEventListener('DOMContentLoaded', function () {
   const btnResetPwd = document.querySelector('.btn--resetPwd') as HTMLAnchorElement;

   const resetPassword = async () => {
      const password = document.getElementById('password') as HTMLInputElement;
      const passwordConfirm = document.getElementById('passwordAgain') as HTMLInputElement;
      const token = document.querySelector('.reset-password');

      if (!token) throw new Error('No token found!');

      try {
         const res = await fetch(`/api/v1/users/resetPassword/${token.id}`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               password: password.value,
               passwordConfirm: passwordConfirm.value,
            }),
         });
         if (res.status === 200) {
            window.location.replace('http://localhost:5173');
         }
      } catch (err) {
         console.log(err);
      }
   };

   btnResetPwd.addEventListener('click', resetPassword);
});
