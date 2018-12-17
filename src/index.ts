import Analytics from 'analytics-node'

export default {
  name: 'segment',

  settings: {
    write_key: process.env.SEGMENT_WRITE_KEY,
  },

  actions: {
    identify: {
      params: {
        userId: 'string',
        traits: {
          type: 'object',
          optional: true,
        },
      },
      handler(ctx) {
        try {
          this.logger.debug(`Sending identify action from ${ctx.params.userId}`)
          this.client.identify({
            userId: ctx.params.userId,
            traits: ctx.params.traits,
          })

          return this.Promise.resolve()
        } catch (error) {
          this.logger.error(error)
          return this.Promise.reject(error)
        }
      },
    },

    track: {
      params: {
        userId: 'string',
        event: 'string',
        ip: {
          type: 'string',
          optional: true,
        },
        properties: {
          type: 'object',
          optional: true,
        },
      },
      handler(ctx) {
        try {
          this.logger.debug(
            `Sending track action from ${ctx.params.userId} with ${
              ctx.params.event
            }`,
          )
          this.client.track({
            userId: ctx.params.userId,
            event: ctx.params.event,
            properties: ctx.params.properties,
            context: {
              ip: ctx.params.ip,
            },
          })

          return this.Promise.resolve()
        } catch (error) {
          this.logger.info(error)
          this.Promise.reject(error)
        }
      },
    },
  },

  methods: {},

  created() {
    if (this.settings.write_key == null)
      this.logger.warn(
        "The `write_key` is not configured. Please set 'SEGMENT_WRITE_KEY' environment variable!",
      )
    return this.Promise.resolve()
  },

  started() {
    this.logger.debug('Init segment')
    this.client = new Analytics(
      this.settings.write_key,
      process.env.NODE_ENV != 'production' ? { flush: 1, enable: false } : {},
    )

    return this.Promise.resolve()
  },

  stopped() {
    return this.Promise.resolve()
  },
}
