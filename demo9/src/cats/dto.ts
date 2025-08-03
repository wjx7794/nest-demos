import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: string;
}

export class CreateUserDto {
  /**
   * 🥥 @ApiProperty() - 模型属性
   */
  @ApiProperty({
    description: '猫咪的名称',
    example: 'RiRi',
    minLength: 3,
    maxLength: 20,
    // 仅用于响应
    readOnly: false,
    // 不在响应中显示
    writeOnly: false,
    // 是否数组类型
    isArray: false,
    // 是否必需
    required: true,
    // 是否可为 null
    nullable: false,
  })
  name: string;

  /**
   * 🥥 @ApiHideProperty() - 隐藏属性
   */
  // @ApiHideProperty()
  age: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
