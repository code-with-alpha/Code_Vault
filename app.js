// Module Imports
const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

const snippetsFile = path.join(__dirname, "snippets.json");

const loadSnippets = () => {
	try {
		const data = fs.readFileSync(snippetsFile, "utf8");
		return JSON.parse(data);
	} catch (err) {
		return [];
	}
}

const saveSnippets = (snippets) => {
	fs.writeFileSync(snippetsFile, JSON.stringify(snippets, null, 4));
}

const listSnippets = () => {
	const snippets = loadSnippets();
	console.log("\n------- Your Code Snippets -------\n");
	snippets.forEach((snippet, index) => {
		console.log(`${index + 1}. ${snippet.name}`);
	});
    console.log("--------------------");
}

const addSnippet = () => {
	const name = readline.question("Enter snippet name: ");
	const code = readline.question("Enter code: ");
	const snippets = loadSnippets();
	snippets.push({ name, code });
	saveSnippets(snippets);
	console.log("Snippet added successfully!");
}

const viewSnippet = () => {
	listSnippets();
	const index = readline.questionInt("Enter snippet number to view: ") - 1;
	const snippets = loadSnippets();
	if (index >= 0 && index < snippets.length) {
		console.log(`\n${snippets[index].name}:`);
		console.log(snippets[index].code);
	} else {
		console.log("Invalid snippet number!");
	}
}

const main = () => {
	console.log("\n\n\n------------ Welcome to Code Snippet Manager! ------------");
	while (true) {
		console.log("\n1. Add Snippet");
		console.log("2. View Snippet");
		console.log("3. List Snippets");
		console.log("4. Exit");
		const choice = readline.questionInt("Enter your choice: ");

		switch (choice) {
			case 1:
				addSnippet();
				break;
			case 2:
				viewSnippet();
				break;
			case 3:
				listSnippets();
				break;
			case 4:
				console.log("\n------------ Thanks For using our Tool! ------------");
				process.exit(0);
			default:
				console.log("----- BE SERIOUS! Enter a valid choice. -----");
		}
	}
}

main();
