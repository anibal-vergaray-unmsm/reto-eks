import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Unauthorized } from 'src/core/utils/errors/Unauthorized';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const _token = request.headers.authorization;
    
    if (!_token) throw new Unauthorized('Empty PK.');

    const token = _token.split(' ')?.[1];
    const isValidToken = /^pk_[a-zA-Z]{4}_[0-9a-zA-Z]{10}$/.test(token);

    if (!isValidToken) throw new Unauthorized('Invalid PK.')

    return true;
  }
}