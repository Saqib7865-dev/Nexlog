import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, loginResponseDto, SignupDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { bcryptCompare, hashPassword } from '../utils/bcrypt.util';
import { getToken } from '../utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    private readonly userService: UserService,
  ) {}

  async login(reqPayload: LoginDto): Promise<loginResponseDto> {
    let userInDb = await this.userService.findByEmail(reqPayload.email);
    const passMatch = await bcryptCompare(
      reqPayload.password,
      userInDb?.password,
    );
    if (!passMatch) throw new NotFoundException('Credentials do not match');
    const token: string = await getToken({
      firstName: userInDb.firstName,
      lastName: userInDb.lastName || null,
      role: userInDb.userRole,
    });

    return {
      token,
      firstName: userInDb.firstName,
      lastName: userInDb.lastName || null,
      role: userInDb.userRole,
    };
  }

  async signup(reqPayload: SignupDto) {
    let userInDb = await this.userRepo.find({
      where: { email: reqPayload.email },
    });
    if (!userInDb) throw new HttpException('User already exists', 409);

    const hashPass: string = await hashPassword(reqPayload.password);
    const signupPayload = { ...reqPayload, password: hashPass };

    const user = this.userRepo.create(signupPayload);
    const token = await getToken({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.userRole,
    });
    const userCreated = await this.userRepo.save(user);

    return {
      data: {
        user: userCreated,
        token,
      },
      success: true,
      message: 'User created successfully',
    };
  }
}
