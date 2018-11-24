
$(function(){

  var currentPage=1;
  var pageSize=3;


  var  picArr=[];
  // 渲染
  render();
  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
          console.log(info);
          var strHtml= template("tmp",info);
          $("tbody").html(strHtml);

          // 分页按钮
          $("#pagintor").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:info.page,//当前页
            totalPages:Math.ceil(info.total/info.size),//总页数
            onPageClicked:function(a, b, c,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
              // console.log(page);
              currentPage=page;
              render();
            }
          });
       }
  
    });
  
  
  }
  
  // 商品增加的模态框
  $("#addGood").click(function(){
    $("#addModal").modal("show");


    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:1,
          pageSize:100
        },
        dataType:"json",
        success:function(info){
          // console.log(info);
          var strHtml=template("addtmp",info);
          $(".dropdown-menu").html(strHtml);
          
        }
    });
  });

  // 下拉菜单的选取
  $(".dropdown-menu").on("click","li",function(){
      $("#selectOne").text($(this).text());
      var id=$(this).data("id");
      // console.log(id);
      $('[ name="brandId"]').val(id);
      $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");
   })

  // 图片的上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data);
      var result=data.result;
      var picUrl=result.picAddr;

      $(".img-box").prepend('<img src="'+picUrl+'" alt="">')
      picArr.unshift(result);

      if(picArr.length>3){
          picArr.pop();
          // console.log(picArr);
          $(".img-box img:last-of-type").remove();
      }
      if(picArr.length==3){
        $('[name="pic"]').val(picArr);
      $("#form").data('bootstrapValidator').updateStatus("pic", "VALID");
        
      }
    }
  });

//  表单的验证
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
    brandId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '二级分类不能为空'
        },
      }
    },
    proName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '商品名不能为空'
        },
      }
    },
    proDesc: {
      validators: {
        //不能为空
        notEmpty: {
          message: '商品描述不能为空'
        },
      }
    },
    num: {
      validators: {
        //不能为空
        notEmpty: {
          message: '库存不能为空'
        },
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: '商品库存格式, 必须是非零开头的数字'
        }
      }
    },
    size: {
      validators: {
        //不能为空
        notEmpty: {
          message: '尺码不能为空'
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: '尺码格式, 必须是 32-40'
        }
      }
    },
    oldPrice: {
      validators: {
        //不能为空
        notEmpty: {
          message: '老价格不能为空'
        },
      }
    },
    price: {
      validators: {
        //不能为空
        notEmpty: {
          message: '价格不能为空'
        },
      }
    },
    pic: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择三张图片'
        },
      }
    },
    

  }

});

// 表单验证成功后
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var serialize=$("#form").serialize();
  console.log(serialize);
  // console.log(picArr);
   serialize+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
   serialize+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
   serialize+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
   console.log(serialize);
  //  发送ajax请求
   $.ajax({
     type:"post",
     url:"/product/addProduct", 
     data:serialize,
     dataType:"json",
     success:function(info){
          console.log(info);
          $("#addModal").modal("hide");
          render();

          $("#form").data('bootstrapValidator').resetForm(true);
          $("#selectOne").text("请选择二级分类");
          $(".img-box img").remove();
          picArr=[];
      }
   });
});

})
