// returns template for login page
export default function renderLoginPage({ wrongCred }) {
	return `
		<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - EdgeAuth</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
            <h1 class="text-2xl font-bold text-gray-800">EdgeAuth</h1>
        </div>
    </header>

    <main class="flex-grow flex items-center justify-center px-4 py-8">
        <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Log In</h2>
            <form method="post">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" name="password" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••">
                </div>
                <button type="submit"
                    class="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Log In
                </button>
            </form>
			${wrongCred
			? `<div class="mt-4 text-center">
			<p class="text-md text-red-700">Wrong Credentials</p>
		</div>`
			: ''
		}
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
