import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TournamentModule } from './tournament/tournament.module';
import { ParticipantModule } from './participant/participant.module';
import { BracketScoreModule } from './bracket-score/bracket-score.module';

@Module({
  imports: [AuthModule,
    UserModule, 
    TournamentModule, 
    ParticipantModule, 
    BracketScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
