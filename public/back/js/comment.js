// 进度条插件



$(function () {
  $(document).ajaxStart(function () {
    // alert(11)
    NProgress.start()
  });

  $(document).ajaxStop(function () {
    NProgress.done()
  });
  $("#category").click(function () {
    $(this).next().stop().slideToggle();
  });


  $(".icon_left").click(function () {
    $(".left").toggleClass("hidemenu");
    $(".top").toggleClass("hidemenu");
    $(".right").toggleClass("hidemenu");
  });


  // 3. 公共退出功能

  $('.icon_right').click(function () {
    // 显示退出模态框
    // console.log(1);
    $('#logoutModal').modal("show");
  });


  $("#clear_btn").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    });
  });
})



//  退出状态