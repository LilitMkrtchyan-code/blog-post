import UI from "../utils/script.js";
import blogPostData from "../utils/blogInfo.js";
import Storage from "../utils/storage.js";

let posts = [];

function fetchPosts() {
  try {
    const savedPosts = Storage.getItem("posts");
    if (savedPosts) {
      posts = savedPosts;
    } else {
      posts = blogPostData.posts;
      Storage.setItem("posts", posts);
    }
  } catch (error) {
    posts = blogPostData.posts;
  } finally {
    createHomeLayout();
  }
}
fetchPosts();

function createHomeHeader() {
  return UI.createElement(
    "header",
    { class: "header w-100" },
    UI.createElement(
      "div",
      { class: "root-container w-100" },
      UI.createElement(
        "div",
        {
          class:
            "header-content d-flex justify-content-between align-items-center",
        },
        [
          UI.createElement("h1", { class: "title tt" }, "Blog Post"),
          UI.createElement("div", { class: "navigation d-flex" }, [
            UI.createElement(
              "a",
              {
                href: "registration.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Sign Up"
            ),
            UI.createElement(
              "a",
              { href: "index.html", class: "navigation-link f-w-500 t-center" },
              "Log in"
            ),
          ]),
        ]
      )
    )
  );
}

function createBloggerCard(blogger) {
  return UI.createElement(
    "li",
    {
      class: "blogger-item d-flex justify-content-between align-items-center",
      id: blogger.id,
    },
    [
      UI.createElement("img", {
        class: "avatar",
        src: blogger.avatar,
        alt: `${blogger.firstName} ${blogger.lastName}`,
      }),
      UI.createElement(
        "div",
        { class: "blogger-name f-w-500 tt" },
        `${blogger.firstName} ${blogger.lastName}`
      ),
    ]
  );
}

function createHomeNavbar() {
  return UI.createElement(
    "nav",
    { class: "navbar h-100" },
    UI.createElement(
      "ul",
      { class: "blogger-list" },
      blogPostData.bloggers.map((blogger) => createBloggerCard(blogger))
    )
  );
}

function createPostCard(post) {
  return UI.createElement("div", { class: "post" }, [
    UI.createElement(
      "div",
      {
        class: "post-header d-flex justify-content-between align-items-center",
      },
      [
        UI.createElement(
          "div",
          { class: "author-name tt f-w-500" },
          post.authorName
        ),
        UI.createElement("div", { class: "post-title f-w-500" }, post.title),
      ]
    ),
    UI.createElement(
      "div",
      {
        class:
          "post-description d-flex justify-content-between align-items-center",
      },
      [
        UI.createElement(
          "div",
          { class: "description-image" },
          UI.createElement("img", {
            src: post.img,
            alt: post.authorName,
            class: "img",
          })
        ),
        UI.createElement("div", { class: "description" }, post.story),
      ]
    ),
  ]);
}

function createHomeMain() {
  return UI.createElement(
    "div",
    { class: "main-container w-100" },
    UI.createElement(
      "main",
      { class: "main d-flex justify-content-between align-items-center h-100" },
      [
        createHomeNavbar(),
        UI.createElement(
          "div",
          { class: "main-content d-flex justify-content-between h-100" },
          [
            UI.createElement(
              "div",
              {
                class: "create-blog d-flex justify-flex-end align-items-center",
              },
              [
                UI.createElement(
                  "div",
                  { class: "btn-content t-center" },
                  UI.createElement(
                    "button",
                    {
                      class: "btn f-w-500",
                      onclick: "window.location.href='post.html';",
                    },
                    "Create blog"
                  )
                ),
              ]
            ),
            UI.createElement(
              "section",
              { class: "posts d-flex", id: "posts" },
              posts.map((post) => createPostCard(post))
            ),
            createHomeFooter(),
          ]
        ),
      ]
    )
  );
}

function createHomeFooter() {
  return UI.createElement(
    "footer",
    { class: "footer t-center " },
    `© 2014 - ${new Date().getFullYear()} All rights reserved`
  );
}

function createHomeLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createHomeHeader(),
    createHomeMain(),
  ]);
  UI.render(page, document.body);
}
