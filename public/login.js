(async () => {
    let authenticated = false;
    const userName = localStorage.getItem('userName');
    if (userName) {
      const nameEl = document.querySelector('#userName');
      nameEl.value = userName;
      const user = await getUser(nameEl.value);
      authenticated = user?.authenticated;
    }
  
    if (authenticated) {
    } else {
    }
  })();
  
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#password')?.value;
    console.log(JSON.stringify({ uName: userName, password: password }))
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ uName: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const body = await response.json();
  
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      window.location.href = 'calendar.html';
    } else {
      alert("Error in creating or logging in");
    }
  }
  
//   function play() {
//     window.location.href = 'play.html';
//   }
  
//   function logout() {
//     fetch(`/api/auth/logout`, {
//       method: 'delete',
//     }).then(() => (window.location.href = '/'));
//   }
  
  async function getUser(email) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }
  
  function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }