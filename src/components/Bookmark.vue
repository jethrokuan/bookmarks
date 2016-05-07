<template>
  <a href="{{url}}">{{title}}</a>
</template>

<script>
export default {
  props: ['url', 'title'],
};
</script>

<style lang="sass">
a
  display: block
</style>