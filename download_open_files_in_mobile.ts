/*
Main Plugin : ionic cordova plugin add cordova-plugin-file-transfer
compination file to our app and  specify location : ionic cordova plugin add cordova-plugin-file 
to open pdf file : ionic cordova plugin add cordova-plugin-document-viewer


then install packages :

npm install --save @ionic-native/file-transfer  @ionic-native/document-viewer  @ionic
-native/file
*/
/************************************ Example  ***********************************/



import { Component } from "@angular/core";
import {IonicPage,NavController,NavParams,Platform, normalizeURL,AlertController} from "ionic-angular";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";

@IonicPage()
@Component({
  selector: "page-download",
  templateUrl: "download.html",
  styles: []

  //styleUrls:['./login.css']
})
export class DownloadPage {
  imgUrl: string = "";
  imgUrl2: string = "";

  pdfUrl: string = "";
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dv: DocumentViewer,
    public platform: Platform,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertController: AlertController
  ) {}
  
  
 downloadImg(Name) {
    let templatePath;
    let path = "";
    if (this.platform.is("ios") || this.platform.is("ipad")) {
      path = this.file.documentsDirectory; //|| this.file.externalDataDirectory || this.file.dataDirectory ||   this.file.externalCacheDirectory || this.file.externalApplicationStorageDirectory ||this.file.externalRootDirectory;
      console.log("path ios:" + path);
    } else {
      path = this.file.dataDirectory;
    }
    let transfer: FileTransferObject = this.fileTransfer.create();
    let url =
      "https://cdn.pixabay.com/photo/2016/02/14/13/48/computer-1199488_960_720.png";

    let uri = encodeURI(url);
    templatePath = path  +'direct1/'+Name+ ".png";
    console.log("templatePath :");
    console.log(templatePath);

    transfer
      .download(uri, templatePath, true)
      .then(
        entry => {
            /*
              https://beta.ionicframework.com/docs/building/webview/
              https://ionicframework.com/docs/wkwebview/#rewriting-file
              
              We added built-in function (Ionic 3.2.0) that will rewrite file:// URLs automatically:

              file:///usr/home/dev/app/index.html
              Should be rewritten to:
              /usr/home/dev/app/index.html

              and normalizeURL(path) will do it 

              issue solution link :
              https://github.com/ionic-team/ionic-cli/issues/2685
              
              //it worked with other without using normalizeURL() but using this link :
              // by adding <allow-navigation href="file:///*" /> in config.xml
              //https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/     
              
              */ 
              
          this.imgUrl = normalizeURL( entry.toURL());

          let alert = this.alertController.create({
            title: "image uploaded successfully",
            message: this.imgUrl,
            buttons: ["OK"]
          });
          alert.present();
        },
        error => {
          console.log(error);

          let alert2 = this.alertController.create({
            title: "image uploaded failed",
            message: JSON.stringify(error),
            buttons: ["OK"]
          });
          alert2.present();
        }
      )
      .catch(err => {
        console.log(err);
        let alert3 = this.alertController.create({
          title: "image uploaded failed(catch error)",
          message: JSON.stringify(err),
          buttons: ["OK"]
        });
        alert3.present();
      });

    this.checkFile(templatePath);
  }

  downloadPdf(Name) {
    let templatePath;
    let path = "";
    if (this.platform.is("ios") || this.platform.is("ipad")) {
      path = this.file.documentsDirectory; //|| this.file.externalDataDirectory || this.file.dataDirectory || this.file.externalCacheDirectory || this.file.externalApplicationStorageDirectory ||this.file.externalRootDirectory;
      console.log("path ios:" + path);
    } else {
      path = this.file.dataDirectory;
    }
    let transfer: FileTransferObject = this.fileTransfer.create();
    let url = "https://www.tutorialspoint.com/css/css_tutorial.pdf";

    let uri = encodeURI(url);
    templatePath = path +'direct1/'+ Name + ".pdf";
    console.log("templatePath :");
    console.log(templatePath);
   
    transfer
      .download(uri, templatePath, true)
      .then(
        entry => {
          let URL = entry.toURL();
          this.pdfUrl = entry.toURL();
          let alert = this.alertController.create({
            title: "pdf uploaded successfully",
            message: URL,
            buttons: ["OK"]
          });
          alert.present();
        },
        error => {
          console.log(error);

          let alert2 = this.alertController.create({
            title: "pdf uploaded failed",
            message: JSON.stringify(error),
            buttons: ["OK"]
          });
          alert2.present();
        }
      )
      .catch(err => {
        console.log(err);
        let alert3 = this.alertController.create({
          title: "pdf uploaded failed(catch error)",
          message: JSON.stringify(err),
          buttons: ["OK"]
        });
        alert3.present();
      });
      transfer
      .download(uri, templatePath, true);
      templatePath = path +'direct1/direct2/'+ "new_" + ".pdf";
    this.checkFile(templatePath);
  }

  checkFile(path) {
    this.file
      .checkFile(this.file.documentsDirectory, path)
      .then(() => {
        // exist.
        console.log("exist!!!"); // I always enter here
      })
      .catch(err => {
        // try again
        console.log("ERR  check file: ");
        console.log(err);
      });
  }


  Openpdf() {
    const options: DocumentViewerOptions = {
      title: "My PDF"
    };
    this.dv.viewDocument(
      this.pdfUrl,
      "application/pdf",
      options,
      () => {},
      () => {},
      () => {},
      error => {
        console.log(error);
        let alert3 = this.alertController.create({
          title: "Openpdf Error:",
          message: JSON.stringify(error),
          buttons: ["OK"]
        });
        alert3.present();
      }
    );
  }
  
  }


    /*console.log("location.href:");
    console.log(location.href);//http://localhost:8080/index.html#/login
    console.log(this.file.dataDirectory);//file:///Users/User_Name/Library/Developer/CoreSimulator/Devices/1CD9BF48-CA54-4939-BD44-5E2050FF3DA2/data/Containers/Data/Application/1EA7BB0B-DAB1-49BF-A147-75B8A7E565F3/Library/NoCloud/
    console.log(this.file.documentsDirectory);//file:///Users/User_Name/Library/Developer/CoreSimulator/Devices/1CD9BF48-CA54-4939-BD44-5E2050FF3DA2/data/Containers/Data/Application/1EA7BB0B-DAB1-49BF-A147-75B8A7E565F3/Documents/
    console.log(this.file.externalApplicationStorageDirectory);//null
    console.log(this.file.externalCacheDirectory);//null
    console.log(this.file.externalDataDirectory);//null
    console.log(this.file.externalRootDirectory);//null
    console.log(this.file.applicationDirectory);//file:///Users/User_Name/Library/Developer/CoreSimulator/Devices/1CD9BF48-CA54-4939-BD44-5E2050FF3DA2/data/Containers/Bundle/Application/06F81FB5-9FFF-42A6-A373-D5E5BE4CD41C/NBPTouch.app/
    console.log(this.file.applicationStorageDirectory);//file:///Users/User_Name/Library/Developer/CoreSimulator/Devices/1CD9BF48-CA54-4939-BD44-5E2050FF3DA2/data/Containers/Data/Application/3B7B4B02-B11F-42A1-89C4-1DE609CF9F3E/
  */
