document.addEventListener("DOMContentLoaded", function () {
    require.config({ paths: { vs: 'src/vs' } });

    require(['vs/editor/editor.main'], function () {
        const editor = monaco.editor.create(document.getElementById('container'), {
            value: ['def main(user: str):\n\tprint(user)'].join('\n'),
            theme: 'vs-dark',
            language: 'python',
        });
        // File saver with CTRL+S
        editor.addAction({
            id: "save-file-post-req",
            label: "Save File To Service Worker",
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS
            ],
            run: function (editor) {
                 // File Name And File Type selectors
                var fileName = document.getElementById('fileName');
                var fileType = document.getElementById('fileTypeSelector');
                var fileFullName = fileName.value+'.'+fileType.value
                fetch('http://127.0.0.1:5000/save-file', {
                    method: 'POST',
                    body: JSON.stringify({
                        fileContent: editor.getValue(),
                        fileName: fileFullName
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
        });

        var languageSelector = document.getElementById('monaco-lang-selector');

        languageSelector.addEventListener("change", function () {
            var selectedLang = languageSelector.value;
        
            monaco.editor.setModelLanguage(editor.getModel(), selectedLang);
            
            if (selectedLang == "python") {
                document.getElementById('fileTypeSelector').value = "py"
            } else if(selectedLang == "typescript") {
                document.getElementById('fileTypeSelector').value = "ts"
            } else if(selectedLang == 'javascript') {
                document.getElementById('fileTypeSelector').value = "js"
            } else {
                document.getElementById('fileTypeSelector').value = selectedLang
            }

        });
    });
});