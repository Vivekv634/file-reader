import './App.css';
import React, { useState } from 'react';

function App() {
	const [fileName, setFileName] = useState('');
	const [fileContent, setFileContent] = useState();

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			console.log(file.type);
			setFileName(file.name);
			const reader = new FileReader();
			reader.onload = (e) => {
				setFileContent(e.target.result);
			};
			reader.readAsText(file);
		}
	};

	const handleCopy = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(fileContent).then(function () {
				alert('Text copied to clipboard!');
			}).catch(function (error) {
				alert('Failed to copy text: ' + error);
			});
		} else {
			// Fallback for older browsers
			var textArea = document.createElement('textarea');
			textArea.value = fileContent;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				alert('Text copied to clipboard!');
			} catch (err) {
				alert('Failed to copy text: ' + err);
			}
			document.body.removeChild(textArea);
		}
	}

	return (
		<div id='container'>
			<h1>File Reader</h1>
			<input type="file" onChange={handleFileChange} id='file-input' />
			{
				(fileName && fileContent) &&
				<div id='code-block'>
					<h3 id='header'>
						<div id='header-container'>
							{fileName}
							<button type="button" id='copy-button' onClick={handleCopy}>Copy</button>
						</div>
					</h3>
					<pre id='file-content'>{fileContent}</pre>
				</div>
			}
		</div>
	);
}

export default App;
