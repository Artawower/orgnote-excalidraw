# External Excalidraw Extension

**Status: IMPLEMENTED — BROWSER SMOKE PENDING**

## Goal

Ship Excalidraw as an independently installable OrgNote extension whose release contains one self-contained JavaScript entry and manifest-declared offline assets.

## Architecture Decision

- Keep the production installation path Git-based and validate local release artifacts without adding a new public local-package API.
- Use `orgnote-api` as the only dependency boundary between the extension and OrgNote.
- Bundle Vue, React, ReactDOM, Excalidraw, styles, and workers into `dist/index.js`.
- Store fonts as `dist/assets/**` and declare every file with size and SHA-256 integrity.
- Treat OrgNote runtime files as a reproducible local cache and preserve the previous working extension during failed updates.

## Revisions

### R1 — Client runtime atomicity

Repository: `orgnote-client`

- Remove partially written new runtime versions after write failures.
- Preserve same-version installations without overwriting the active runtime.
- Remove the previous runtime version only after successful activation.
- Cover write failure, mount failure, successful update, and same-version installation.

### R2 — External extension implementation

Repository: `orgnote-excalidraw`

- Move the verified scene codec, session controller, Vue reader, and React host from the client sibling revision.
- Replace client-internal imports with lifecycle-provided `OrgNoteApi` access.
- Export the manifest and default extension module.
- Preserve drawing content, embedded images, readonly state, theme synchronization, view state, external updates, and lifecycle flushing.

### R3 — Offline runtime assets

Repository: `orgnote-excalidraw`

- Package all required Excalidraw fonts.
- Resolve declared assets through `getExtensionAssetPath()` and `api.core.useFileSystem()`.
- Prevent Excalidraw CDN fallback and missing worker chunks.
- Release font resources during extension unmount.

### R4 — Release verification

Repository: `orgnote-excalidraw`

- Build exactly one JavaScript entry.
- Generate `dist/manifest.json` from copied assets.
- Verify asset size and integrity, manifest parity, and absence of unresolved runtime imports.
- Exercise the built package through the client Git-extension installation path.

## Acceptance Criteria

- `orgnote-client` has no React or Excalidraw runtime dependency.
- Installing the Git extension enables the `.excalidraw` viewer.
- Drawings and embedded images round-trip without data loss.
- Readonly, theme, viewport state, external changes, and unmount flush behave as in the verified sibling implementation.
- No Excalidraw asset request reaches a CDN.
- Failed installation or update preserves the previous working version.
- Uninstall removes all runtime files.
- Lint, typecheck, tests, build, and release verification pass in every affected repository.

## Out of Scope

- General JavaScript chunk support for extensions.
- Host-managed asset URLs or custom protocols.
- Extension sandboxing and permission enforcement.
- Publishing or pushing repositories.
