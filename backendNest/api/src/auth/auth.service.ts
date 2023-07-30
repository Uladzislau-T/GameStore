import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Identity } from 'src/identity/identity.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService){}

  async generateToken(identity: Identity) {
    const payload = {id:identity.id, name:identity.userName, roles:identity.roles}
    return {token: this.jwtService.sign(payload)}
  }
}
