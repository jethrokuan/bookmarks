<template>
  <section id="tagbar">
    <span id="display" @click="toggleDisplay"><img class="chevron" src="../assets/chevron.jpg" :class=" {'hide': display, 'show': !display} "</img>Tags</span>
    <section id="tags">
      <tag-pill v-show="display" v-for="label in labels" :title.sync="label.title" :color.sync="label.color" :selected.sync="label.selected"></tag-pill>
    </section>    
  </section>
</template>

<script>
import TagPill from './TagPill';

export default {
  props: ['labels'],
  data() {
    return {
      display: true,
    };
  },
  components: {
    TagPill,
  },
  methods: {
    toggleDisplay() {
      this.display = !this.display;
    },
  },
};
</script>

<style scoped lang="scss">
.hide {
    transform: rotate(-180deg);
    transition: 0.3s transform linear;
}
.show {
    transform: rotate(0deg);
    transition: 0.3s transform linear;
}

.chevron {
    padding: 0 5px;
    width: 30px;
    height: 30px;
}

#display {
    position: absolute;
    top: 10px;
    right: 0px;
    width: 100px;
    height: 50px;
    background-color: #000;
    color: #EEE;
    display: flex;
    justify-content: center;
    align-items: center;
}

#tags {
    display: block;
    position: absolute;
    align-items: left;
    top: 10px;
    right: 100px;
}

#tagbar{
    display: block;
    position: absolute;
    align-items: left;
    top: 0px;
    right: 0px;
}
</style>
