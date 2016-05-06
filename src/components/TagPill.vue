<template>
<span :style="{backgroundColor:'#' + color, color: fontcolor(color)}">{{ title }}</span>
</template>

<script>
  export default {
    props: ['color', 'title'],
    methods: {
      fontcolor(hex) {
        const h = `0x${hex}`;
        const r = h >> 16;
        const g = (h & 0x00FF00) >> 8;
        const b = h & 0x0000FF;
        const color = (r + g + b > 385.5) ? '#222' : '#FFF';
        return color;
      },
    },
};
</script>

<style scoped lang="sass">
span
  text-transform: uppercase;
  padding: 10px 40px;
  margin: 0 5px;
</style>