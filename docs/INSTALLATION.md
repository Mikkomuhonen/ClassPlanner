# Installation Guide

## Step-by-Step Setup for ClassPlanner

### Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Follow the installation wizard (use default settings)
5. Restart your terminal/PowerShell after installation

### Step 2: Verify Node.js Installation

Open PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v18.x.x or v20.x.x for Node, and 9.x.x or 10.x.x for npm).

### Step 3: Install OpenSpec

Once Node.js is installed, run:
```powershell
npm install -g @fission-ai/openspec@latest
```

### Step 4: Verify OpenSpec Installation

```powershell
openspec --version
```

### Step 5: Test the ClassPlanner

Navigate to the project directory and run:
```powershell
cd c:\Users\mikko\OneDrive\Documents\GitHub\ClassPlanner
node src/index.js
```

This will display a sample week schedule.

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Solution: Install/reinstall Node.js from nodejs.org

### Permission errors during global install
- Run PowerShell as Administrator
- Or use: `npm config set prefix ~\AppData\Roaming\npm`

### Module not found errors
- Make sure you're in the correct directory
- Run `npm install` to install local dependencies

## Next Steps

After completing the installation:
1. Customize the schedule in `src/index.js`
2. Add more features (export to calendar, GUI, etc.)
3. Use OpenSpec to document your API/features
