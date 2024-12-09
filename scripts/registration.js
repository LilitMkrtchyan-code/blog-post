import UI from "../utils/script.js";

function createRegistrationHeader() {
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
          UI.createElement("h1", { class: "title" }, "Blog Post"),
          UI.createElement("div", { class: "navigation d-flex" }, [
            UI.createElement(
              "a",
              {
                href: "home.html",
                class: "navigation-link f-w-500 t-center",
              },
              "Home"
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

function createRegistrationForm() {
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
        { action: "#", class: "user-data-form d-flex" },
        [
          UI.createElement("input", {
            type: "text",
            id: "first-name",
            class: "w-100",
            placeholder: "First Name",
          }),
          UI.createElement("input", {
            type: "text",
            id: "last-name",
            class: "w-100",
            placeholder: "Last Name",
          }),
          UI.createElement(
            "select",
            { name: "user-data", id: "user-data", class: "w-100" },
            [
              UI.createElement("option", { value: "New York" }, "New York"),
              UI.createElement("option", { value: "Chicago" }, "Chicago"),
              UI.createElement(
                "option",
                { value: "Los Angeles" },
                "Los Angeles"
              ),
              UI.createElement("option", { value: "Dallas" }, "Dallas"),
            ]
          ),
          UI.createElement("div", { class: "gender-selection d-flex" }, [
            UI.createElement(
              "div",
              {
                class:
                  "gender-option d-flex justify-content-between align-items-center",
              },
              [
                UI.createElement(
                  "input",
                  { id: "male", type: "radio", name: "gender", value: "male" },
                  ""
                ),
                UI.createElement("label", { for: "male" }, "Male"),
              ]
            ),
            UI.createElement(
              "div",
              {
                class:
                  "gender-option d-flex justify-content-between align-items-center",
              },
              [
                UI.createElement(
                  "input",
                  {
                    id: "female",
                    type: "radio",
                    name: "gender",
                    value: "female",
                  },
                  ""
                ),
                UI.createElement("label", { for: "female" }, "Female"),
              ]
            ),
          ]),
          UI.createElement(
            "div",
            {
              class:
                "user-form-actions d-flex justify-content-between align-items-center",
            },
            [
              UI.createElement(
                "div",
                {
                  class:
                    "checkbox-wrapper d-flex justify-content-between align-items-center",
                },
                [
                  UI.createElement("input", {
                    type: "checkbox",
                    id: "send-email",
                    name: "send-email",
                    value: "email",
                  }),
                  UI.createElement(
                    "label",
                    { for: "send-email" },
                    " Send me Email"
                  ),
                ]
              ),
              UI.createElement(
                "div",
                { class: "btn-content" },
                UI.createElement(
                  "button",
                  { class: "btn f-w-500", type: "submit" },
                  "Submit"
                )
              ),
            ]
          ),
        ]
      )
    )
  );
}

function createRegistrationLayout() {
  const page = UI.createElement("div", { class: "page d-flex" }, [
    createRegistrationHeader(),
    createRegistrationForm(),
  ]);
  UI.render(page, document.body);
}
createRegistrationLayout();
