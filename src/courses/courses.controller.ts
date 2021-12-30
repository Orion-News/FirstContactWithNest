import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';

const arr = [];
let id = 1;

const addID = () => {
  return id++;
};

@Controller('courses')
export class CoursesController {
  @Get('Index')
  findAll() {
    return arr;
  }

  @Post('Register')
  create(@Body() body) {
    const data = body.data;
    data.id = addID();
    const created = arr.push(data);
    return `insert value with succed, this value: ${created}`;
  }

  @Get('Show/:id')
  findOne(@Param() params): object {
    const show = arr.find((x) => {
      return String(x.id) === String(params.id);
    });
    return show;
  }

  @Put('Update/:id')
  update(@Param() params, @Req() request): object {
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

    return ivd;
  }

  @Delete('Destroy/:id')
  destroy(@Param('id') id: string): string {
    const d = arr.findIndex((x) => {
      if (String(x.id) === String(id)) {
        return String(x.id) === String(id);
      }
      return `Não existe esse maluko ai meu chegado`;
    });

    arr.splice(d);
    return `Removeu meu Chegado`;
  }
}
