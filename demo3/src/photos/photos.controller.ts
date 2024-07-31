import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './photos.entity';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  // GET => http://localhost:3000/photos
  @Get()
  findAll(): any {
    return this.photosService.findAll();
  }

  // POST => http://localhost:3000/photos/?id=1&firstName=Jack&lastName=Wang
  @Post()
  create(@Body() photo: Photo): any {
    return this.photosService.create(photo);
  }

  // GET => http://localhost:3000/photos/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  // GET => http://localhost:3000/photos/delete/2
  @Get('/delete/:id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
