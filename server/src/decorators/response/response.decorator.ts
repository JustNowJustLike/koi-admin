import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

export class ResultDto<T> {
  @ApiProperty({
    description: '列表数组',
  })
  items: T[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}

export class ResponseDto<T> {
  @ApiProperty({
    description: '0表示成功;1失败',
    enum: [0, 1],
  })
  code: number;

  @ApiProperty({
    description: '提示内容',
  })
  message: string;

  @ApiProperty({
    description: '返回类型',
  })
  type: string;

  @ApiProperty()
  result?: ResultDto<T> | T;
}

export const ApiPagination = <T extends Type<any>>(model: T) =>
  applyDecorators(
    applyDecorators(
      ApiQuery({
        name: 'page',
        example: 1,
        description: '页码，大于0的整数',
        type: Number,
      }),
      ApiQuery({
        name: 'pageSize',
        example: 16,
        description: '每页数量，大于0的整数',
        type: Number,
      }),
    ),
    ApiExtraModels(model, ResponseDto, ResultDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              result: {
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                  total: {
                    type: 'number',
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );

export const ApiSuccess = <T extends Type<any>>(schema: T = {} as T) =>
  applyDecorators(
    ApiExtraModels(schema, ResponseDto, ResultDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              result: {
                allOf: [{ $ref: getSchemaPath(schema) }],
              },
            },
          },
        ],
      },
    }),
  );
