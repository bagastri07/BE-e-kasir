var dynamic_form = $("#dynamic_form").dynamicForm(
  "#dynamic_form",
  "#plus",
  "#minus",
  {
    // the maximum number of form fields
    limit: 10,

    // prefix

    // normalize all fields
    // ideal for server side dulication
    normalizeFullForm: false,

    // color effects
    createColor: "#00ff00",
    removeColor: "#ff0000",
    duration: 3000,

    // JSON data which will prefill the form
    data: {},
  }
);
