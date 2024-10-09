export default function renderDbManager() {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Management - Authenticator</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white border-b">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
			<a href="/">
            <h1 class="text-2xl font-bold text-gray-800">EdgeAuth</h1>
			</a>
			<a href="/" class="text-blue-500 hover:text-blue-600 font-medium">Cancel</a>

        </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Database Management</h2>

        <div class="grid md:grid-cols-2 gap-8">
            <!-- Export (Dump) Section -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">Export Database</h3>
                <p class="text-gray-600 mb-4">Create a secure backup of all your tokens and settings.</p>
                <a href="/api/db/dump">
                 	<button class="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Export Data
                </button>
                </a>
                <p class="text-sm text-gray-500">(The dump is json file containing the encrypted secrets)</p>
            </div>
        </div>
    </main>

	<footer class="bg-white border-t py-4">
        <div class="container mx-auto px-4 text-center text-sm text-gray-600">
            EdgeAuth from <a href="https://github.com/alanJames00" class="text-blue-500 hover:underline" target="_blank">alanjames</a>
        </div>
    </footer>

</body>
</html>
`;
}
