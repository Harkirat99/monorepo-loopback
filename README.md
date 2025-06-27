## 📦 Monorepo Commands (npm Workspaces)

This project uses **npm workspaces** to manage multiple apps and packages in a single repository.

---

### 📁 Workspace Management

```bash
npm install
```
- Installs all dependencies across all workspaces.

```bash
npm workspaces list
```
- Lists all configured workspaces.

```bash
npm explore <workspace>
```
- Opens a shell inside the given workspace folder.

---

### 📦 Add/Remove Dependencies

```bash
npm install <package-name> -w <workspace>
```
- Installs a package in a specific workspace.

```bash
npm uninstall <package-name> -w <workspace>
```
- Removes a package from a specific workspace.

```bash
npm install <package-name> --workspaces
```
- Installs a package in all workspaces.

---

### ▶️ Run Scripts

```bash
npm run <script> --workspace=<workspace>
```
- Runs a script in a specific workspace.

```bash
npm run <script> --workspaces
```
- Runs the same script in all workspaces.

---

### 🧪 Common Examples

```bash
npm install                          # Install everything
npm run build --workspaces          # Build all apps and packages
npm run dev --workspace=web         # Run frontend dev server
npm install axios -w api            # Add axios to the API workspace
npm uninstall lodash -w utils       # Remove lodash from utils workspace
```

---

### 📝 Notes

- The root `package.json` must include:

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```