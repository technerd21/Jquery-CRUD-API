$(function () {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      data: { title, body },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function (
    response
  ) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    $("#updateModal").modal("show");
  });
}
function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function (response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function (response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe mt-2 col-sm-4" data-id="${rec._id}">
          <div class="card mb-3 h-100">
          <img src="https://source.unsplash.com/random/780x480" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${rec.title}</h5>
            <p class="card-text">${rec.body}</p>
            <a class="btn btn-warning">Edit</a>
            <a class="btn btn-danger">Delete</a>
          </div>
        </div>
</div>`
        );

      }
    }
  });
}


