// マガジンリストを管理するクラス
class MagazineList {
    constructor(magazines, options = {}) {
        // デフォルト値の設定
        const {
            itemsPerPage = 10,
            listId = 'js-magazine-list',
            paginationId = 'js-pagination',
            pdfPath = '../images/magazine',
            listClass = 'magazine-item',
            linkClass = 'link',
            dateClass = 'date',
            buttonClasses = {
                prev: 'js-prev-button',
                next: 'js-next-button'
            }
        } = options;

        this.magazines = magazines;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 0;
        this.totalPages = Math.ceil(magazines.length / itemsPerPage);
        this.pdfPath = pdfPath;
        this.listId = listId;
        this.paginationId = paginationId;
        this.listClass = listClass;
        this.linkClass = linkClass;
        this.dateClass = dateClass;
        this.buttonClasses = buttonClasses;
        
        // ページごとのデータを事前に分割
        this.pages = this.splitIntoPages();
        
        // DOMの準備ができたら初期化
        document.addEventListener('DOMContentLoaded', () => this.init());
    }
    
    // マガジンデータをページごとに分割
    splitIntoPages() {
        return this.magazines.reduce((acc, magazine, index) => {
            const pageIndex = Math.floor(index / this.itemsPerPage);
            if (!acc[pageIndex]) {
                acc[pageIndex] = [];
            }
            acc[pageIndex].push(magazine);
            return acc;
        }, {});
    }
    
    // 初期化処理
    init() {
        this.renderMagazineList();
        this.renderPagination();
    }
    
    // マガジンリストの表示
    renderMagazineList() {
        const magazineList = document.getElementById(this.listId);
        if (!magazineList) {
            console.error(`一覧表示対象ターゲットID: '${this.listId}' が見当たりません`);
            return;
        }

        const magazinesHtml = this.pages[this.currentPage].map(magazine => {
            const date = new Date(magazine.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const path = `${this.pdfPath}/${magazine.path}`;
            
            return `
                <li class="${this.listClass}">
                    <span class="${this.dateClass}">${year}年${month}月</span>
                    <a href="${path}" target="_blank"  class="${this.linkClass}">${magazine.title}</a>
                </li>
            `;
        }).join('');
        
        magazineList.innerHTML = magazinesHtml;
    }
    
    // ページネーションの表示
    renderPagination() {
        const pagination = document.getElementById(this.paginationId);
        if (!pagination) {
            console.error(`ページャー表示対象ターゲットID: '${this.paginationId}'  が見当たりません`);
            return;
        }

        const paginationHtml = `
            <div class="pagination">
                <button class="prev-button ${this.buttonClasses.prev}" ${this.currentPage === 0 ? 'disabled' : ''}>前へ</button>
                <span class="current-page">${this.currentPage + 1}</span> 
                <button class="next-button ${this.buttonClasses.next}" ${this.currentPage === this.totalPages - 1 ? 'disabled' : ''}>次へ</button>
            </div>
        `;
        
        pagination.innerHTML = paginationHtml;
        this.setupEventListeners();
    }
    
  
    setupEventListeners() {
        const nextButton = document.querySelector(`.${this.buttonClasses.next}`);
        const prevButton = document.querySelector(`.${this.buttonClasses.prev}`);
        
        if (nextButton) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentPage < this.totalPages - 1) {
                    this.currentPage++;
                    this.renderMagazineList();
                    this.renderPagination();
                }
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.renderMagazineList();
                    this.renderPagination();
                }
            });
        }
    }
    // 最後のページを取得(外部からアクセス用)
    getLastPage() {
        return this.totalPages - 1;
    }

    //外部からページを変更(外部からアクセス用)
    changePage(page) {
        this.currentPage = page;
        this.renderMagazineList();
        this.renderPagination();
    }

}














