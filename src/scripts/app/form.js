
// function validaForm(form) {
//     for (var i = 0; i < form.length; i++) {
//         //alert(form[i].value);
//         if ($(form[i]).attr('rel') == 1) {
//             if (form[i].value == "") {
//                 //ga('send', 'event', 'contato','feedback',tag_label+'erro-campo/'+form[i].name+'');
//                 $(form[i]).addClass('formContactAlert');
//                 //$(form[i]).attr("placeholder","Preencher corretamente o campo");    
//                 form[i].focus();
//                 return false;
//             }
//         }
//     }
//     return true;
// }


$(document).ready(function () {    

   $("[type=button]").on("click",(function() {

      var formulario = $(this).parent().parent();
      //alert(validaForm(formulario))
      //if (validaForm('form')) {
      $(formulario).submit(function(e)
      {
          var formURL = $(this).attr("action");
          var form_name = $(this).attr("name");
          var postData = $(this).serializeArray();
          $("[name="+form_name+"]").css("display","none");
          $("[name="+form_name+"] ~ .feedback_loading").css("display","block");
          $.ajax(
          {
              url : formURL,
              type: "POST",
              data : postData,
              beforeSend: function (){
                $("[name="+form_name+"]").css("display","none");
                $("[name="+form_name+"] ~ .feedback_loading").css("display","block");
              },
              success:function(data, textStatus, jqXHR)
              {
                 if (data == 1)  {
                   $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
                   $("[name="+form_name+"] ~ .feedback_sucesso").css("display","block");
                 } else {
                   $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
                   $("[name="+form_name+"] ~ .feedback_sucesso").css("display","none");
                   $("[name="+form_name+"] ~ .feedback_erro").css("display","block");
                 }
              },
              error: function(jqXHR, textStatus, errorThrown)
              {
                 $("[name="+form_name+"]").css("display","none");
                 $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
                 $("[name="+form_name+"] ~ .feedback_sucesso").css("display","none");
                 $("[name="+form_name+"] ~ .feedback_erro").css("display","block");
                 //ga('send', 'event', 'contato','feedback',tag_label+'envio-fail');
              }
          });
          e.preventDefault(); //STOP default action
          e.unbind(); //unbind. to stop multiple form submit.
      });
      //}
      $(formulario).submit();
      return false;
    }));
});

// $(document).ready(function () {    
//     $("[type=submit").on("click",(function() {
//          // Assign handlers immediately after making the request,
//         // and remember the jqxhr object for this request

//         // if ($($(this).parent().parent()).validate()) {

//         var formURL = $(this).parent().parent().attr("action");
//         var form_name = $(this).parent().parent().attr("name");
//         var postData = $(this).parent().parent().serializeArray();
//         $("[name="+form_name+"]").css("display","none")
//         $("[name="+form_name+"] ~ .feedback_loading").css("display","block");
//         var jqxhr = $.post(formURL, postData, function(data) {
//             //alert("sucess " + data)
//             //alert("tag_label " + form_name)
//             $("[name="+form_name+"]").css("display","none")
//             $("[name="+form_name+"] ~ .feedback_loading").css("display","block");
//            //ga('send', 'event', 'contato','feedback',tag_label+'envio-sucess');
//         })
//           .done(function(data) {
//             if (data == 1)  {
//               $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
//               $("[name="+form_name+"] ~ .feedback_sucesso").css("display","block");
//             } else {
//               $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
//               $("[name="+form_name+"] ~ .feedback_sucesso").css("display","none");
//               $("[name="+form_name+"] ~ .feedback_erro").css("display","block");
//             }
//            //ga('send', 'event', 'contato','feedback',tag_label+'envio-done');
//           })
//           .fail(function(data) {
//             $("[name="+form_name+"]").css("display","none")
//             $("[name="+form_name+"] ~ .feedback_loading").css("display","none");
//             $("[name="+form_name+"] ~ .feedback_sucesso").css("display","none");
//             $("[name="+form_name+"] ~ .feedback_erro").css("display","block");
//             //ga('send', 'event', 'contato','feedback',tag_label+'envio-fail');
//           })
//           .always(function(data) {
//             //ga('send', 'event', 'contato','feedback',tag_label+'envio-finished');
//         });
          
//        // }
         
//         // Perform other work here ...
         
//         // Set another completion function for the request above
//         // jqxhr.always(function() {
//         //   alert( "second finished" );
//         // });
//     return false;
//     }));
// });