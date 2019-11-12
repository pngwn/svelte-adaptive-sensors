# svelte-adaptive-sensors

Sensors to help you deliver adaptive sensors to users depending on their network-type, memory, cpu, and saveData settings. A svelte version of [`react-adaptive-hooks`](https://github.com/GoogleChromeLabs/react-adaptive-hooks/) although there are very few differences between the two libraries currently.

This library makes it easier to get information about a user's device, settings and network and alter your app's behaviour using these metrics.

Currently 4 APIs are supported:

- [Network via effective connection type](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)
- [Data Saver preferences](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)
- [Device memory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory)
- [Logical CPU cores](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorConcurrentHardware/hardwareConcurrency)

## Install

With `npm`:

```bash
npm install --save-dev svelte-adaptive-sensors
```

Or `yarn`:

```bash
yarn add --dev svelte-adaptive-sensors
```

## Use

Import them:

```js
import {
	getCpuInfo,
	getMemoryInfo,
	getNetworkInfo,
	getSaveDataInfo,
} from 'svelte-adaptive-sensors';
```

And then use them.

## API

All functions (or stores, in the case of `getNetworkInfo`) return an object with a `supported` property. This value is `false` if the API is not supported and `true` if it is.

### `getCpuInfo`

A simple function that returns information about a user's logical processor cores using the `navigator.hardwareConcurrency` API.

This value is static and will never change. User don't routinely swap out their CPU when using an app and if they do then I wnat to hear about it.

```ts
getCpuInfo() = {
  supported: Boolean,
  processors:? Number
};
```

If `supported` is `false` then the `processors` property will not be present.

```svelte
<script>
  import { getCpuInfo } from 'svelte-adaptive-sensors';

  const { processors, supported } = getCpuInfo();
</script>

{#if supported && processors > 4}
  <Video src={video_src} />
{:else}
  <Image src={image_src}>
{/if}
```

### `getNetworkInfo`

A function that returns a store containing information about a user's effect network speed using the `navigator.connection.effectiveType` API.

This is the only value that can update and as such it returns a `readable` store instead of a static value. The store has the following contents:

```ts
getNetworkInfo() = readable<{
  supported: Boolean,
  effectiveType:? Number
}>;
```

If `supported` is `false` then the `effectiveType` property will not be present.

```svelte
<script>
  import { getNetworkInfo } from 'svelte-adaptive-sensors';

  const network = getNetworkInfo();

  function getProps(network_type) {
    let props;
    switch(network_type) {
      case 'slow-2g':
        media = { src: low_res, alt: 'low resolution' };
        break;
      case '2g':
        media = { src: med_res, alt: 'medium resolution' };
        break;
      case '3g':
        media = { src: hi_res, alt: 'high resolution' };
        break;
      case '4g':
        media = { src: very_hi_res, alt: 'very high resolution' };
        break;
      default:
        media = { src: med_res, alt: 'medium resolution' };
        break;
    }

    return props;
  }

  $: media_props = getProps($network.effectiveType);
</script>

<img {...media_props} />
```

### `getMemoryInfo`

A simple function that returns information about a user's deviceMemory using the `navigator.deviceMemory` and `performance.memory` APIs.

This value is static and will never change.

```ts
getMemoryInfo() = {
  supported: Boolean,
  deviceMemory:? Number,
  totalJSHeapSize:? Number,
  usedJSHeapSize:? Number,
  jsHeapSizeLimit:? Number,
}
```

If `supported` is `false` then the `deviceMemory`, `totalJSHeapSize`, `usedJSHeapSize`, `jsHeapSizeLimit` properties will not be present.

```svelte
<script>
  import { getMemoryInfo } from 'svelte-adaptive-sensors';

  const { deviceMemory, supported } = getMemoryInfo();
</script>

{#if supported && deviceMemory > 4}
  <Video src={video_src} />
{:else}
  <Image src={image_src}>
{/if}
```

### `getSaveDataInfo`

A simple function that returns a user's current Save Data status

```ts
getSaveDataInfo() = {
  supported: Boolean,
  saveData:? Boolean,
};
```

If `supported` is `false` then the `saveData`property will not be present.

```svelte
<script>
  import { getMemoryInfo } from 'svelte-adaptive-sensors';

  const { saveData, supported } = getSaveDataInfo();
</script>

{#if supported && !saveData}
  <Video src={video_src} />
{:else}
  <Image src={image_src}>
{/if}
```
