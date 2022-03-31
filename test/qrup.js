const student = {
  name: '',
  surname: '',
  points: 0,
  
  info() {
    print(this.surname+' '+this.name+'\t'+this.points);
  }
}

const qrup = {
  telebeler: new Array(),
  
  yarat(max=1) {
    for(let i=0; i<max; ++i) {
      const s = prompt('ad soyad').split(' ');
      const temp = {...student};
      temp.name = s[0];
      temp.surname = s[1];
      this.elaveEt(temp);
    }  
  },
  
  ballar() {
    for(let i=0; i<this.telebeSayi(); ++i) {
      let p = parseInt( prompt(this.telebe(i)+' bali:') );
      this.balYaz(i,p);
    }
  },
  
  siyahiCap() {
    this.telebeler.forEach((item) => item.info());
  },
  
  elaveEt(x) {
    this.telebeler.push(x);
  },

  telebeSayi() {
    return this.telebeler.length;
  },
  
  telebe(i) {
    return this.telebeler[i].surname + ' ' + this.telebeler[i].name;
  },
  
  balYaz(i, p) {
    this.telebeler[i].points = p;
  },
  
  sort() {
    this.telebeler.sort((a,b) => b.points - a.points);
  }
}