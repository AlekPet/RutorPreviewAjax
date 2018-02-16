// ==UserScript==
// @name         Rutor Preview Ajax
// @namespace    https://github.com/AlekPet/
// @version      1.2.6
// @description  Предпросмотр раздач на сайте
// @author       AlekPet
// @license      MIT; https://opensource.org/licenses/MIT
// @match        http://tor-ru.net/*
// @match        http://zerkalo-rutor.org/*
// @match        http://rutor.info/*
// @match        http://rutor.is/*
// @updateURL    https://github.com/AlekPet/Rutor-Preview-Ajax/blob/master/RutorPreviewAjax.user.js
// @downloadURL  https://github.com/AlekPet/Rutor-Preview-Ajax/blob/master/RutorPreviewAjax.user.js
// @icon         https://raw.githubusercontent.com/AlekPet/Rutor-Preview-Ajax/master/assets/images/icon.png
// @run-at document-end
// @noframes
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @require https://code.jquery.com/jquery-3.1.0.min.js

// ==/UserScript==
GM_addStyle("\
.mDiv{width: 250px;border: 3px double #FFA302;right: 9px;text-align: center;color:white;}\
.mDiv_title{background-image: url(/s/i/poisk_bg.gif);background-size: 40% 100%;padding: 5px;border-bottom: 2px solid #ffea00;}\
.mDiv_inner{overflow-y: scroll;max-height: 400px;}\
\
.mDiv_title.opens{display:none;filter: hue-rotate(-40deg);}\
\
.com_Style{background: linear-gradient(#b7b7b7,#545454);color: white;text-align: center;padding: 4px;cursor: pointer;user-select: none; width: 300px;margin: 0 auto;border-radius: 8px;transition: all 0.5s ease;margin-bottom: 10px;}\
.com_Style:hover {background: linear-gradient(#676666,#9e9e9e);width: 350px;transition: all 0.5s ease-out;font-size: 1.2em;}\
\
#my_content{border: 1px solid silver;}\
.my_tr{display:none;}\
\
.footSpoiler{text-align: center; padding: 10px;}\
\
.box_comments{background: #d0caca;width: 90%;margin: 0 auto;padding: 10px;border-radius:8px;}\
\
div#index tr.my_tr:hover { background-color: white;}\
div#my_content tr:hover { background-color: white;}\
\
div#hideAll {border: 1px solid;width: 80%;margin: 3px auto;background: linear-gradient(#72ff72,#1d8e08);padding: 5px;cursor: pointer;}\
div#hideAll:hover{background: linear-gradient(#2fc12f,#246318);}\
\
div.seeEl {width: 80%;margin: 5px auto;background: linear-gradient(#e2a9d1,#ffc200);cursor: pointer;overflow: hidden;line-height: 1;font-size: 0.8em;    box-sizing: content-box;color: black; font-weight: bold;font-family: monospace;}\
div.seeEl:hover{background: linear-gradient(#ff9b58,#f5ff0082); color: #8e0000;}\
div.seeEl div img {box-shadow: 2px 2px 5px black;}\
\
.loading_tor_box{padding: 5px;}\
.loading_tor {width: 100%;background: #e0dcdc;border-radius: 8px;}\
.loading_tor_text{height: inherit;width: 0%;background: linear-gradient(#1dff60, #00b327);border-radius: 8px;color: #676767;font-size: 1em;padding: 2px;}\
\
.checkbox_Load:not(checked) {opacity: 0;}\
.checkbox_Load + label {cursor: pointer;position: absolute;left: 70%;}\
.checkbox_Load:checked + label:before {background: #53d64c;}\
.checkbox_Load:checked + label:after {left: 5px;content: 'ON';color: green;}\
.checkbox_Load:not(checked) + label:before {content: '';position: absolute;top: 2px;left: -28px;width: 60px;height: 20px;background: #ff6060;box-shadow: inset 0 2px 3px rgba(0,0,0,.2);}\
.checkbox_Load:not(checked) + label:after {content: 'OFF';position: absolute;top: 4px;left: -25px;width: 25px;height: 15px;background: #FFF;box-shadow: 0 2px 5px rgba(0,0,0,.3);transition: all .2s;}\
div.imgages_Load {display: table;color: #b40000;width: 85%;font-family: monospace;font-weight: bold;margin: 5px auto;}\
.preLoadImagesCell{display: table-cell;height: 40px;vertical-align: middle;background: #fbf7f7;text-align: center;width: 40%;}\
");

(function() {
    'use strict';
    const image_arrow = "data:image/gif;base64,R0lGODlhGAAYAOZVAP38/P7+/Pf4++/1+vz7+/L2+rPZ9vv6+2qu3M/m+fT2+rva7mCo2GWr2Vul1fb3+nCx3V+n11mk1IS/6V6m1sTf8Pb3+5TJ8Gqu3dzs9rrc95/Q9ZjM8/L4/PP3+l6m1abT9r/c76TN6KzS66jQ6rTa9pnH5pbK8WSq2IvD7Lra7qTS9orD7KXT9q3S653J55zJ55rN9PP4/N7t91qj1KvR62yv3bTW7Gar2YbB6vn5+8Hd8M/l81ij0ojC61ij1GCn1p3K56rQ6qvR6s3k867T61ul1JHI8L3b74bA65HH7/T2+7DU66LM6I/G7pjG5fD1+rDX9v38+2uu2vH1+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFUALAAAAAAYABgAAAfBgFWCg4SFhoeIiYqLjI2Oj4sLC5CFMA0oQZSCLxEaJUZNlCIMIAEBLRQkjyMSKwAKCgAbPUWNTAwxAAVUVAUAHBE3iyo/F7q8vB4ARzRIiTsOJwcCyMgCBEoOFYchFBMEAgPVvAM6BBNA24REEiwHD+PVAw8HOR88gxkNPksWUP8AA/4TYCEJjhmChGBIEECKw4cQIQZIgKCGoCEInBgwEKWjx48dOaaw4UKQjCcQpqhcybLlFAgmOmiaSbOmzZqBAAA7",
          no_image = "https://raw.githubusercontent.com/AlekPet/Rutor-Preview-Ajax/master/assets/images/no_image.png",

          debug = 0;


function LoadingImages(param){
    try{
    //Images
    let callback = param.func,
        content = param.content,
        button = param.button,
        elem = param.elem,

        IMGElements = $(content).find('#details tr:eq(0) img:not([src^="http://rublacklist.net"])'),
        lenIMG = IMGElements.length,


        progressBar = $(elem).nextAll(":eq(0)"),
        progressBarText = progressBar.find(".loading_tor_text"),
        procentuno = 100/lenIMG;

        if(lenIMG > 0){
            if(debug) console.log(`Изображений найдено: ${lenIMG}\n------------------------------`);

        let imgLoaded = 0,
            procentLoaded = 0;

            progressBar.show();

        $(IMGElements).one('load', function() {
            imgLoaded++;

            if(debug) console.log("Изображений загруженно: ",imgLoaded);

            procentLoaded += procentuno;
            progressBarText.css("width", procentLoaded+"%");
            progressBarText.text("Загружено "+procentLoaded.toFixed(1)+"%");

            if(imgLoaded === lenIMG){
                progressBarText.text("100.0%");
                progressBarText.css("width", "100%");
                callback(param);
                progressBar.fadeOut('slow');
            }
        })
            .one('error', function() {
            if(debug) console.log("Не загруженно");
            let src = $(this).attr("src");

            $(this).attr({
                "title": "Изображение не найдено:\n"+src,
                "src": no_image,
                "error_image": 1
            }).css({"cursor":"pointer"});
            $(this).click(function(){window.open(src);});
        })
           .each(function(i,val) {

            if($(this).complete) {
                $(this).load();
            } else if($(this).error) {
                $(this).error();
            }
        });
    } else {
        if(debug) console.log("Изображений в раздаче не найдено!");
        callback(param);
    }
    // Images end
    } catch(e){
        console.log(e);
    }
}

// Правим полученный контент
function modifyData(param){
    var data = param.data,
        button = param.button,
        elem = param.elem,

        content = $(data).find("#content")[0];

    content.removeChild(content.children[0]);
    content.removeChild(content.children[0]);
    content.removeChild(content.lastElementChild);
    content.removeChild(content.lastElementChild);

    $(content).find("tr").not(".c_h").hover(function(){$(this).css("background-color","transparent");},function(){$(this).css("background-color","transparent");});

    let tableCount = $(content).find("table tr[class=c_h]").length;

    // Список файлов измененная загрузка
    let descrN = $(content).find(".header span").attr("onclick").toString().match(/descriptions\/(\d+)\.files/i)[1];
    $(content).find(".header span").removeAttr("onclick");
    $(content).find(".header span").attr("filelist_already_loaded", 0);

    $(content).find(".header span").click(function(){
        if($(this).attr("filelist_already_loaded") == 0){
            $(this).attr("filelist_already_loaded",1);
            $(content).find('#filelist').load('/descriptions/'+descrN+'.files');
        }
        $(content).find('#displayfiles').fadeToggle('slow', 'linear');
    });
    //

    $(content).find("#cem").before('<div class="box_comments"><div  title="Показать комментарии" class="com_Style">Комментарии'+(tableCount>0?' ('+tableCount+')':'')+'</div><div style="display:none;" id="hiden_cc"></div></div>');

    $(content).find(".com_Style").click(function(){$(this).next().fadeToggle( 'slow', 'linear');});

    $(content).find("#hiden_cc").append($(content).find("#cem"));

    let tableCom = $(content).find("table tr[class=c_h]").parent().parent();

    $(content).find("#hiden_cc").append(tableCom.prev(),tableCom.prev().prev(),tableCom);

    let cloneButton = (button.clone(true)).attr("title","Скрыть раздачу"),

        spoiler = $("<div class='footSpoiler'></div>").html(cloneButton);

    $(content).append(spoiler);

    content.id = "my_content";


    let nextEl = $(elem).next().next().children(0);

    $(nextEl).html(content);

    if(debug) console.log("Предзагрузка включена...",$(".checkbox_Load")[0].checked);

   if($(".checkbox_Load")[0].checked){
       LoadingImages({content:content, button:button, elem:elem, func: ShowIHide});
   } else {
       ShowIHide({button:button, elem:elem});
   }
}

function MiniPanel(param){
    let button = param.button,
        elem = param.elem;

    // Add see
    $(".mDiv_title.opens").show();
    let textPop = $(elem).children(1).children()[3].innerText,

        imgSmall =  $(elem).nextAll(".my_tr:eq(0)").find('table#details tr:eq(0) img:not([error_image])').filter(function(i,val){
            if(val.width > 150 && !/banner|kinopoisk|imdb/i.test(this.src)){
                return this;
            }
        });

    if(imgSmall.length>0){
        let elOut = imgSmall[0];
        for(let i of imgSmall){
            if(i.height > elOut.height) {
                elOut = i;
            }
        }
        imgSmall = elOut.src;
    } else {
        imgSmall = no_image ;
    }

    if(debug) console.log("Мини изображение: ",imgSmall);

    let imgEl = $('<img>').attr({
        src: imgSmall,
        width: "50px"
    }),

        imgBox = $('<div style="display: table-cell;vertical-align: middle;padding:5px;border-right: 1px dotted white;"></div>').append(imgEl),
        textBox = $('<div style="display: table-cell;vertical-align: middle;font-size: unset;padding:2px;"></div>').text(textPop),

        elSee = $('<div class="seeEl"></div>').attr('title',textPop).append(imgBox, textBox).click(function(){
            let offset = $(elem).offset().top;
            $('html, body').animate({scrollTop:offset}, 500, 'swing');
        });

    $(elem).data(elSee);

    $(".mDiv_inner").append(elSee).animate({scrollTop:$("div.mDiv_inner").offset().top}, 500, 'swing');
}

// Функция появления и прочее
function ShowIHide(param){
    let elem = param.elem,
        button = param.button;

    $(elem).nextAll(".my_tr:eq(0)").animate(
        {
            width: [ "toggle", "swing" ],
            height: [ "toggle", "swing" ],
            opacity: "toggle"
        }, 1500, "linear", function(){
            if($(this).css("display") === "none"){
                button.css("transform", "scaleY(1)").attr("title","Показать раздачу");

                // Remove see
                $(".mDiv_inner")[0].removeChild($(elem).data()[0]);
                if($(".my_tr:visible").length<1){
                    $(".mDiv_title.opens").hide();
                }

            } else {
                button.css("transform", "scaleY(-1)").attr("title","Скрыть раздачу");

                // Mini Panel
                //LoadingImages({content:$(elem).next().next().children(0), button:button, elem:elem, func: MiniPanel});
                MiniPanel(param);
            }

            $(".mDiv_title.opens").text('Открытые '+'('+$(".seeEl").length+')');

            // Back offset on page
            $('html, body').animate({scrollTop:$(elem).offset().top}, 500, 'swing');
        });
}

// Ajax запрос
function ajaxJQ(param){
    console.log("Ajax proceed...");

    let button = param.button,
        link = param.link,
        elem = param.elem;

    $.ajax({
        url: link,
        success: function(data){

            if(debug) console.log("Ajax запрос завершен!");

            let ObjData = {data:data,button:button,elem:elem};
            modifyData(ObjData);
        }
    });
}

function makePanel(){
    var div = $('<div class="mDiv">'+
                '<div class="mDiv_title">Настройки</div>'+
                '<div id="hideAll">Свернуть все</div>'+
                '<div id="preLoadImages" class="imgages_Load">'+
                '<div class="preLoadImagesCell">Предзагрузка: </div>'+
                '<div class="preLoadImagesCell"><input type="checkbox" class="checkbox_Load" id="checkbox_imgages_Load">'+
                '<label for="checkbox_imgages_Load"></label></div>'+
                '</div>'+
                '<div class="mDiv_title opens">Открытые</div>'+
                '<div class="mDiv_inner"></div>'+
                '</div>');

    $("#sidebar").append(div);
        
    let maxTop = $(".sideblock:nth-child(2)").offset().top+parseFloat($(".sideblock:nth-child(2)").css("height"));
    $(window).scroll(function() {
        if($(window).scrollTop() >= maxTop) $( ".mDiv" ).css({"position":"fixed", "top":"0px"}); else $( ".mDiv" ).css( "position","");
    });

    $("#hideAll").click(function(){
        if($(".my_tr:visible").length){
            $(".my_tr").fadeOut("slow");
            $("img[id^='butSpoiler_'").css("transform", "scaleY(1)").attr("title","Показать раздачу");
            $(".mDiv_title.opens").text('Открытые');

            // Remove see
            $(".mDiv_title.opens").hide();
            $(".mDiv_inner").empty();

        }
    });
}

function addPoleInfo(){
    // Ищим классы для получения данных
    $(".backgr, .gai, .tum").each(function(i, val){

        // Если класс заголовка добавляем свой заголовок для кнопки
        if(this.className == "backgr") {
            $('<td width="1px">Спойлер</td>').prependTo(this);
        } else {
            // Если нет получаем информацию
            let elem = this,
                m_elem = this.children[1],

                down = m_elem.children[0].href,
                magn = m_elem.children[1].href,
                link = m_elem.children[2].href,
                linkText = m_elem.children[2].innerText,

                img = $('<img style="cursor:pointer;" title="Показать раздачу" id="butSpoiler_'+i+'" src="'+image_arrow+'" width="16px"></img>'),

                newI = $('<td style="text-align:center;"></td>').html(img);

            // Image event
            $(img).click(function() {
                if(!$(elem).next().is(".tr_loading")){
                    $(elem).after('<tr class="tr_loading" style="text-align:center; display:none;"><td colspan="6">'+
                                                 '<div class="loading_tor_box">'+
                                                 '<div class="loading_tor"><div class="loading_tor_text"></div></div>'+
                                                 '</div>'+
                                                 '</td></tr>');
                    $(elem).next('.tr_loading').after('<tr class="my_tr"><td colspan="6"></td></tr>');

                    ajaxJQ({button : img , link: link, elem : elem});
                } else {
                    ShowIHide({elem:elem, button: img});
                }
            });

            $(newI).prependTo(this);
        }
    });
}

function init(){
    makePanel();
    addPoleInfo();
}

init();

})();
