
$(function(){
  //使用表单校验插件
  $(".form-horizontal").bootstrapValidator({
  

    //3. 指定校验字段
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
            min: 2,
            max: 30,
            message: '用户名长度必须在2到30之间'
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
            min: 6,
            max: 30,
            message: '用户名长度必须在6到30之间'
          },
        
        }
      },
    }
  
  });

  $(".login").on("click",function(e){
    e.preventDefault();

    $.ajax({
      url:"/employee/employeeLogin",
      type:"push",
      data:",
    });
   })
 });


