import { ISimplify } from "../interfaces/paginationsimplify"

export class Pagination {
    public limit: number;
    public currentPage: number;
    public pageCount: number;
    public offset: number;
    private total: number;
  
    constructor(limit: number = 10, currentPage: number = 1, total:number) {
      this.total = total
      this.limit = limit;
      this.currentPage = currentPage;
      this.pageCount = Math.ceil(this.total / this.limit);
      this.offset = (this.currentPage - 1) * this.limit
    }
  
    simplify(): ISimplify {
      const { currentPage, pageCount, limit} = this;
      return { currentPage, pageCount, limit };
    }
  }