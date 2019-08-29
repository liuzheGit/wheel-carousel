// 把上一页个下一也 和 index 用 getter 做一下
class Carousel {
  constructor(root){
    this.root = root
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
      let index = this.dots.indexOf(e.target)
      this.setDots(index)
      this.setPanels(index)
    }.bind(this)

    this.prev.onclick = e =>{
      this.setPanels(this.prevIndex)
      this.setDots(this.prevIndex)
    }
    this.next.onclick = e =>{
      this.setPanels(this.nextIndex)
      this.setDots(this.nextIndex)
    }
  }

  setDots(index){
    this.dots.forEach(el=>{
      el.classList.remove('active')
    })
    this.dots[index].classList.add('active')
  }
  setPanels(index){
    this.panels.forEach(el=>{
      el.style.zIndex = 1;
    })
    this.panels[index].style.zIndex = 10;
  }
}

var c = new Carousel(document.querySelector('.carousel'))
// document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))