export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes"

	const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

	const i = Math.floor(Math.log(bytes) / Math.log(1024))

	const formattedValue = parseFloat((bytes / Math.pow(1024, i)).toFixed(2))

	return `${formattedValue} ${sizes[i]}`
}
