export type TPluginOptions = {
	name: string
	enforce: 'pre' | 'post' | undefined
	transform: (source: string, file: string) => { code: string }
}
