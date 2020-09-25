import {Body, Controller, Get, Post, Query, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() response,
      @Query() parametrosConsulta,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return response.redirect('genero');
    }else{
      return response.render('genero/login',{error:parametrosConsulta.error})
    }

  }
  @Post('login')
  loginPost(
      @Body() parametrosCuerpo,
      @Res() response,
      @Session() session
  ){
    const usuario = parametrosCuerpo.usuario;
    const password = parametrosCuerpo.password;
    if(usuario =='Adrian' && password =='1234'){
      session.usuario = usuario;
      return response.redirect('genero');
    }else{
        return response.redirect('login?error=Credenciales incorrectas!');
    }

  }
  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request
  ){
    session.username = undefined;
    request.session.destroy();
    return response.redirect('login')
  }
  /*
  @Get('login')
  login(
      @Res() response
  ){
    return response.render('login/login')
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request
  ){
    session.username = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('login')
  }


  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session
  ){
    const estaLogeado = session.usuario;
    if(estaLogeado){
      return response.render('login/protegido',{
        usuario:session.usuario,
        roles:session.roles
      })
    }else{
      return response.redirect('login')
    }

  }

  @Post('login')
  loginPost(
      @Body() parametrosCuerpo,
      @Res() response,
      @Session() session
  ){
      //Validar los datos
      const usuario = parametrosCuerpo.usuario;
      const password = parametrosCuerpo.password;
      //Consultar a la base
      if(usuario =='ronny' && password =='1234'){
        session.usuario = usuario;
        session.roles = ['Administrador'];
        return response.redirect('protegido');
      }else{
        if(usuario =='xavier' && password == '1234'){
          session.usuario = usuario;
          session.roles = ['Supervisor'];
          return response.redirect('protegido')
        }else{
          return response.redirect('/login')
        }
      }


  }*/
}
