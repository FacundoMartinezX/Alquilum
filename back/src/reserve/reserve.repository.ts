import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/reserve.dto';
import { SpaceWork } from 'src/space-work/entities/spaceWork.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReserveRepository {

    
    constructor(@InjectRepository(Reserve) private readonly  reserveRepository: Repository<Reserve>,
                @InjectRepository(SpaceWork) private readonly  spaceWorkRepository: Repository<SpaceWork>,
                @InjectRepository(User) private readonly userRepository: Repository<User>
) {}1

    async getReservesRepository() {

        const reserves = await this.reserveRepository.find({
            relations: ['spaceWork', 'user']
        });

        if (reserves.length === 0) {
            throw new NotFoundException('reserves not found');
          }
    } 

    getReserveByIdRepository(id: string) {
        const reserve = this.reserveRepository.findOne({
            where: {id: id},
            relations: ['spaceWork', 'user']
        })
        if (!reserve) { 
            throw new NotFoundException('Reserve not found');
        }
        return reserve;
    }

    async createReserveRepository(reserve: CreateReservationDto) {

    const spaceWork = await this.spaceWorkRepository.findOne({
        where: { id: reserve.spaceWorkId },
    });

    const user = await this.userRepository.findOne({ where: { userId: reserve.userId } });

    if (!spaceWork) {
        throw new BadRequestException('Space work not found');
    }

    if (spaceWork.isAvailable === false) {
        throw new BadRequestException('Space work is not available');
    }

    const creatingReserve = this.reserveRepository.create({
        ...reserve,
        spaceWork: spaceWork,
        user: user
    });
     await this.reserveRepository.save(creatingReserve);

    spaceWork.isAvailable = false;
    await this.spaceWorkRepository.save(spaceWork);

    return creatingReserve;


    }


    async cancelReservationRepository(reserveId: string) {
        
        const reserva = await this.reserveRepository.findOneBy({id: reserveId}) 

        if (!reserva) {
            throw new NotFoundException(
              `Reservation with ID ${reserveId} not found.`,
            );
          }

          if (reserva.status === false) {
            throw new BadRequestException(
              `Reservation with ID ${reserveId} already cancelled.`,
            );
          }
      
          reserva.status = false

          await this.reserveRepository.save(reserva);

        return 'reserve cancel';
  }
}