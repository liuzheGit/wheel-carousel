//  原生意大利面条式的代码
//  让document.querySelector 用起来更方便
const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)


$('.dots').onclick = function(e){
  if(e.target.tagName !== 'SPAN') return;
  
  let index = Array.from($$('.dots span')).indexOf(e.target)
  setDots(index);
  setPanels(index);
  
}

$('.action .prev').onclick = function(){
  //根据第几个小点上有active的类来判断在第几页
  let index = Array.from($$('.dots span')).indexOf($('.dots span.active'));
  index = (index - 1 + $$('.dots span').length) % $$('.dots span').length;

  setDots(index);
  setPanels(index);
}
$('.action .next').onclick = function(){
  let index = Array.from($$('.dots span')).indexOf($('.dots span.active'));
  index = (index + 1) % $$('.dots span').length;

  setDots(index);
  setPanels(index);

}
//  根据第几个小点上有active的类来判断在第几页
function setDots(index){
  $$('.dots span').forEach(el=>{
    el.classList.remove('active')
  })
  $$('.dots span')[index].classList.add('active')
}

//  要展示第几页，就先把所有页的z-index设置为0，再把要展示的页面z-index设置为10
function setPanels(index){
  $$('.carousel a').forEach(el=>{
    el.style.zIndex = 1;
  })
  $$('.carousel a')[index].style.zIndex = 10;
}