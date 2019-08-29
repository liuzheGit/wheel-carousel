// 添加动画配置
class Carousel {
  constructor(root, animation){
    this.root = root
    this.animation = animation || ((fromNode, toNode, callback) => callback())
    this.panels = Array.from(this.root.querySelectorAll('.panels a'))
    this.dots = Array.from(this.root.querySelectorAll('.dots span'))
    this.dotLength = this.dots.length
    this.dotCt = this.root.querySelector('.dots')
    this.prev = this.root.querySelector('.action .prev')
    this.next = this.root.querySelector('.action .next')
    this.bindEvent();
  }

  get index(){
    return this.dots.indexOf(this.root.querySelector('.dots span.active'));
  }
  get nextIndex(){
    return (this.index + 1) % this.dotLength
  }
  get prevIndex(){
    return (this.index - 1 + this.dotLength) % this.dotLength
  }
  bindEvent(){
  
    this.dotCt.onclick = function(e){
      if(e.target.tagName !== 'SPAN') return;
      let lastIndex = this.index
      let index = this.dots.indexOf(e.target)
      this.setPanels(index, lastIndex)
      this.setDots(index)
    }.bind(this)

    this.prev.onclick = e =>{
      this.setPanels(this.nextIndex, this.index)
      this.setDots(this.prevIndex)
    }
    this.next.onclick = e =>{
      this.setPanels(this.nextIndex, this.index)
      this.setDots(this.nextIndex)
    }
  }

  setDots(index){
    this.dots.forEach(el=> el.classList.remove('active'))
    this.dots[index].classList.add('active')
  } 
  setPanels(toIndex, fromIndex){
    this.animation(this.panels[fromIndex],this.panels[toIndex],()=>{
      this.panels.forEach(el=> el.style.zIndex = 1)
      this.panels[toIndex].style.zIndex = 10;
    })
  }
}

function fade(fromNode, toNode, onFinish){
  let opacityOffset1 = 1
  let opacityOffset2 = 0
  let step = 0.04
  fromNode.style.zIndex = 10;
  toNode.style.zIndex = 9;

  function fromNodeAnimation(){
    if(opacityOffset1 > 0){
      opacityOffset1 -= step
      fromNode.style.opacity = opacityOffset1
      requestAnimationFrame(fromNodeAnimation)
    }else{
      fromNode.style.opacity = 0
    }
  }
  
  function toNodeAnimation(){
    if(opacityOffset2 < 1){
      opacityOffset2 += step
      toNode.style.opacity = opacityOffset2
      requestAnimationFrame(toNodeAnimation)
    }else {
      toNode.style.opacity = 1
      onFinish()
    }
  }
  fromNodeAnimation()
  toNodeAnimation()
}

function slide(fromNode, toNode, onFinish){
  
  fromNode.style.zIndex = 10
  toNode.style.zIndex = 10

  let width = parseInt(getComputedStyle(fromNode).width)
  let offsetX = width  // 要水平移动的距离
  let offset1 = 0   //第一个元素已经移动的距离
  let offset2 = 0   //第二个元素已经移动的距离
  let step = 10  // 每次移动的距离

  toNode.style.left = width + 'px' //先把第二给放到右边

  function fromNodeAnimation(){
    if(offset1 < offsetX){
      fromNode.style.left = parseInt(getComputedStyle(fromNode).left) - step + 'px'
      offset1 += step
      requestAnimationFrame(fromNodeAnimation)
    }
  }


  function toNodeAnimation(){
    if(offset2 < offsetX){
      toNode.style.left = parseInt(getComputedStyle(toNode).left) - step + 'px'
      offset2 += step
      requestAnimationFrame(toNodeAnimation)
    }else {
      onFinish()
      fromNode.style.left = 0
      toNode.style.left = 0
    }
  }

  fromNodeAnimation()
  toNodeAnimation()
}

var c = new Carousel(document.querySelector('.carousel'), fade)

var c2 = new Carousel(document.querySelectorAll('.carousel')[1], slide)
// document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))