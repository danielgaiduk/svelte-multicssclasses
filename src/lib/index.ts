export const CLASS_SNIPPET_REGEX = /class:(\S[^=]+)={1}{(\S+)}/g
export const CLASSES_REGEX = /:(.*)=/
export const CONDITION_REGEX = /={(.*)}/
export const CLASS_DELIMITER = '.'
export const CLASS_NEGATIVE_SIGN = '!'

type TPluginOptions = {
	name: string
	enforce: 'pre' | 'post' | undefined
	transform: (source: string, file: string) => { code: string }
}

export default (): TPluginOptions => {
	return {
		name: 'vite:svelte-multicssclasses',
		enforce: 'pre',
		transform
	}
}

const transform = (source: string, file: string): { code: string } => {
	if (!file.endsWith('.svelte')) return { code: source }

	const classSnippets = new Set(findClassSnippets(source))

	if (!classSnippets.size) return { code: source }

	return { code: transformClasses(source, classSnippets) }
}

const findClassSnippets = (source: string): RegExpMatchArray => {
	return source.match(CLASS_SNIPPET_REGEX) ?? []
}

const transformClasses = (source: string, classSnippets: Set<string>) => {
	for (const classSnippet of classSnippets) {
		const classes = classSnippet.match(CLASSES_REGEX)?.[1]
		const condition = classSnippet.match(CONDITION_REGEX)?.[1]
		const splittedClasses = classes?.split(CLASS_DELIMITER) ?? []
		let combinedClasses = ''
		for (let splittedClass of splittedClasses) {
			const hasNegation = splittedClass.startsWith(CLASS_NEGATIVE_SIGN)
			if (hasNegation) {
				splittedClass = splittedClass.substring(1)
			}
			combinedClasses += `class:${splittedClass}={${hasNegation ? '!' : ''}${condition}} `
		}
		source = source.replaceAll(classSnippet, combinedClasses.trim())
	}
	return source
}
