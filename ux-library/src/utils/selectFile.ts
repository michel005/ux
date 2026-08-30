export function selectFile(accept?: string[], multiple?: false): Promise<File | null>
export function selectFile(accept: string[] | undefined, multiple: true): Promise<File[] | null>
export function selectFile(accept: string[] = ["*"], multiple = false): Promise<File | File[] | null> {
	return new Promise((resolve) => {
		const input = document.createElement("input")
		input.type = "file"
		input.accept = accept.join(" ")
		input.multiple = multiple

		input.onchange = (event) => {
			const target = event.target as HTMLInputElement
			const files = target.files ? Array.from(target.files) : []

			if (multiple) {
				resolve(files.length ? files : null)
				return
			}

			resolve(files[0] || null)
		}

		input.oncancel = () => {
			resolve(null)
		}

		input.click()
	})
}
