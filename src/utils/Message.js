import M from 'materialize-css';

export default class Message {
  constructor(message, type = 'info', delay = 5000) {
    this.type = type;
    this.message = message;
    this.delay = delay;
  }

  call() {
    let classes = ['rounded'];

    if (this.type === 'info') {
      classes.push('light-blue');
    }

    if (this.type === 'success') {
      classes.push('green darken-2')
    }

    if (this.type === 'danger') {
      classes.push('red darken-2')
    }

    M.toast({html: this.message, classes: classes.join(' '), delay: this.delay});
  }
}
