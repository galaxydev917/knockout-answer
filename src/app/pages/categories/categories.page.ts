import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { config } from '../../config/config';
import { CategoryService } from '../../services/category/category.service';
import { Location } from "@angular/common";

const userinfo = config.USERINFO_STORAGE_KEY;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  currentUser : any;
  currentUserCategoryId : any;
  myCategories = [];
  allCategories = [];
  categories = [];
  checkboxCategories = [];
  checkboxItem = {
    label: '',
    value: ''
  }   
  constructor(
    public alertController: AlertController,
    public storageService: StorageService,
    private location: Location,
    public loadingController: LoadingController,
    public categoryService: CategoryService,
  ) { }

  ngOnInit() {
    //this.showPrompt();
  }

  async ionViewWillEnter(){
    this.currentUser = await this.storageService.getObject(userinfo);
    this.getAllCategories();
    console.log(this.currentUser);
  }

  async getAllCategories(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();

    this.categoryService.getCategoryList().subscribe((result) => {
      this.allCategories = result;
      this.filteredCategories(this.allCategories);
      loading.dismiss();
    },
    (err) => {
      loading.dismiss();
    });
  }

  filteredCategories(all_categories){
    
    this.currentUserCategoryId = this.currentUser.category;
    console.log(this.currentUserCategoryId);

    this.myCategories = all_categories.filter(
      category => this.currentUserCategoryId.includes(category.id));

    this.categories = all_categories.filter(
        category => !this.currentUserCategoryId.includes(category.id));
    console.log("this.categories", this.categories);

    this.checkboxCategories = [];
    for(var i=0; i<this.categories.length; i++){
      let checkboxItem = {
        type: 'checkbox',
        label: this.categories[i].name,
        value: this.categories[i].id
      }
      this.checkboxCategories.push(checkboxItem);
    }
    
  }

  async updateMyCategories(checkedItems){

    if(checkedItems.length > 0){
      for(var i=0; i<checkedItems.length; i++){
        this.currentUserCategoryId = this.currentUserCategoryId + "," + checkedItems[i];
      }

      var param = {
        token: this.currentUser.token,
        categories: this.currentUserCategoryId
      };

      const loading = await this.loadingController.create({
        message: 'Processing...',
      });
      await loading.present();

      this.categoryService.updateMyCategories(param).subscribe((result) => {
        this.currentUser.category = this.currentUserCategoryId;
        this.storageService.setObject(userinfo, this.currentUser);
        this.filteredCategories(this.allCategories);
        loading.dismiss();
      },
      (err) => {
        loading.dismiss();
        this.presentAlert(err.error.code);
      });
  
      console.log(this.currentUserCategoryId);
    }
  }

  async removeMyCategory(selectedId, index){
    if(this.myCategories.length == index + 1)
      this.currentUserCategoryId = this.currentUserCategoryId.replace("," + selectedId, '');
    else
      this.currentUserCategoryId = this.currentUserCategoryId.replace(selectedId + ",", '');  
    console.log(this.currentUserCategoryId);

    var param = {
      token: this.currentUser.token,
      categories: this.currentUserCategoryId
    };

    const loading = await this.loadingController.create({
      message: 'Processing...',
    });
    await loading.present();

    this.categoryService.updateMyCategories(param).subscribe((result) => {
      this.currentUser.category = this.currentUserCategoryId;
      this.storageService.setObject(userinfo, this.currentUser);
      this.filteredCategories(this.allCategories);
      loading.dismiss();
    },
    (err) => {
      loading.dismiss();
      this.presentAlert(err.error.code);
    });
  }
  showPrompt() {
    
    if(this.checkboxCategories.length > 0){
      this.alertController.create({
        header: 'Add New Categories',
        inputs: this.checkboxCategories,
        buttons: [
          {
            text: 'Cancel',
            handler: (data: any) => {
              console.log('Canceled', data);
            }
          },
          {
            text: 'Done!',
            handler: (data: any) => {
             this.updateMyCategories(data);
            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }else
      this.presentAlert("You have all categories");
  }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }
  back(){
    this.location.back();
  }
}
