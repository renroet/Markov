/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

   makeChains() {
    const res = {};
    this.words.forEach((word, i) => {
      if (!(word in res)) {
        res[word] = new Set();
      }
      if (this.words[i + 1]) {
        res[word].add(this.words[i + 1]);
      } else {
        res[word].add(null);
      }
    });
    // Convert Sets to arrays
    for (const word in res) {
      res[word] = Array.from(res[word]);
    }
    this.chains = res;
  }


  /** return random text from chains */
  static getNext(arg) {
    let next = arg[Math.floor(Math.random() * arg.length)]
    return next
  }


  makeText(numWords = 100) {
    let txt = []
    let choices = Array.from(Object.keys(this.chains))
    let next = MarkovMachine.getNext(choices)
    console.log(next)
    while(txt.length < numWords && next !== null) {
      txt.push(next);
      next = MarkovMachine.getNext(this.chains[next])
    }

    console.log(txt.join(' '))
    return txt.join(' ');
  }

   
    

    // TODO
  }

module.exports = {MarkovMachine,
};



// mm.makeText(numWords = 100)


