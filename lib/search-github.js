'use babel';

import {CompositeDisposable} from 'atom';
import {shell} from 'electron';

export default {

    subscriptions : null,
    config:
        {
            "gitHubUrl": {
                "title": "Default GitHub Repo URL",
                "description": "Define which GitHub repository you would like as your default search. The default is the full GitHub website.",
                "type": "string",
                "default": "https://github.com"
            }
        },

    activate() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'search-github:search': () => this.search()
        }));
    },

    deactivate() {
        this.subscriptions.dispose()
    },
    
    search() {
        let editor;
        const searchUrl = atom.config.get('search-github.gitHubUrl');
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText();
            shell.openExternal(`${searchUrl}/search?type=Code&q=${selection}`);
        }
    }
};
