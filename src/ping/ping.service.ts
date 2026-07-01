import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class PingService {
    private readonly logger = new Logger(PingService.name);

    // 10 daqiqa = 10 * 60 * 1000 millisekund
    @Interval(10 * 60 * 1000)
    async handleCron() {
        // Render bergan o'zingizning jonli saytingiz URL manzilini yozing
        const url = 'https://taminotchi.onrender.com/api/v1/category';

        try {
            this.logger.log(`Serverni uyg'oq ushlash uchun ping yuborilmoqda: ${url}`);

            const response = await axios.get(url);

            this.logger.log(`Ping muvaffaqiyatli! Status: ${response.status}`);
        } catch (error) {
            this.logger.error(`Ping yuborishda xatolik yuz berdi: ${error.message}`);
        }
    }
}