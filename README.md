# flight-planner-playwright-tests  
## File Structure (example)
```
playwright-tests/
├── tests/
│   ├── login.spec.ts
│   ├── login-invalid.spec.ts
│   └── ...                  # Other small tests
│
├── pages/
│   └── login.page.ts
│
├── .gitignore
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Installing Playwright
npm init playwright@latest  
npx playwright test  
npx playwright show-report  

## Updating Playwright
npm install -D @playwright/test@latest  
npx playwright install --with-deps  
npx playwright --version  
