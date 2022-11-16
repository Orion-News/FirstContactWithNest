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
  Patch,
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

const validateEmail = (data) => {
  return arr.find((x) => {
    if(String(x.email) === String(data.email)) {
      return true
    }
    return false
  });
}; 

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(HttpStatus.OK).json(arr);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body, @Res() response) {
    const { data } = body;

    if(validateEmail(data)) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Email já cadastrado'
      });
    }
    
    arr.push(dataNew(data));

    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Operation Sucess'
    });
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

  @Patch('updated/:id')
  updated(@Param('id') id: string, @Body() body) {
    return `return data of body: ${body} and id: ${id}`;
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
  remove(@Param('id') id: string, @Res() response): string {
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
