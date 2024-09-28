// returns template for homepage

function renderHomepage() {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EdgeAuth</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-100">
    <header class="bg-white border-b">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-800">EdgeAuth</h1>
            <a href="#" class="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <span class="mr-2">&#43;</span> Add Token
            </a>
        </div>
    </header>
    <main class="container mx-auto px-4 py-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Active Tokens</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Token Card 1 -->
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-medium text-gray-800">Google</h3>
                    <span class="text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg></span>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">123 456</div>
                <p class="text-sm text-gray-500">Expires in 30 seconds</p>
            </div>
            <!-- Token Card 2 -->
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-medium text-gray-800">GitHub</h3>
                    <span class="text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg></span>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">789 012</div>
                <p class="text-sm text-gray-500">Expires in 30 seconds</p>
            </div>
            <!-- Token Card 3 -->
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center mb-2">
                    <h3 class="font-medium text-gray-800">Dropbox</h3>
                    <span class="text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg></span>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">345 678</div>
                <p class="text-sm text-gray-500">Expires in 30 seconds</p>
            </div>
        </div>
    </main>
</body>
</html>
	`;
}

export default renderHomepage;
