class Student {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.points = 0;
  }
  
  setPoint(p) {
    this.points = p;
  }
  
  info() {
    print(this.surname+' '+this.name+'\t'+this.points);
  }
}

class Qrup {
  constructor(max=1) {
    this.telebeler = new Array();
    for(let i=0; i<max; ++i) {
      const s = prompt('ad soyad').split(' ');
      const temp = new Student(s[0], s[1]);
      this.elaveEt(temp);
    }
  }
  
  ballar() {
    for(let i=0; i<this.telebeSayi(); ++i) {
      let p = parseInt( prompt(this.telebe(i)+' bali:') );
      this.balYaz(i,p);
    }
  }
  
  siyahiCap() {
    this.telebeler.forEach((item) => item.info());
  }
  
  elaveEt(x) {
    this.telebeler.push(x);
  }

  telebeSayi() {
    return this.telebeler.length;
  }
  
  telebe(i) {
    return this.telebeler[i].surname + ' ' + this.telebeler[i].name;
  }
  
  balYaz(i, p) {
    this.telebeler[i].setPoint(p);
  }
  
  sort() {
    this.telebeler.sort((a,b) => b.points - a.points);
  }
}