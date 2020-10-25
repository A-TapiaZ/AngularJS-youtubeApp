import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../providers/youtube.service';
import { Video } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos:Video[]=[];

  constructor(private _ys:YoutubeService) {
    this.cargarVideos();
  }

  ngOnInit(): void {
  }


  cargarVideos(){
    this._ys.getVideos().subscribe(resp=>{
      
      // De esta forma evitamos que cada vez que se cargue otra pagina de videos esta se sobrescriba. lo que le decimos es que tome lo que tiene y ademas agregue una copia de lo que viene a la cola del elemento videos;
      
      this.videos.push(...resp)
      console.log(this.videos);
      
    })
  }

  mostrarVideo(video:Video){
    Swal.fire({
      html: `
        <h4>${video.title}</h4>
        <hr>
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/${video.resourceId.videoId}"
          frameborder="0"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
          allowfullscreen>
        </iframe>
      `
    })
  }
}
