import { ApiProperty } from "@nestjs/swagger";

export class Question {
    @ApiProperty({
        example: 'I am looking for a phone',
        required: true
     })
    question: string
}