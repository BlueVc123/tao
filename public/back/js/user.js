

$(function(){
   var currentPage=1;
   var pageSize=5;

   var currentId;
   var isDelete;
   render();
   function render(){
      $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
         console.log(info);
        var tmp=template("tmp",info); 
        $("tbody").html(tmp);
 
        $("#paginator").bootstrapPaginator({
         bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
         currentPage:info.page,//当前页
         totalPages:Math.ceil(info.total/info.size),//总页数
         onPageClicked:function(a, b, c,page){
           //为按钮绑定点击事件 page:当前点击的按钮值
           console.log(page);
           currentPage=page;
           render();
         }
       
        })
      }
      });
  }
   
  // 显示操作模态框
  $("tbody").on("click",".btn",function(){
     $("#contral").modal("show");
     
     currentId=$(this).parent().data("id");
     isDelete=$(this).hasClass("btn-danger")?0:1;
   });
  //改变状态
  $("#rel").click(function(){
     $.ajax({
       type:"post",
       url:"/user/updateUser",
       data:{
          id:currentId,
          isDelete:isDelete
       },
       dataType:"json",
       success: function(info){
            // console.log(info);
            render();
            $("#contral").modal("hide");
        }
     });
   });

 });