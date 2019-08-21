function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("curs or", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
//This function's for setting checkboxes status.
function myFunction(item_id) {
    var checkBox = document.getElementById(item_id);
      if (checkBox.value == "1") {
          checkBox.checked = true;
      }
      else {
          checkBox.checked = false;
      }
}

$(function () {
    bs_input_file();
});

/* function checkList(checkbox_id, application_id) {

    $("#" + checkbox_id.toString()).change(function () {

        var checklist = "";

        $("input[type=checkbox]").each(function () {

            if (this.checked == true) {
                isChecked = "1";
            }
            else {
                isChecked = "0";
            }
            checklist += isChecked;
        });

        $.ajax({
            type: "POST",
            url: "/checkbox_check/" + application_id + "/",
            dataType: 'JSON',
            data: {
                'checklist': checklist,
                csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val()
            },
            success: function () {
                alert("Succesfull:" + checklist + "\n");
            }
        });
        console.log("Hello");
    });
} */
