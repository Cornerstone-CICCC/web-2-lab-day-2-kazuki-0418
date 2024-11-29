$(document).ready(function () {
  const API_BASE = "https://dummyjson.com";
  let currentUserId = 1;

  // Function to fetch and display user data
  function fetchUser(userId) {
    $.ajax({
      url: `${API_BASE}/users/${userId}`,
      method: "GET",
      success: function (user) {
        // Update user info
        $(".info__image img").attr("src", user.image);
        $(".info__content").html(`
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>Age: ${user.age}</p>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        `);
        // Fetch related posts and todos
        fetchPosts(userId, user.firstName);
        fetchTodos(userId, user.firstName);
      },
    });
  }

  // Function to fetch and display posts
  function fetchPosts(userId, userName) {
    $.ajax({
      url: `${API_BASE}/users/${userId}/posts`,
      method: "GET",
      success: function (response) {
        const posts = response.posts;
        const postsList = $(".posts ul");
        postsList.empty();
        if (posts.length === 0) {
          postsList.append("<li>User has no posts</li>");
        } else {
          posts.forEach((post) => {
            const postItem = $(
              `<li class="post-title" data-post-id="${post.id}">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
              </li>`
            );
            postsList.append(postItem);
          });
        }
        $(".posts h3").text(`${userName}'s Posts`);
      },
    });
  }

  // Function to fetch and display todos
  function fetchTodos(userId, userName) {
    $.ajax({
      url: `${API_BASE}/users/${userId}/todos`,
      method: "GET",
      success: function (response) {
        const todos = response.todos;
        const todosList = $(".todos ul");
        todosList.empty();
        if (todos.length === 0) {
          todosList.append("<li>User has no todos</li>");
        }

        todos.forEach((todo) => {
          const todoItem = $(`<li>${todo.todo}</li>`);
          todosList.append(todoItem);
        });
        $(".todos h3").text(`${userName}'s Todos`);
      },
    });
  }

  // Event listeners for navigation buttons
  $("header button")
    .eq(0)
    .on("click", function () {
      currentUserId = currentUserId === 1 ? 30 : currentUserId - 1;
      fetchUser(currentUserId);
    });

  $("header button")
    .eq(1)
    .on("click", function () {
      currentUserId = currentUserId === 30 ? 1 : currentUserId + 1;
      fetchUser(currentUserId);
    });

  // Event listeners for navigation buttons
  $("header button")
    .eq(0)
    .on("click", function () {
      currentUserId = currentUserId === 1 ? 30 : currentUserId - 1;
      fetchUser(currentUserId);
    });

  $("header button")
    .eq(1)
    .on("click", function () {
      currentUserId = currentUserId === 30 ? 1 : currentUserId + 1;
      fetchUser(currentUserId);
    });

  // Event listener for post title click to open modal
  $(".posts ul").on("click", ".post-title", function () {
    const postId = $(this).data("post-id");
    $.ajax({
      url: `${API_BASE}/posts/${postId}`,
      method: "GET",
      success: function (post) {
        // Create modal dynamically using provided CSS class `.modal`
        const modal = $(`
          <div class="modal">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>Views: ${post.views}</p>
            <button id="close-modal">Close Modal</button>
          </div>
        `);
        $("body").append(modal);
        modal.css({
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          border: "1px solid #ccc",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        });
        $("<div class='modal-overlay'></div>")
          .css({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          })
          .appendTo("body");
      },
    });
  });

  // Event listener for closing the modal
  $("body").on("click", "#close-modal", function () {
    $(".modal, .modal-overlay").remove();
  });

  // Event listeners for toggling posts and todos sections
  $(".posts h3").on("click", function () {
    $(".posts ul").slideToggle();
  });

  $(".todos h3").on("click", function () {
    $(".todos ul").slideToggle();
  });

  // Initial user fetch
  fetchUser(currentUserId);
});
