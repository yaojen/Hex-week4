Vue.component('pagination', {
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <!--click事件觸發emitPages,參數是目前頁面數減1,prevent用來避免原來a標籤的動作，-->
        <a class="page-link" href="#" aria-label="Previous"  @click.prevent="emitPages(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="(item, index) in pages.total_pages" :key="index" class="page-item" :class="{'active': item === pages.current_page}">
        <a class="page-link" href="#" @click.prevent="emitPages(item)">
          {{ item }}
        </a>
        <!--click事件觸發 emitPages-->
      </li>
      <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
    data() {
      return {
      };
    },
    props: {
      //使用pagination時候,會下傳pages資料
      pages: {},
    },
    methods: {
      //觸發換頁的方法
      emitPages(item) {
        //$emit,觸發父元件的事件，並傳遞item資料
        this.$emit('emit-pages', item);
      },
    },
  });