// prepareCanvas();
// 颜料
var pigment = document.querySelector('.pigment'),
    pigments = document.querySelectorAll('.pigment li');
pigments.forEach(function(ele,index){
    if(!ele.classList.contains('rubber')){
        ele.style.background = ele.dataset['color'];
    }
    ele.addEventListener('click',function(e){
        var event = e.target;
        var selected = pigment.querySelector('.selected');
        selected && selected.classList.remove('selected')
        changepenColor(event)
    });
});
function changepenColor(event){
    event.classList.add('selected');
    colorPurple = event.dataset['color'];
}

// 弹窗
var toast = document.querySelector(".canvas-view .toast");
var cancel = document.querySelector(".canvas-view .cancel");
var confirm = document.querySelector(".canvas-view .confirm");
var saveImageInfo = document.querySelector('#saveImageInfo');

saveImageInfo.addEventListener('click',function(e){
    e.preventDefault();
    var bless = document.querySelector('#bless');
    if(bless.value == ''){
        toast.querySelector('p').innerHTML = "请您填写祝福语";
        cancel.style.display = "none";
        toast.dataset['id'] = '0';
    }else{
        toast.querySelector('p').innerHTML = "填色完成，确认提交？"
        cancel.style.display = "block";
        toast.dataset['id'] = '1';
    }
    toast.classList.add('visible');
});
// 关闭
cancel.addEventListener('click',function(){
    toast.classList.remove('visible');

});
// 提交
confirm.addEventListener('click',function(){
    toast.classList.remove('visible');
    if(toast.dataset['id'] == '1'){
        var mycanvas = document.getElementById("canvasDiv");
        var image    = mycanvas.toDataURL("image/png",6.0);
        // console.log(image);
        ajaxPost(image)
        appView.style.display = 'block';
    }
})

// 开始画画
var beginDraw = document.querySelector('.begin-draw'),
    myDraw = document.querySelector('.my-draw'),
    appView = document.querySelector('.app-view'),
    canvasView = document.querySelector('.canvas-view');

// ajax
function ajaxPost(img,bless){
    // 移除img
    var canvasImg = localStorage.getItem('canvasImg');
    if(canvasImg){
        canvasImg = JSON.parse(canvasImg);
        localStorage.removeItem('canvasImg');
    }

    var bless = document.querySelector('#bless');
    var objForm = new FormData()
    objForm.append('imginfo',img);
    objForm.append('bless',escape(bless.value));
    $.ajax({
        url:"https://topic.360che.com/m/2017060501/addimg.aspx",
        data:objForm,
        type:"POST",
        success:function(res){
            if(res.result == '1'){
                try {
                      var CANVAS = {
                        'imgsrc': res.data.imgsrc,
                        'allcount':res.data.allcount
                      }
                      localStorage.setItem('canvasImg',JSON.stringify(CANVAS));
                      appView.style.display = 'block';
                    } catch(e){};
                // 清除画布
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                outlineImage.src = "http://frontendsvn.360che.com/icon-project/wap/topic/game/6.1drawing/static/niuniu.png";
                clickX = [];
                clickY = [];
                clickColor = new Array();
                clickTool = new Array();
                clickSize = new Array();
                clickDrag = new Array();
                location.href = "Success";
            }else{
                toast.querySelector('p').innerHTML = data.mess;
                cancel.style.display = "none";
                toast.dataset['id'] = '0';
            }
        },
        error:function(){}
    })

}
