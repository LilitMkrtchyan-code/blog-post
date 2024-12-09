import UI from "../utils/script.js";
import Storage from "../utils/storage.js";
import ValidationError from "../utils/errors/validationError.js";

function createPostHeader() {
  return UI.createElement(
    "header",
    { class: "header" },
    UI.createElement(
      "div",
      { class: "root-container" },
      UI.createElement(
        "div",
        {
          class:
            "header-content d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement("h1", { class: "title" }, "Create Post"),
          UI.createElement(
            "div",
            { class: "navigation d-flex" },
            UI.createElement(
              "a",
              {
                href: "home.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Home"
            )
          ),
        ]
      )
    )
  );
}

function createPostForm() {
  return UI.createElement(
    "div",
    { class: "root-container" },
    UI.createElement(
      "div",
      {
        class:
          "form-wrapper d-flex justify-content-center align-items-center h-100",
      },
      UI.createElement(
        "form",
        { id: "post-form", class: "post-form d-flex", action: "#" },
        [
          UI.createElement(
            "div",
            { id: "error-message", class: "error-message t-center d-none" },
            ""
          ),
          UI.createElement("div", { class: "input-group" }, [
            UI.createElement("input", {
              id: "post-form-title",
              class: "input-field w-100",
              type: "text",
              placeholder: "Title...",
            }),
            UI.createElement("input", {
              id: "post-form-name",
              class: "input-field w-100",
              type: "text",
              placeholder: "Author Name...",
            }),
            UI.createElement("input", {
              id: "post-form-image",
              class: "input-field w-100",
              type: "url",
              placeholder: "Image Link...",
            }),
            UI.createElement("textarea", {
              id: "post-form-story",
              class: "input-field w-100",
              name: "post-form-story",
              rows: "6",
              placeholder: "Story...",
            }),
          ]),
          UI.createElement(
            "div",
            { class: "btn-content post-btn t-center" },
            UI.createElement(
              "button",
              { class: "btn f-w-500", type: "submit" },
              "Create"
            )
          ),
        ]
      )
    )
  );
}

function createPostLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createPostHeader(),
    createPostForm(),
  ]);
  UI.render(page, document.body);
}
createPostLayout();

document
  .querySelector("#post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createNewPost();
  });

function createNewPost() {
  try {
    const title = document.querySelector("#post-form-title").value.trim();
    const story = document.querySelector("#post-form-story").value.trim();
    const authorName = document.querySelector("#post-form-name").value.trim();
    const img = document.querySelector("#post-form-image").value.trim();

    const post = {
      title,
      story,
      authorName,
      img,
    };
    const isValid = validateForm(post);
    if (isValid) {
      showAllPosts(post);
      clearErrorMessage();
      resetForm();
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const errorMessage = document.querySelector("#error-message");

      if (errorMessage) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("d-none");
      }
    }
  }
}

function validateForm(post) {
  if (!post.title) {
    throw new ValidationError("Invalid title");
  }
  if (!post.authorName) {
    throw new ValidationError("Invalid name");
  }
  if (!isValidUrl(post.img)) {
    throw new ValidationError("Invalid URL");
  }
  if (!post.story) {
    throw new ValidationError("Invalid story");
  }
  return true;
}

function showAllPosts(post) {
  const newPost = {
    id: UI.getUniqueId(),
    ...post,
  };

  if (!Storage.getItem("posts")) {
    Storage.setItem("posts", []);
  }
  const allPosts = Storage.getItem("posts");
  allPosts.push(newPost);
  Storage.setItem("posts", allPosts);
  window.location.href = "home.html";
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function resetForm() {
  document.querySelectorAll(".input-field").forEach((inputField) => {
    inputField.value = "";
  });
}

function clearErrorMessage() {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.classList.add("d-none");
  }
}
