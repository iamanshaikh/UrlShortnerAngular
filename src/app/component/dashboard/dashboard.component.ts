import { Component ,OnInit} from '@angular/core';
import { UrlServiceService } from 'src/app/service/url-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  url : string ="";
  isUrl : boolean = false
  isError : boolean = false
  shortUrl: any;
  allres: any;
  allUrl: any;
  originalUrl: any;
  inputurl: string ="";
  nullUrl: boolean = false;
  expiredUrl: boolean = false;
  duplicate: boolean = false;
  isDuplicate: boolean = false;

constructor(
  private urlservice:UrlServiceService,

){}

ngOnInit(): void{ 
  this.isUrl = false
}


generateShortUrl() {
  this.urlservice.getShortUrl(this.url).subscribe(
    res => {
      // console.log("user..", res.id);
      if (res == null) {
        this.isError = true;
        this.isUrl = false;
      } else if (res.id === "Duplicate URL") {
        alert("Url Already Exists Please Try After 5 min");
        this.isError = false;
        this.isUrl = false;
        this.isDuplicate = true;
      } else {
        this.isError = false;
        this.isUrl = true;
        this.isDuplicate = false;
        this.shortUrl = res.shortUrl;
        this.originalUrl = res.originalUrl;
      }
    },
    err => {
      const errorMessage = err.error.message;
      if (errorMessage.includes("query did not")) {
        alert("Url Already Exists Please Try After 5 min");
        this.isDuplicate = true;
        this.isError = false;
        this.isUrl = false;
      } else {
        this.isError = true;
        this.isUrl = false;
        this.isDuplicate = false;
      }
    }
  );
}

redirectToOriginal() {
  const urlParts = this.inputurl.split("/");
  const shortCode = urlParts[urlParts.length - 1];

  this.urlservice.validateUrl(shortCode).subscribe(res => {
    if (res == null) {
      this.nullUrl = true;
      window.location.reload();
    } else {
      
      if (res.status === "invalid") {
       this.isUrl = false
        this.expiredUrl = true
      } else {
        console.log("Original URL: ", res.originalUrl);
        window.location.href = res.originalUrl; 
      }
   
    }
  });
}

}
