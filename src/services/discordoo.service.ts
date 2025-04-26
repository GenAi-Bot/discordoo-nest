import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { DiscordApplication, DiscordFactory } from 'discordoo'
import { DiscordooApplicationMode } from '../constants'
import { DiscordooOptions } from '../interfaces'
import { MODULE_OPTIONS_TOKEN } from '../discordoo.module-definition'

@Injectable()
export class DiscordooService implements OnModuleInit, OnModuleDestroy {
  protected apps: Map<string, DiscordApplication> = new Map()

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: DiscordooOptions,
  ) {
    for (const appOptions of options.apps) {
      switch (appOptions.mode) {
        case DiscordooApplicationMode.Rest:
          this.apps.set(
            appOptions.name,
            DiscordFactory.createRest(appOptions.token, appOptions),
          )
          break
        case DiscordooApplicationMode.Gateway:
          this.apps.set(
            appOptions.name,
            DiscordFactory.create(appOptions.token, appOptions),
          )
          break
      }
    }
  }

  getApp(name: string) {
    return this.apps.get(name)
  }

  async onModuleDestroy() {
    for (const app of this.apps.values()) {
      await app.destroy()
    }
  }

  async onModuleInit() {
    for (const app of this.apps.values()) {
      await app.start()
    }
  }
}
