new Vue({
    el: '#app',
    /* 
     * Vue data 說明
     * @param products 放置 AJAX 回來的產品資料。
     * @param pagination 放置分頁資料用。總共的頁數、目前第幾頁
     * @param tempProduct 暫存資料用，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
     * @param isNew 用於判斷接下來的行為是新增產品或編輯產品。
     * @param status 用於切換上傳圖片時的小 icon，主要是增加使用者體驗。
     * @param user 底下分別有 token 的放置處，但主要必須注意 uuid 需改成自己的，目前是助教示範用。
    */
    data: {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      status: {
        fileUploading: false,
      },
      user: {
        token: '',
        uuid: 'c12f71f4-3f96-4b45-91be-41506029b9ef',
      },
    },
    created() {
      // 取得 token 的 cookies
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // 若無法取得 token 則返回 Login 頁面
      if (this.user.token === '') {
        window.location = 'Login.html';
      }
  
      this.getProducts();
    },
    methods: {
    
      // 取得產品資料
      getProducts(page = 1) {
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
        //預設帶入 token
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
  
        axios.get(api).then((response) => {
          this.products = response.data.data;
          this.pagination = response.data.meta.pagination;
        });
      },
      // 開啟 Modal 視窗
      openModal(isNew, item) {
        switch (isNew) {
          case 'new':
            //新增，清空子元件的tempPdoruct資料
            this.$refs.productModel.tempProduct = {
              imageUrl: [],
            };
            //調整isNew為true，該資料會下傳至子元件
            this.isNew = true;
            $('#productModal').modal('show');
            break;
          case 'edit':
            //淺複製資料到tempProduct，
            this.tempProduct = Object.assign({}, item);
            // 使用 refs 觸發子元件方法
            this.$refs.productModel.getProduct(this.tempProduct.id);
            //調整isNew為false，該資料會下傳至子元件
            this.isNew = false;
            break;
          case 'delete':
            //淺複製資料到tempProduct，
            this.tempProduct = Object.assign({}, item);
            $('#delProductModal').modal('show');
            break;
          default:
            break;
        }
      },
    },
  })