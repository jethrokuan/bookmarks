import Vue from 'vue';
import Bookmark from 'src/components/Bookmark';

describe('Bookmark.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><bookmark link="http://example.com/" title="foobar"></bookmark></div>',
      components: { Bookmark },
    }).$mount();
    expect(vm.$el.querySelector('a').textContent).to.equal('foobar');
    expect(vm.$el.querySelector('a').href).to.equal('http://example.com/');
  });
});
