import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Reserve } from './entities/reserve.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class ReserveRepository {

    reserves = []
    
    // constructor(@InjectRepository(Reserve) private readonly  reserveRepository: Repository<Reserve>)

    getReservesRepository() {
        return this.reserves;
    }

    getReserveByIdRepository(id: string) {
        const reserve = this.reserves.find((r) => r.id === id);
        if (!reserve) { 
            throw new NotFoundException('Reserve not found');
        }
        return reserve;
    }

    createReserveRepository(reserve: any) {
        const newReserve = { id: Date.now().toString(), ...reserve };
        this.reserves.push(newReserve);
        return newReserve;
    }

    updateReserveRepository(id: string, updateData: any) {
        const index = this.reserves.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new NotFoundException('Reserve not found');
        }
        this.reserves[index] = { ...this.reserves[index], ...updateData };
        return this.reserves[index];
    }

    deleteReserveRepository(id: string) {
        const index = this.reserves.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new NotFoundException('Reserve not found');
        }
        const [deletedReserve] = this.reserves.splice(index, 1);
        return deletedReserve;
    }
}