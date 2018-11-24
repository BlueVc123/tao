$(function () {
  var currentPage = 1;
  var pageSize = 5;

  // 渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var strhtml = template("tmp", info);
        $("tbody").html(strhtml);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });

      }
    });
  }


  //  添加功能
  $("#add").click(function () {
    $("#addModal").modal("show");

  });

  //表单的提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#cate").serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          console.log(info);
          render();

          $('#form').data("bootstrapValidator").resetForm(true)

          // $("#addModal").modal("hide");
        }

      }
    });
  });

  // 表单的验证
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      firstCate: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 10,
            message: '用户名长度必须在3到10之间'
          }
        }
      },
    }

  });



});