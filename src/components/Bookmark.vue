<template>
  <a href="{{bookmark.body}}">{{bookmark.title}}</a>
</template>

<script>
export default {
  props: ['bookmark'],
};
</script>
