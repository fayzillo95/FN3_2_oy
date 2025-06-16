import {
    CanActivate,
    ExecutionContext,
    HttpException,
    UnauthorizedException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwt: JwtService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const handler = context.getHandler();
            const controller = context.getClass();

            // const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            //     handler,
            //     controller,
            // ]);

            const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
                handler,
                controller,
            ]);
            // Agar endpoint public bo‘lsa, token shart emas
            if (isPublic) {
                return true;
            }

            const [type, token] = this.getToken(request);

            if (!token) throw new UnauthorizedException('Token not found!');
            if (type !== 'Bearer') throw new UnauthorizedException('Invalid token type!');

            const { id, role } = await this.jwt.verifyAsync(token);
            request['id'] = id;
            request['role'] = role;

            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(error.message || 'Unauthorized', 401);
            }
        }
    }

    private getToken(request: Request): string[] | undefined[] {
        const auth = request.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) {
            return [undefined, undefined];
        }
        return auth.split(' ');
    }
}
