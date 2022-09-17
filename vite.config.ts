import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import Multiclass from './src/lib'

const config: UserConfig = {
	plugins: [Multiclass(), sveltekit()]
}

export default config
