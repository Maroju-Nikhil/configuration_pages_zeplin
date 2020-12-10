$(document).ready(() => {
  $("#Dashboard-a").click(() => {
    $("#Dashboard-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#User_management-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#Configuration-a").click(() => {
    $("#Configuration-a").addClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#User_management-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#User_management-a").click(() => {
    $("#User_management-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#Projects-a").removeClass("active");
  });

  $("#Projects-a").click(() => {
    $("#Projects-a").addClass("active");
    $("#Configuration-a").removeClass("active");
    $("#Dashboard-a").removeClass("active");
    $("#User_management-a").removeClass("active");
  });

  const modal = $("#myModal");
  const btn = $("#myBtn");
  const span = $(".close");
  const cancel = $("#cancelModal");
  btn.click(() => modal.css("display", "block"));
  span.click(() => modal.css("display", "none"));
  cancel.click(() => modal.css("display", "none"));

  $("#nodetable").hide();
  $("table")
    .on("mouseenter", "tr", function () {
      $("tr:eq(" + this.id + ") td span").removeClass("hide");
      const row = this.id;
      $("tr:eq(" + row + ") td span .fa-trash").click(() => {
        $("#DeleteConfirm").css("display", "block");
        $("#CancelDeleteModal").on("click", () =>
          $("#DeleteConfirm").css("display", "none")
        );
        $("#Yes").on("click", () => {
          $("#DeleteConfirm").css("display", "none");
          $("tr:eq(" + row + ") td").remove();
        });
      });
    })
    .on("mouseleave", "tr", function () {
      $("tr:eq(" + this.id + ") td span").addClass("hide");
    });

  $("table").on("click", "td i.fa-pencil-square-o", function (e) {
    e.preventDefault();
    $this = [];
    $thisvalues = [];
    for (let index = 0; index < 6; index++) {
      $this[index] = $(this).closest("tr").find("td:eq(" + index + ")");
      $thisvalues[index] = $this[index].text();
      $this[index].empty()
      if(index <= 3)
        $('<input type="text" class="editfield"/>').val($thisvalues[index]).appendTo($this[index]);
      else if(index == 4)
        $(`<select name="cloudtype" size="1" class="editfield">
        <option value="node1" selected>Node Cloud Type</option>
        <option value="node2">Node 1 Type</option>
        <option value="node3">Node Cloud Type</option>
        <option value="node4">Node Cloud Type</option></select
      >`).val($thisvalues[index]).appendTo($this[index])
      else 
        $(`<select name="nodetype" size="1" class="editfield">
        <option value="node1" selected>Node Type</option>
        <option value="node2">Node 1 Type</option>
        <option value="node3">Node Type</option>
        <option value="node4">Node Type</option>
      </select>`).val($thisvalues[index]).appendTo($this[index])
    }

    $(this).siblings("i").removeClass("hide")
    $(this).hide();

    $("table i.fa-floppy-o").click(function () {

      $(this).addClass("hide")
      $(this).siblings("i").show()

      $(".editfield").addClass("hide")
      for (let index = 0; index < 6; index++) {
          $thisvalues[index] = $this[index].children(".editfield").val()
          $this[index].html($thisvalues[index])
      }
    });
  });
});

const navbar = () => {
  $("#myTopnav").toggleClass("responsive");
};

const onformsubmit = () => {
  const newrow = readformdata();
  if (newrow) $("#nodetable").show(800);
  InsertNewRecord(newrow);
  removeotherthings();
  resetform();
};

const readformdata = () => {
  const formdata = {};
  var inputs = $("form").serializeArray();
  $.each(inputs, function (i, input) {
    formdata[input.name] = input.value;
  });
  return formdata;
};

const resetform = () => {
  $("form")[0].reset();
};

var rowIndex = 0;

const InsertNewRecord = (data) => {
  $("#nodetable")
    .append(
      $("<tr id=" + ++rowIndex + " >")
        .append($("<td>").append(data.nodeip).append("</td>"))
        .append($("<td>").append(data.nodehostname).append("</td>"))
        .append($("<td>").append(data.nodeusername).append("</td>"))
        .append($("<td>").append(data.nodekey).append("</td>"))
        .append($("<td>").append(data.cloudtype).append("</td>"))
        .append($("<td>").append(data.nodetype).append("</td>")).append(`<td>
        <span class="edit">
            <i  class="fa fa-pencil-square-o icon" aria-hidden="true"  title="Edit"></i>
            <i  class="fa fa-floppy-o hide icon" aria-hidden="true"  title="Save"></i>
            <i  class="fa fa-trash icon" aria-hidden="true" title="Delete"></i>
        </span>
        </td>`)
    )
    .append("</tr>");
};

const removeotherthings = () => {
  $("#myModal").css("display", "none");
  $(".nocluster").css("display", "none");
  $("#myBtn").removeClass("addcluster").addClass("changeaddcluster");
  $("#snackbar").addClass("show");
  setTimeout(() => {
    $("#snackbar").removeClass("show");
  }, 3000);
};
