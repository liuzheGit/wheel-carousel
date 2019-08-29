// 添加动画配置 写到一个函数中
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

const Animation = (function(){
  const css = (node, styles) => Object.entries(styles).forEach(([key, value])=> node.style[key] = value)

  const reset = node => node.style = ''

  return {
    fade(during = 400){
      return function (from,to, onFinish){
        console.log(during);
        css(from, {
          opacity: 1,
          zIndex: 10
        })
        css(to, {
          opacity: 0,
          zIndex: 9
        })

        setTimeout(() => {
          css(from, {
            opacity: 0,
            transition: `all ${during/ 1000}s`
          })
          css(to, {
            opacity: 1,
            transition: `all ${during/ 1000}s`
          })
        }, 100);

        setTimeout(() => {
          reset(from)
          reset(to)
          onFinish && onFinish()
        }, during);
      }
    },
    zoom(scale = 5, during = 1000) {
      return function(from, to, onFinish) {
        css(from, {
          opacity: 1,
          transform: `scale(1)`,
          transition: `all ${during/1000}s`,
          zIndex: 10
        })
        css(to, {
          zIndex: 9
        })

        setTimeout(() => {
          css(from, {
            opacity: 0,
            transform: `scale(${scale})`
          })             
        }, 100)

        setTimeout(() => {
          reset(from)
          reset(to)
          onFinish && onFinish()
        }, during)

      }
    }
  }
})()


var c = new Carousel(document.querySelector('.carousel'), Animation.fade(300))

var c2 = new Carousel(document.querySelectorAll('.carousel')[1], Animation.zoom())