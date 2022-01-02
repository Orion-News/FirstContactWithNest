import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Put,
  Delete,
  Body,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';

const arr = [];
let id = 1;

const addID = () => {
  return id++;
};

const dataNew = (data) => {
  return {
    id: addID(),
    ...data,
    created_at: new Date(),
    atualizar_at: new Date(),
  };
};

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(HttpStatus.OK).json(arr);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    const data = body.data;
    arr.push(dataNew(data));
    // return response.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param() params, @Res() response): object {
    if (!id) {
      return {
        message: `not found courses`,
      };
    }
    const show = arr.find((x) => {
      return String(x.id) === String(params.id);
    });
    return response.status(HttpStatus.OK).json(show);
  }

  @Put(':id')
  update(@Param() params, @Req() request, @Res() response): object {
    const { data } = request.body;
    const ivd = arr.find((x) => {
      return String(x.id) === String(params.id);
    });

    if (!ivd) {
      return {
        message: 'bad request',
        status: 'deu ruim meu chegado, 400 pra vc kkkk',
      };
    }

    // alteração simples feita por notação de objeto
    ivd.email = data.email;
    ivd.password = data.password;

    return response.status(HttpStatus.OK).json(ivd);
  }

  @Delete(':id')
  destroy(@Param('id') id: string, @Res() response): string {
    const d = arr.findIndex((x) => {
      if (String(x.id) === String(id)) {
        return String(x.id) === String(id);
      }
      return `Não existe esse maluko ai meu chegado`;
    });

    arr.splice(d);
    return response.status().send(`Removeu o id ${id}, meu Chegado`);
  }
}
