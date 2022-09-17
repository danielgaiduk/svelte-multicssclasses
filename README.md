# svelte-multicssclasses

Use multiple classes with one condition

### Usage

```sh
pnpm i -D svelte-multicssclasses
OR
npm i -D svelte-multicssclasses
OR
yarn i -D svelte-multicssclasses
```

```ts
// vite.config.js

import { sveltekit } from '@sveltejs/kit/vite'
import { multicssclass } from 'svelte-multicssclasses'

const config = {
	plugins: [multicssclass(), sveltekit()] //ADD HERE
}

export default config
```

### Example 1:

```ts
const sampleBoolean = true
```

```html
Use . to combine multiple classes
<div class:sample-class-1.sample-class-2.sample-class-3="{sampleBoolean}">Example</div>
WILL BE COMPILED TO
<div
	class:sample-class-1="{sampleBoolean}"
	class:sample-class-2="{sampleBoolean}"
	class:sample-class-3="{sampleBoolean}"
>
	Example
</div>
WILL BE COMPILED TO
<div class="sample-class-1 sample-class-2 sample-class-3">Example</div>
```

### Example 2:

```ts
const sampleBoolean = true
```

```html
Use ! infront of class to negate condition for that specific class
<div class:!sample-class-1.!sample-class-2.sample-class-3="{sampleBoolean}">Example</div>
WILL BE COMPILED TO
<div
	class:sample-class-1="{sampleBoolean}"
	class:sample-class-2="{sampleBoolean}"
	class:sample-class-3="{sampleBoolean}"
>
	Example
</div>
WILL BE COMPILED TO
<div class="sample-class-3">Example</div>
```
