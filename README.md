![Moleculer logo](http://moleculer.services/images/banner.png)

# moleculer-segment

Service for [Segment](http://segment.com).

# Install

```bash
$ yarn add moleculer-segment
```

# Usage

## Add environment variable

```
SEGMENT_WRITE_KEY=12345
```

## Identify, track, …

For identify an user

```
broker.call('segment.identify', {
  userId: '1234',
  traits: {
    // for example a name and an email
    name: 'Jean Dupont',
    email: 'jean@dupont.fr',
  }
})
```

For track an event

```
broker.call('segment.track', {
  userId: '1234',
  // you can an address ip
  ip: '8.8.4.4',
  properties: {
    'referer': 'action',
  }
})
```
