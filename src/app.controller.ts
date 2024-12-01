import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Question } from './entities/question.entity';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/responseQuestion')
  @ApiResponse({ status: 201, description: 'Message response.'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  @ApiBody({
      type: Question,
      description: 'Json structure for user object',
  })
  getResponseQuestion(@Body()question:Question) {
    return this.appService.getResponseQuestion(question);
  }
}
