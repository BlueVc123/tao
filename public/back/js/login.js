$(function(){
   //使用表单校验插件
$(".form-horizontal").bootstrapValidator({

  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 4,
          max: 9,
          message: '用户名长度必须在6到9之间'
        },
       
      }
    },
    password: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min: 4,
          max: 12,
          message: '密码长度必须在6到12之间'
        },
       
      }
    },
  }

});

// 组织表单默认的跳转
$(".form-horizontal").on('success.form.bv', function (e) {
  e.preventDefault();
  // console.log(1);
  //使用ajax提交逻辑
  var form = document.querySelector('.form-horizontal');
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$(form).serialize(),
    dataype:"json",
    success:function(info){
       console.log(info);
       if(info.success){
         location.href="index.html";
       }
       if(info.error==1000){
          alert("用户名错误");
       }
       if(info.error==1001){
          alert("密码错误");
       }

     }

  });
});

// 重置按钮
$('[type="reset"]').on("click",function(){
    var validator = $(".form-horizontal").data('bootstrapValidator');
    validator.resetForm();
 });

 });