<template>
<span @click="addToList()" :class="{'selected' : !selected}" :style="{backgroundColor:'#' + color, color: fontcolor(color)}">{{ title }}</span>
</template>

<script>
  export default {
    props: ['color', 'title', 'selected'],
    methods: {
      fontcolor(hex) {
        const h = `0x${hex}`;
        const r = h >> 16;
        const g = (h & 0x00FF00) >> 8;
        const b = h & 0x0000FF;
        const color = (r + g + b > 385.5) ? '#222' : '#FFF';
        return color;
      },
      addToList() {
        this.$set('selected', !this.selected);
      },
    },
};
</script>

<style lang="scss" scoped>
span {
    text-transform: uppercase;
    padding: 10px 40px;
    margin: 0 5px;
    transition: all 0.2s ease-in;
}
span:hover {
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.2s ease-in;                      
}

span.selected {
    background-color: #eee !important;
    color: #aaa !important;
    opacity: 0.8;
    transition: all 0.2s ease-in;
}
</style>