const list = Vue.component('list', {
  props: ['items', "idLanche"],
  template: `
<ul>
  <li v-for="(item, index) in items" :key="index">
   {{item.nome}}  {{item.valor}}
   <number-control v-model="item.quantidade" :min="0" :idLanche="idLanche" :idIngred=item.id></number-control>
  </li>
</ul>
`})

const listLanche = Vue.component('list-lanches', {
  name: 'list-lanches',
  props: ['items'],
  template: `<ul>
<li v-for="item in items" class="p-2">
  {{item.nome}} <span class="a">R$</span> {{item.valor}}
  <number-control v-model="item.quantidade" :min="0" :idLanche="item.id"></number-control>
  <a class="btn btn-primary" data-toggle="collapse" :href="'#collapse-' + item.id" role="button" aria-expanded="false"
    aria-controls="collapseExample">
    <span>Ingredientes</span>
  </a>
  <div class="collapse" :id="'collapse-' + item.id">
      <div class="card card-body">
          <list :items="item.ingredientes" :idLanche="item.id" />
      </div>
    </div>
</li>
</ul>`
})


const app = new Vue({
  el: '#app',
  components: {
    list,
    listLanche
  },
  data() {
    return {
      lancheCount: 1,
      total: 0,
      menu: {
        lanches: [],
        ingredientes: []
      }
    }
  },
  methods: {
    getCardapio() {
      const url = 'http://localhost:57044/api/cardapio';
      axios.get(url).then(result => {
        result.data.lanches.map(lanche => {
          this.menu.lanches.push(lanche);
        })
        result.data.ingredientes.map(ingrediente => {
          this.menu.ingredientes.push(ingrediente);
        })
      })
    },
    increaseTotal(idLanche, idIngred) {
      if (idIngred !== 0) {
        let lanche = this.menu.lanches.filter(lanche => lanche.id === idLanche)
        let ingrediente = lanche[0].ingredientes.filter(ingrediente => ingrediente.id === idIngred);
        this.total += ingrediente[0].valor
      }
      else {
        this.menu.lanches.map(lanche => {
          if (lanche.id === idLanche) {
            this.total += lanche.valor;
          }

          return lanche;
        })
      }

    },
    decreaseTotal(idLanche, idIngred) {
      if (idIngred !== 0) {
        let lanche = this.menu.lanches.filter(lanche => lanche.id === idLanche)
        let ingrediente = lanche[0].ingredientes.filter(ingrediente => ingrediente.id === idIngred);
        this.total -= ingrediente[0].valor
      }
      else {
        this.menu.lanches.map(lanche => {
          if (lanche.id === idLanche) {
            this.total -= lanche.valor;
          }

          return lanche;
        })
      }
    },
  },

  beforeMount() {
    this.getCardapio();
  }
});

Vue.component('number-control', {
  template: `<div class="control number">
        <button class="decrement-button" :disabled="decrementDisabled" @click="decrement(idLanche, idIngred)">−</button>
        <button class="increment-button" :disabled="incrementDisabled" @click="increment(idLanche, idIngred)">+</button>
        <input
            type="number"
            :disabled="inputDisabled"
            :min="min"
            :max="max"
            :step="step"
            v-model.number="currentValue"
            @blur="currentValue = value"
            @keydown.esc="currentValue = value"
            @keydown.enter="currentValue = value"
            @keydown.up.prevent="increment"
            @keydown.down.prevent="decrement"
        />
    </div>`,

  props: {
    disabled: Boolean,
    max: {
      type: Number,
      default: Infinity
    },

    min: {
      type: Number,
      default: -Infinity
    },

    value: {
      required: true
    },

    idLanche: {
      type: Number,
      default: 0
    },
    idIngred: {
      type: Number,
      default: 0
    },

    step: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      currentValue: this.value,
      decrementDisabled: false,
      incrementDisabled: false,
      inputDisabled: false
    };

  },

  watch: {
    value(val) {
      this.currentValue = val;
    }
  },


  methods: {
    increment(idLanche, idIngred) {
      if (this.disabled || this.incrementDisabled) {
        return;
      }

      let newVal = this.currentValue + 1 * this.step;
      this.decrementDisabled = false;

      this._updateValue(newVal);
      app.increaseTotal(idLanche, idIngred);
    },
    decrement(idLanche, idIngred) {
      if (this.disabled || this.decrementDisabled) {
        return;
      }

      let newVal = this.currentValue + -1 * this.step;
      this.incrementDisabled = false;
      app.decreaseTotal(idLanche, idIngred);

      this._updateValue(newVal);
    },
    _updateValue(newVal) {
      const oldVal = this.currentValue;

      if (oldVal === newVal || typeof this.value !== 'number') {
        return;
      }
      if (newVal <= this.min) {
        newVal = this.min;
        this.decrementDisabled = true;
      }
      if (newVal >= this.max) {
        newVal = this.max;
        this.incrementDisabled = true;
      }
      this.currentValue = newVal;
      this.$emit('input', this.currentValue);
    }
  },

  mounted() {
    if (this.value == this.min) {
      this.decrementDisabled = true;
    }
  }
});


