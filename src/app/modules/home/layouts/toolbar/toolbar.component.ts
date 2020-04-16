import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDataService } from 'src/app/core/store/product-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  types: string[] = [];
  isMore: boolean = false;
  subService: Subscription;
  private cloneTypes: string[] = [];

  constructor(private productData: ProductDataService) { }

  ngOnInit() {
    this.fetchTypesFromStore();
  }

  fetchTypesFromStore(): void {
    this.subService = this.productData.typesProps.subscribe((res: string[]) => {
      if(res) {
        this.cloneTypes = res;
        this.types = this.cloneTypes.slice(0, 11);
      };
    })
  }

  showAll(): void {
    this.productData.actSetFilterType("all");
  }

  dispatchType(typeItem: string): void {
    this.productData.actSetFilterType(typeItem);
  }

  expand(): void {
    this.isMore = !this.isMore;
    if(this.isMore) {
      this.types = this.cloneTypes;
    } else {
      this.types = this.types = this.cloneTypes.slice(0, 11);
    }
  }

  ngOnDestroy(): void {
    if(this.subService) this.subService.unsubscribe();
  }
}
