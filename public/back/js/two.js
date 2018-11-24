$(function(){
  var currentPage=1;
  var pageSize=5;

  // table栏渲染部分
  render();
  function render(){
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
         console.log(info);
         var strHtml=template("tmp",info);
         $("tbody").html(strHtml);
        // 分页标签部分
         $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage=page;
            render();
          }
        });
        
       }
    });
   }
  
  //  模态框的显示
   $("#addCate").click(function(){
      $("#addModal").modal("show");
    // 一级分类的渲染
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
          console.log(info);
          var str= template("addtmp",info);
          $(".dropdown-menu").html(str);

       }
    });
  });

  //给下拉菜单添加点击事件
  $(".dropdown-menu").on("click","li",function(){
      var str=$(this).text();
      $("#selectOne").text(str);
       var id =$(this).data("id");
      //  console.log(id);
      $('[name="categoryId"]').val(id);
      // console.log($('[name="firstCate"]').val());
      $("#form").data('bootstrapValidator').updateStatus("categoryId"," VALID");
   });

  //  文件上传
   $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      // console.log(data);
      var result = data.result; // 后台返回的结果
      console.log(result);
      // 获取图片地址, 赋值给 img 的 src
      var picUrl = result.picAddr;
      // 图片地址赋值给img
      $("#img").attr("src",picUrl);
      // 图片地址赋值给隐藏域
      $('[name="brandLogo"]').val(picUrl);
      // 手动更改字段状态
      $("#form").data('bootstrapValidator').updateStatus("brandLogo"," VALID");
      
    }
    });

   //使用表单校验插件
$("#form").bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      },
  }

});

// 当格式验证成功后
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type:"post",
    url:"/category/addSecondCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
        // console.log(info);
        $("#addModal").modal("hide");
        render();

        $('#form').data("bootstrapValidator").resetForm(true);
        $("#selectOne").text("请选择一级分类");
        $("#img").attr("src","./images/none.png");
        
     }

    
  });
});

});