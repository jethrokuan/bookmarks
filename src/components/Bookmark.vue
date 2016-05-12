<template>
  <li>
    <a href="{{bookmark.body}}">{{bookmark.title}}</a>

    <span id="circle" v-for="label in bookmark.labels" :style="{color: '#'+label.color}"></span>
    <section class="desc">
      <span id="date">{{date}}</span>
      <a href="{{url}}"><span id="comments">{{commentString}}</span></a>
    </section>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: ['bookmark'],
  computed: {
    date() {
      return moment(this.bookmark.date).format('MMM Do, YYYY');
    },
    url() {
      return this.bookmark.url.replace('api.github.com/repos', 'github.com');
    },
    commentString() {
      const c = this.bookmark.comments;
      if (c === 1) {
        return `${c} comment`;
      }
      return `${c} comments`;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 5px 0;
}
a {
  display: inline-block;
}
#comments {
    font-size: 10px;
    color: #888;
    background-color: #FFF;
    text-decoration: underline;
}

.desc {
    display: block;
}
#date {
    color: #888;
    font-size: 10px;
}

#circle:before {
    content: ' \25CF';
    font-size: 20px;
}
</style>