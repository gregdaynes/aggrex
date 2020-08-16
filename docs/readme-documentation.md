Documentation for Aggrex is automated as much as possible, through various tools and processes. The primary location for documentation is `/docs` and contains directories for templates, proposals, and partial docs that can be built into other documentation - like the main `README.md`

The main repository `/README.md` is generated through a command line operation that assmebles the various components. You should not edit `/README.md` directly.

Updating the main repository README.md should be done in one of the partials found in the `/docs` directory. These are easy to spot with the `readme-` prefix. If there is a need for a new partial, it can be added to the template found in `/docs/templates/README.md`.

If a partial of readme has changed, or you need to regenerate a listing of files, eg: ADRs, use the following command. __This will replace the content of the existing README file__

```
npm run readme
```

The `/scripts` directory contains a `markdown.js` script which will perform operations on text files that use markdown. Current operations are

- Replacing `{{TOC}}` with a table of contents, based on the file's octothorpe headers (#)
- Inlcuding partials for other text files to be included. On its own line, use `/path/to/file.md` to have the script inline the contents.
