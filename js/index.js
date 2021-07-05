"use strict";
// - Добавить кнопку << , т.е. переход на первую страницу.
// - Добавить информацию о юзере (возраст, имейл, ...).
// - Цвет рамки (фона) карточкам генерить в зависимости от пола юзера.

// - Застилить карточки.

const options = {
  results: 8,
  seed: "abc",
  page: 1,
};

loadUsers(options);

const [btnHomePage, btnPrev, btnNext] = document.querySelectorAll("button");
btnHomePage.addEventListener("click", btnGoHomePage);
btnPrev.addEventListener("click", btnPrevHandler);
btnNext.addEventListener("click", btnNextHandler);

function btnGoHomePage(e) {
  options.page = 1;
  loadUsers(options);
}

function btnPrevHandler(e) {
  if (options.page >= 1) {
    options.page--;
    loadUsers(options);
  }
}

function btnNextHandler(e) {
  options.page++;
  loadUsers(options);
}

function loadUsers({ results, seed, page }) {
  fetch(
    `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}`
  )
    .then((response) => response.json())
    .then(({ results }) => renderUsers(results));
}

function renderUsers(users) {
  const userList = document.querySelector(".userList");
  if (userList) {
    userList.remove();
  }

  const newUserList = document.createElement("ul");
  newUserList.classList.add("userList");
  document.getElementById("root").prepend(newUserList);

  const liUserCollection = users.map((user) => createUserListItem(user));
  newUserList.append(...liUserCollection);
}

function createUserListItem({
  name: { first: firstName, last: lastName },
  picture: { large: userImageSrc },
  email,
  dob: { age: userAge },
  gender,
}) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("userListItem");

  gender === "female"
    ? (userListItem.style.borderColor = "violet")
    : (userListItem.style.borderColor = "blue");

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName(firstName, lastName));
  userListItem.append(createUserInfo(email, userAge));

  return userListItem;
}

function createUserImage(userImageSrc) {
  const img = new Image();
  img.src = userImageSrc;
  img.alt = "user profile image";
  return img;
}

function createUserFullName(firstName, lastName) {
  const div = document.createElement("div");
  div.classList.add("userFullName");
  div.innerText = `${firstName} ${lastName}`;
  return div;
}

function createUserInfo(email, userAge) {
  const div = document.createElement("div");
  div.classList.add("userInfo");
  div.innerHTML = `
  <p>Age: ${userAge}</p>
  <a href=${email}>${email}</a>`;
  return div;
}
