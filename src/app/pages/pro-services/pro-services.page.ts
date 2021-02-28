import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CategoryService } from '../../services/category/category.service';

const userinfo = config.USERINFO_STORAGE_KEY;

@Component({
  selector: 'app-pro-services',
  templateUrl: './pro-services.page.html',
  styleUrls: ['./pro-services.page.scss'],
})
export class ProServicesPage implements OnInit {
  token: any;
  status = "pending";
  isLoading = false;
  requestList = [];
  isCategoryLoading = false;
  categorylist = [];
  selectedCategory : any;
  currentUser : any;
  currentUserCategoryId : any;
  myCategories = [];
  loadingCategory : any;
  constructor(
    public userService: UserService,
    private router: Router,
    public loadingController: LoadingController,
    public storageService: StorageService,
    public menuCtrl: MenuController,
    public categoryService: CategoryService,
  ) { }

  ngOnInit() {

  }
  async ionViewWillEnter(){
    this.isCategoryLoading = true;

    this.currentUser = await this.storageService.getObject(userinfo);
    this.token = this.currentUser.token;

    this.getCategoryList();
  }  

  async getCategoryList(){
    this.loadingCategory = await this.loadingController.create({
      message: 'Loading Categories...',
    });
    await this.loadingCategory.present();

    this.categoryService.getCategoryList().subscribe( categories => {

      this.filteredCategories(categories);

      this.getServiceRequests();
    },
    (err) => {
      this.loadingCategory.dismiss();
    });
  }

  filteredCategories(all_categories){
    
    this.currentUserCategoryId = this.currentUser.category;

    this.myCategories = all_categories.filter(
      category => this.currentUserCategoryId.includes(category.id));

    this.selectedCategory = this.myCategories[0].id;
    this.isCategoryLoading = false;
    this.loadingCategory.dismiss();
  }

  async selectCategory(category){
    this.selectedCategory = category.id;
    this.getServiceRequests();
  }

  async getServiceRequests(){
    const loading = await this.loadingController.create({
      message: 'Loading Requests...',
    });
    await loading.present();
    let param = {
      token: this.token,
      categoryId: this.selectedCategory,
      status: this.status
    };
    this.isLoading = true;


    this.userService.getServiceRequests(param).subscribe((result) => {
      this.requestList = result.request_list;
       this.isLoading = false;
       for(var i=0; i<this.requestList.length; i++){
        this.requestList[i].created = this.requestList[i].created.split(' ')[0];
      }
      loading.dismiss();
    },
    (err) => {
       this.isLoading = false;
       loading.dismiss();
       this.requestList = [];
       this.presentAlert(err.error.msg);
    });
  }
  selectService(selectedService){
    let navigationExtras: NavigationExtras = {
      state: {
        service_request: selectedService
      }
    };    
    this.router.navigate(['/pro-service-details'], navigationExtras);
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }
  segmentChanged(event){
    this.status = event.detail.value;
    this.requestList = [];
    this.getServiceRequests();
  }
  openMenu() {
    this.menuCtrl.enable(true, 'customMenu');
    this.menuCtrl.open('customMenu');
  }
}
