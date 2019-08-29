class Carousel {
  constructor(root){
    this.root = root
    this.panels = Array.from(this.root.querySelectorAll('.panels a'))
    this.dots = Array.from(this.root.querySelectorAll('.dots span'))
    this.dotCt = this.root.querySelector('.dots')
    this.prev = this.root.querySelector('.action .prev')
    this.next = this.root.querySelector('.action .next')
    this.bindEvent();
  }

  bindEvent(){
  
    this.dotCt.onclick = function(e){
      if(e.target.tagName !== 'SPAN') return;
      let index = this.dots.indexOf(e.target)
      this.setDots(index)
      this.setPanels(index)
    }.bind(this)

    this.prev.onclick = e =>{
      let index = this.dots.indexOf(this.root.querySelector('.dots span.active'));
      let length = this.dots.length
      index = (index - 1 + length) % length;
      this.setDots(index)
      this.setPanels(index)
    }
    this.next.onclick = e =>{
      let index = this.dots.indexOf(this.root.querySelector('.dots span.active'));
      let length = this.dots.length
      index = (index + 1) % length;
      this.setDots(index)
      this.setPanels(index)
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


document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel))