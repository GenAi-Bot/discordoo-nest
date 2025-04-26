import { Module } from '@nestjs/common'
import { DiscordooService } from './services'
import { ConfigurableModuleClass } from './discordoo.module-definition'

@Module({
  providers: [DiscordooService],
  exports: [DiscordooService],
})
export class DiscordooModule extends ConfigurableModuleClass {}
